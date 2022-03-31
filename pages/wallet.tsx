import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ethers, BigNumber, BigNumberish } from "ethers";
import Link from 'next/link';
import Head from 'next/head';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Web3 from 'web3';

import {
  errorDescription,
  ErrorMessage,
  monthNames, netInfo,
  probabilities,
  projectSchedule,
  TimeLeft,
  WalletSate
} from '../core/data/base';
import { Layout } from '../components/layout/layout';
import { RaffleState } from '../core/data/landing';
import Icon from '../components/ui-kit/icon';
import { WalletMenuType } from '../core/data/wallet';
import { AppContext } from '../components/context/app-context';
import ethereumClockTokenAbi from '../abis/EthereumClockToken.json';
import Spinner from '../components/common/spinner';
import useAlert from '../components/dialog/use-alert';
import { nftApiService } from '../core/api-services/nft-api.service';

export default function Wallet() {
  const [isTop, setIsTop] = useState(true);
  const [raffleState, setRaffleState] = useState(-1);
  const [selectedMenu, setSelectedMenu] = useState(WalletMenuType.NFTs);
  const [showOutcomeStates, setShowOutcomeStates] = useState(true);
  const [loadingCount, setLoadingCount] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isWhiteListed, setIsWhiteListed] = useState(false);
  const [isAllMinted, setIsAllMinted] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [showMint, setShowMint] = useState(false);
  const [presaleAllowed, setPresaleAllowed] = useState(false);
  const [currentTokenId, setCurrentTokenId] = useState(0);
  const [maxMintCount, setMaxMintCount] = useState(3);
  const [isAllowedChainId, setIsAllowedChainId] = useState(false);
  const [isAllowedDirectDrop, setIsAllowedDirectDrop] = useState(false);
  const [tokenIdList, setTokenIdList] = useState<number[]>([]);
  const [tokenPrice, setTokenPrice] = useState<BigNumber>(BigNumber.from(0));
  const [tokenInfoList, setTokenInfoList] = useState<Object[]>([]);
  const [raffleStartTimeLeft, setRaffleStartTimeLeft] = useState<TimeLeft>({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [raffleEndTimeLeft, setRaffleEndTimeLeft] = useState<TimeLeft>({days: 0, hours: 0, minutes: 0, seconds: 0});
  const mintRef = useRef<HTMLDivElement>(null);
  const {connected, provider, wallet} = useContext(AppContext);
  const router = useRouter();
  const alertService = useAlert();

  useEffect(() => {
    updateRaffleState();
    const timer = setInterval(() => {
      setRaffleStartTimeLeft(calculateTimeLeft(0));
      setRaffleEndTimeLeft(calculateTimeLeft(1));
      updateRaffleState();
    }, 1000);
  }, []);

  useEffect(() => {
    getInitialValues();
  }, [raffleState]);

  useEffect(() => {
    getCurrentTokenId();
  }, [showMint]);

  useEffect(() => {
    getTokenInfo();
  }, [tokenIdList]);

  useEffect(() => {
    getInitialValues();
  }, [provider, wallet, connected, isAllowedChainId]);

  useEffect(() => {
    checkChainId();
  }, [provider, wallet, connected]);

  const calculateTimeLeft = useCallback((flag: number): TimeLeft => {
    let difference =
      +new Date(Date.UTC(projectSchedule.wYear, projectSchedule.wMonth - 1, projectSchedule.wDay + flag, projectSchedule.wHour, projectSchedule.wMin, projectSchedule.wSec)) - +new Date();
    let timeLeft: TimeLeft = {days: 0, hours: 0, minutes: 0, seconds: 0};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, []);

  const updateRaffleState = useCallback(() => {
    let differenceFromRaffleStart =
      +new Date(Date.UTC(projectSchedule.wYear, projectSchedule.wMonth - 1, projectSchedule.wDay, projectSchedule.wHour, projectSchedule.wMin, projectSchedule.wSec)) - +new Date();
    let differenceFromRaffleEnd =
      +new Date(Date.UTC(projectSchedule.endYear, projectSchedule.endMonth - 1, projectSchedule.endDay, projectSchedule.endHour, projectSchedule.endMin, projectSchedule.endSec)) - +new Date();

    if (differenceFromRaffleEnd < 1) {
      setRaffleState(RaffleState.Ended);
    } else {
      if (differenceFromRaffleStart > 0) setRaffleState(RaffleState.Waiting);
      if (differenceFromRaffleStart < 1) setRaffleState(RaffleState.Live);
    }
  }, []);

  const idToHexString = useCallback((id: number) => {
    return "0x" + id.toString(16);
  },[]);

  const mintDivClicked = useCallback((event: any) => {
    if (mintRef.current && !mintRef.current.contains(event.target)) {
      setShowMint(false);
    }
  }, []);

  const showMintDiv = useCallback(() => {
    if ((isWhiteListed && !isAllMinted) || (!isWhiteListed && !isAllMinted && isAllowedDirectDrop)) {
      setShowMint(true);
    }
  }, [isWhiteListed, isAllMinted, isAllowedDirectDrop]);

  const shortenTxHash = useCallback((txHash: any) => {
    return txHash.substr(0, 6) + '_' + txHash.substr(txHash.length - 4);
  }, []);

  const stateBarBackground = useMemo(() => {
    switch (raffleState) {
      case RaffleState.Waiting:
        return 'bg-wallet-bar-danger';
      case RaffleState.Live:
        return 'bg-wallet-bar-warning';
      case RaffleState.Ended:
        if (isWhiteListed) {
          return 'bg-wallet-bar-success';
        } else {
          if (isAllowedDirectDrop) {
            return 'bg-wallet-bar-warning';
          } else {
            return 'bg-wallet-bar-danger';
          }
        }
      default:
        return 'bg-danger text-white';
    }
  }, [raffleState, isWhiteListed, isAllowedDirectDrop]);

  const increaseLoading = useCallback(() => {
    setLoadingCount(counter => counter + 1);
  }, []);

  const decreaseLoading = useCallback(() => {
    setLoadingCount(counter => counter - 1);
  }, []);

  const etherPrice = useMemo(() => {
    return tokenPrice ? parseFloat(tokenPrice.mul(10000).div(ethers.constants.WeiPerEther).toString())/10000 : '0.0'
  }, [tokenPrice]);

  const checkChainId = useCallback(async () => {
    if(connected) {
      try {
        increaseLoading();
        const id = await provider.getNetwork().then(network => network.chainId);
        if (id != netInfo.rinkeby.chainId) {
          await provider.send("wallet_switchEthereumChain", [{chainId: idToHexString(netInfo.rinkeby.chainId)}]);
        }
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await provider.send('wallet_addEthereumChain',[{chainId: idToHexString(netInfo.rinkeby.chainId)}]);
          } catch (addError: any) {
            // handle "add" error
            if (addError.code === 4001) {
              alertService.notify('Adding Network', 'You rejected adding network.', 'Ok');
            } else {
              alertService.notify('Adding Network', addError.message || 'You wallet not connect correctly. Please try again.', 'Ok');
            }
          }
        }

        if (switchError.code === 4001) {
          alertService.notify('Switching Network', 'You rejected switching network.', 'Ok');
        } else {
          alertService.notify('Switching Network', switchError.message || 'You wallet not connect correctly. Please try again.', 'Ok');
        }
        // handle other "switch" errors
      } finally {
        decreaseLoading();
        const id = await provider.getNetwork().then(network => network.chainId);
        if (id === netInfo.rinkeby.chainId) {
          setIsAllowedChainId(true);
        } else {
          setIsAllowedChainId(false);
        }
      }
    }
  }, [connected, provider, wallet]);

  const getTokenInfo = useCallback(async () => {
    if (connected && isAllowedChainId) {
      try {
        increaseLoading();
        const contract = new ethers.Contract(process.env.contractAddress as any, ethereumClockTokenAbi, provider.getSigner());
        let tempList: Object[] = [];
        tokenIdList.map(async (tokenId: any) => {
          const tokenURI = await contract.tokenURI(tokenId);
          const res: any = await nftApiService.catIPFSInfo(tokenURI);
          tempList.push(res);
        });
        setTokenInfoList(tempList);
      } catch (err: any) {
        if (err.code === 4001) {
          alertService.notify('Token URI', 'You rejected getting token uri.', 'Ok');
        } else {
          alertService.notify('Token URI', err.code ? 'Response Error Code: ' + err.code : 'You wallet not connect correctly. Please try again.', 'Ok');
        }
      } finally {
        decreaseLoading();
      }
    }
  }, [connected, provider, tokenIdList, isAllowedChainId]);

  const getCurrentTokenId = useCallback(async () => {
    if (connected && isAllowedChainId) {
      try {
        increaseLoading();
        const contract = new ethers.Contract(process.env.contractAddress as any, ethereumClockTokenAbi, provider.getSigner());
        const _currentTokenId = await contract.totalSupply();
        setCurrentTokenId(parseInt(_currentTokenId));
        const _currentPrice = await contract.getPrice(wallet);
        setTokenPrice(_currentPrice);
      } catch (err: any) {
        if (err.code === 4001) {
          alertService.notify('Current Token Information', 'You rejected getting current token information.', 'Ok');
        } else {
          alertService.notify('Current Token Information', err.code ? 'Response Error Code: ' + err.code : 'You wallet not connect correctly. Please try again.', 'Ok');
        }
      } finally {
        decreaseLoading();
      }
    }
  }, [connected, provider, isAllowedChainId]);

  const getInitialValues = useCallback(async () => {
    if (connected && isAllowedChainId) {
      try {
        increaseLoading();
        if (wallet === process.env.ownerAddress || '') {
          setIsOwner(true);
        }
        const contract = new ethers.Contract(process.env.contractAddress as any, ethereumClockTokenAbi, provider.getSigner());
        const _maxMintCount = await contract._MAX_MINT_COUNT_();
        setMaxMintCount(parseInt(_maxMintCount));
        const _mintCount = await contract.mintedCount(wallet);
        if (_mintCount >= _maxMintCount) {
          setIsAllMinted(true);
        } else {
          setIsAllMinted(false);
        }

        const _tokenIdList = await contract.getTokenIdList(wallet);
        setTokenIdList(_tokenIdList.map((id: any) => parseInt(id)) || []);
        const _isAllowedDirectDrop = await contract.isAdditionalDrop();
        setIsAllowedDirectDrop(_isAllowedDirectDrop);
        const _presaleAllowed = await contract._PRESALE_ALLOWED_();
        setPresaleAllowed(!!_presaleAllowed);

        const result = await nftApiService.requestWalletInfo(wallet);
        if (result.state === ErrorMessage.NoneResult) {
          setIsRegistered(false);
          setIsWhiteListed(false);
        } else if (result.state === ErrorMessage.Success) {
          setIsRegistered(true);
          // const mintCountResult = await nftApiService.requestMintCount(wallet);
          // const mintCount = mintCountResult.content || 0;
          // if (mintCount >= maxMintCount) {
          //   setIsAllMinted(true);
          // } else {
          //   setIsAllMinted(false);
          // }
          switch (result.content.state) {
            case WalletSate.WhiteListed:
              setIsWhiteListed(true);
              break;
            case WalletSate.NotWhiteListed:
              setIsWhiteListed(false);
              break;
            case WalletSate.Minted:
              setIsWhiteListed(true);
              break;
          }
        } else {
          alertService.notify('Wallet Information Error', errorDescription[result.state], 'Ok');
          return;
        }
      } catch (err: any) {
        if (err.code === 4001) {
          alertService.notify('Initial Contract Information', 'You rejected getting initial contract information.', 'Ok');
        } else {
          alertService.notify('Initial Contract Information', err.code ? 'Response Error Code: ' + err.code : 'You wallet not connect correctly. Please try again.', 'Ok');
        }
      } finally {
        decreaseLoading();
      }
    }
  }, [connected, provider, wallet, isAllowedChainId]);

  const registerClicked = useCallback(async () => {
    if (connected && isAllowedChainId) {
      try {
        increaseLoading();
        const plainTextRes = await nftApiService.requestPlainText();
        const plainText = plainTextRes.content;
        const signature = await provider.getSigner().signMessage(plainText);
        const registerRes = await nftApiService.registerWallet(wallet, signature);
        if (registerRes.state === ErrorMessage.Success) {
          setIsRegistered(true);
          alertService.notify('Register Success', 'You wallet address ' + shortenTxHash(wallet) + ' joined raffle, good luck!', 'Ok');
        } else {
          alertService.notify('Wallet Register Error', errorDescription[registerRes.state], 'Ok');
        }
      } catch (err: any) {
        if (err.code === 4001) {
          alertService.notify('Register Raffle', 'You rejected registering to the raffle.', 'Ok');
        } else {
          alertService.notify('Register Raffle', err.code ? 'Response Error Code: ' + err.code : 'You wallet not connect correctly. Please try again.', 'Ok');
        }
      } finally {
        decreaseLoading();
      }
    }
  }, [provider, wallet, isAllowedChainId]);

  const raffleClicked = useCallback(async () => {
    if (isOwner && connected && isAllowedChainId) {
      try {
        increaseLoading();
        const plainTextRes = await nftApiService.requestPlainText();
        const plainText = plainTextRes.content;
        const signature = await provider.getSigner().signMessage(plainText);

        const raffleRes = await nftApiService.raffle(signature);
        if (raffleRes.state === ErrorMessage.Success) {
          const whiteList = raffleRes.content;
          if (whiteList.includes(wallet)) {
            setIsWhiteListed(true);
          }
          if (whiteList.length) {
            const contract = new ethers.Contract(process.env.contractAddress as any, ethereumClockTokenAbi, provider.getSigner());
            await contract.raffle(whiteList);
            alertService.notify('Raffle Success', whiteList.length + ' addresses successfully whitelisted.', 'Ok');
          } else {
            alertService.notify('Raffle Warning', 'None account to raffle.', 'Ok');
          }
        } else {
          alertService.notify('Raffle Error', errorDescription[raffleRes.state], 'Ok');
        }
      } catch (err: any) {
        if (err.code === 4001) {
          alertService.notify('Raffle', 'You rejected raffle.', 'Ok');
        } else {
          alertService.notify('Raffle', err.code ? 'Response Error Code: ' + err.code : 'You wallet not connect correctly. Please try again.', 'Ok');
        }
      } finally {
        decreaseLoading();
      }
    }
  }, [provider, wallet, isAllowedChainId, isOwner]);

  const resetClicked = useCallback(async () => {
    if (isOwner && connected && isAllowedChainId) {
      try {
        increaseLoading();
        const contract = new ethers.Contract(process.env.contractAddress as any, ethereumClockTokenAbi, provider.getSigner());
        await contract.enableRaffle();

        const plainTextRes = await nftApiService.requestPlainText();
        const plainText = plainTextRes.content;
        const signature = await provider.getSigner().signMessage(plainText);
        const raffleRes = await nftApiService.reset(signature);
        if (raffleRes.state === ErrorMessage.Success) {
          alertService.notify('Reset Success', 'Successfully reset.', 'Ok');
          setIsRegistered(false);
        } else {
          alertService.notify('Reset Error', errorDescription[raffleRes.state], 'Ok');
        }
      } catch (err: any) {
        if (err.code === 4001) {
          alertService.notify('Reset Raffle', 'You rejected resetting raffle.', 'Ok');
        } else {
          alertService.notify('Reset Raffle', err.code ? 'Response Error Code: ' + err.code : 'You wallet not connect correctly. Please try again.', 'Ok');
        }
      } finally {
        decreaseLoading();
      }
    }
  }, [provider, wallet, connected, isAllowedChainId, isOwner]);

  const mint = useCallback(async () => {
    if (connected && isAllowedChainId) {
      try {
        increaseLoading();
        const contract = new ethers.Contract(process.env.contractAddress as any, ethereumClockTokenAbi, provider.getSigner());
        const dropSubscriber = isWhiteListed ? await contract.drop({value: tokenPrice, from: wallet}) : await contract.directDrop({value: tokenPrice, from: wallet});
        await dropSubscriber.wait();
        // await contract.drop().send({
        //   from: wallet,
        //   value: presaleAllowed ? process.env.preSaleAmount : process.env.publicSaleAmount
        // });
        let tokenId = await contract.totalSupply();
        tokenId = parseInt(tokenId);
        setShowMint(false);
        const _mintCount = await contract.mintedCount(wallet);
        if (_mintCount >= maxMintCount) {
          setIsAllMinted(true);
        } else {
          setIsAllMinted(false);
        }
        const _tokenIdList = await contract.getTokenIdList(wallet);
        setTokenIdList(_tokenIdList.map((id: any) => parseInt(id)) || []);

        const plainTextRes = await nftApiService.requestPlainText();
        const plainText = plainTextRes.content;
        const signature = await provider.getSigner().signMessage(plainText);
        if (!isWhiteListed) {
          const directWalletRes = await nftApiService.registerDirectWallet(wallet, signature);
          if (directWalletRes.state === ErrorMessage.Success) {
            setIsWhiteListed(true);
          }
        }
        const updateRes = await nftApiService.updateWalletInfo(wallet, WalletSate.Minted, signature);
        if (updateRes.state === ErrorMessage.Success) {
          alertService.notify('Minting Success', 'You minted a ' + tokenId + '\'s Eth-Clock NFT.', 'Ok');
        } else {
          alertService.notify('Mint Error', errorDescription[updateRes.state], 'Ok');
        }
      } catch (err: any) {
        if (err.code === 4001) {
          alertService.notify('Token Dropping', 'You rejected dropping.', 'Ok');
        } else {
          alertService.notify('Token Dropping', err.code ? 'Response Error Code: ' + err.code : 'You wallet not connect correctly. Please try again.', 'Ok');
        }
      } finally {
        decreaseLoading();
      }
    }
  }, [wallet, provider, connected, isAllowedChainId, isWhiteListed, tokenPrice]);

  const stateComponent = useMemo(() => {
    return (<>
      <div
        className={'p-25 w-full border-y border-gradient-light flex flex-col md:flex-row md:justify-between ' + stateBarBackground}>
        <div className="flex items-start xl:items-center flex-col xl:flex-row">
          <div className="flex items-center">
            <span><Icon name="starWithRhombus" size={36} color="white"/></span>
            <span className="font-bold text-30 font-Subjectivity text-white ml-5">ethereum clock</span>
          </div>
          <div onClick={() => router.push('/nfts')} className="px-20 py-10 xl:ml-15 rounded-full bg-black-50 flex items-center cursor-pointer">
            <span className="text-white text-16 font-semibold mr-10">View Collection</span>
            <a><Icon name="hyperLink" color="white" size={16}/></a>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row xl:items-center items-end">
          <div className="text-white">
            {raffleState === RaffleState.Waiting && (
              <span className="font-medium text-16 mr-15">
                      RAFFLE BEGINS ON {monthNames[projectSchedule.wMonth - 1] + ' ' + projectSchedule.wDay + ', ' + projectSchedule.wYear}
                    </span>
            )}
            {raffleState === RaffleState.Live && (
              <span className="font-medium text-16 mr-15">
                      RESULTS WILL BE LIVE IN
                    </span>
            )}
          </div>
          <div className="text-white">
            {raffleState === RaffleState.Waiting && (
              <span className="font-bold text-30">
                      {`${
                        raffleStartTimeLeft.days < 10
                          ? '0' + raffleStartTimeLeft.days
                          : raffleStartTimeLeft.days
                      }:${
                        raffleStartTimeLeft.hours < 10
                          ? '0' + raffleStartTimeLeft.hours
                          : raffleStartTimeLeft.hours
                      }:${
                        raffleStartTimeLeft.minutes < 10
                          ? '0' + raffleStartTimeLeft.minutes
                          : raffleStartTimeLeft.minutes
                      }:${
                        raffleStartTimeLeft.seconds < 10
                          ? '0' + raffleStartTimeLeft.seconds
                          : raffleStartTimeLeft.seconds
                      }`}
                    </span>
            )}

            {raffleState === RaffleState.Live && (
              <span className="font-bold text-30">
                      {`${
                        raffleEndTimeLeft.days < 10
                          ? '0' + raffleEndTimeLeft.days
                          : raffleEndTimeLeft.days
                      }:${
                        raffleEndTimeLeft.hours < 10
                          ? '0' + raffleEndTimeLeft.hours
                          : raffleEndTimeLeft.hours
                      }:${
                        raffleEndTimeLeft.minutes < 10
                          ? '0' + raffleEndTimeLeft.minutes
                          : raffleEndTimeLeft.minutes
                      }:${
                        raffleEndTimeLeft.seconds < 10
                          ? '0' + raffleEndTimeLeft.seconds
                          : raffleEndTimeLeft.seconds
                      }`}{' '}
                Left
                    </span>
            )}
            {raffleState === RaffleState.Ended && (
              <div className="flex gap-10">
                <div onClick={() => showMintDiv()}
                     className={'px-20 py-10 xl:ml-15 rounded-full flex items-center cursor-pointer ' + (connected ? 'block ' : 'hidden ') + (isWhiteListed ? 'bg-success-500' : (isAllowedDirectDrop ? 'bg-success-200' : 'bg-danger'))}>
                  <span className="mr-10"><Icon name={isWhiteListed ? 'gem' : 'circle_info'} color="white"
                                                size={16}/></span>
                  <span
                    className="text-white text-16 font-semibold">{isWhiteListed ? (isAllMinted ? maxMintCount + ' times Minted' : 'Start Minting') : (isAllowedDirectDrop ? 'Direct Mint' : 'Not Whitelisted')}</span>
                </div>
                <div onClick={() => raffleClicked()}
                     className={'px-20 py-10 xl:ml-15 rounded-full flex items-center cursor-pointer bg-danger ' + (isOwner && connected ? 'block ' : 'hidden ') + (isWhiteListed ? 'bg-success-500' : (isAllowedDirectDrop ? 'bg-success-200' : 'bg-danger'))}>
                  <span className="mr-10"><Icon name="gem" color="white" size={16}/></span>
                  <span title="Owner can only do raffle" className="text-white text-16 font-semibold">Raffle</span>
                </div>
                <div onClick={() => resetClicked()}
                     className={'px-20 py-10 xl:ml-15 rounded-full flex items-center cursor-pointer bg-danger ' + (isOwner && connected ? 'block ' : 'hidden ') + (isWhiteListed ? 'bg-success-500' : (isAllowedDirectDrop ? 'bg-success-200' : 'bg-danger'))}>
                  <span className="mr-10"><Icon name="setting" color="white" size={16}/></span>
                  <span title="Owner can only do reset" className="text-white text-16 font-semibold">Reset</span>
                </div>
              </div>
            )}
          </div>
          {raffleState === RaffleState.Live && (
            <>
              <div
                className={'px-20 py-10 xl:ml-15 rounded-full bg-success flex items-center cursor-pointer ' + (isRegistered ? 'hidden' : 'block')}
                onClick={() => registerClicked()}>
                <span className="text-white text-16 font-semibold">JOIN RAFFLE</span>
              </div>
              <div
                className={'px-20 py-10 xl:ml-15 rounded-full bg-white-50 flex items-center ' + (isRegistered ? 'block' : 'hidden')}>
                <span className="mr-10"><Icon name="check_circle" color="white" size={16}/></span>
                <span className="text-white text-16 font-semibold">Joined Raffle</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>);
  }, [stateBarBackground, raffleStartTimeLeft, raffleEndTimeLeft, raffleState, isWhiteListed, isRegistered, isAllowedDirectDrop, maxMintCount, isAllMinted]);

  return (
    <>
      <Head>
        <title>Brainchild: Wallet</title>
        <meta
          name="description"
          content="EthClock: nft collections for owner's wallet address, show enhance, redeem and god-tier functionality for each one."
        />
      </Head>
      <Layout>
        <div className="relative flex flex-col xl:flex-row overflow-hidden">
          <div id="left-bar"
               className={'sm:min-w-400 top-65 flex flex-col z-50 dark-background-image ' + (isTop ? 'xl:h-screen-without-navbar_1' : 'xl:h-screen-without-topbar_1')}
               role="img" aria-label="Gradient background Image">
            <div className="bg-white-10 p-20 xl:p-30 h-full">
              <div className="flex items-center justify-between border-b border-gradient-light">
                <div onClick={() => setSelectedMenu(WalletMenuType.NFTs)}
                     className={'cursor-pointer pb-20 pr-10 border-b-2 ' + (selectedMenu === WalletMenuType.NFTs ? 'opacity-100 border-white' : 'opacity-30 border-transparent')}>
                  <h1 className="text-bold font-Subjectivity text-24 break-all text-white"><Icon className="mr-10"
                                                                                                 name="rhombusStars"
                                                                                                 color="white"
                                                                                                 size={20}/>NFTs</h1>
                </div>
                <div onClick={() => setSelectedMenu(WalletMenuType.TransactionHistory)}
                     className={'hidden cursor-pointer pb-20 pl-10 border-b-2 ' + (selectedMenu === WalletMenuType.TransactionHistory ? 'opacity-100 border-white' : 'opacity-30 border-transparent')}>
                  <h1 className="text-bold font-Subjectivity text-24 break-all text-white"><Icon className="mr-10"
                                                                                                 name="arrowLeftRight"
                                                                                                 color="white"
                                                                                                 size={20}/>Transaction
                    History</h1>
                </div>
              </div>

              <div className="mt-20 xl:mt-40 flex items-center justify-between text-16">
                <div className="hidden xl:block">
                  <span className="font-medium text-16 text-white">NFT Status</span>
                </div>
                <div onClick={() => setShowOutcomeStates(!showOutcomeStates)}
                     className="xl:hidden text-white flex items-center px-20 py-10 bg-white-10 rounded-xl cursor-pointer">
                  <span className="mr-10">NFT Status</span>
                  <span><Icon name={showOutcomeStates ? 'down' : 'up'} color="white" size={10}/></span>
                </div>
                <div className="hidden text-white flex items-center px-20 py-10 bg-white-10 rounded-xl">
                  <span className="opacity-30 mr-5">Sort by:</span>
                  <span className="mr-10">Mint Date</span>
                  <span><Icon name="down" color="white" size={10}/></span>
                </div>
              </div>

              <div
                className={'mt-20 xl:mt-40 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 xl:grid-rows-4 gap-10 ' + (showOutcomeStates ? 'block' : 'hidden')}>
                <div
                  className="p-10 sm:p-25 dark-background-image rounded-2xl font-medium text-white flex flex-col justify-between cursor-pointer"
                  role="img" aria-label="Gradient background Image">
                  <div>
                    <p className="font-Subjectivity text-24 break-all">ENHANCABLE</p>
                    <p className="text-16 opacity-50">{tokenIdList.length} NFTs</p>
                  </div>
                  <div className="-mb-10 sm:-mb-25 -mr-5 sm:-mr-10 flex justify-end">
                    <Image src="/assets/images/wallet/red-up-arrow.png" layout="intrinsic" width="100" height="100"
                           alt="Red Up Arrow"/>
                  </div>
                </div>
                <div
                  className="hidden p-10 sm:p-25 dark-background-image rounded-2xl font-medium text-white flex flex-col justify-between cursor-pointer"
                  role="img" aria-label="Gradient background Image">
                  <div>
                    <p className="font-Subjectivity text-24 break-all">GOD-TEIR</p>
                    <p className="text-16 opacity-50">0 NFTs</p>
                  </div>
                  <div className="-mb-10 sm:-mb-25 -mr-5 sm:-mr-10 flex justify-end">
                    <Image src="/assets/images/wallet/red-crown.png" layout="intrinsic" width="100" height="100"
                           alt="Red Up Arrow"/>
                  </div>
                </div>
                <div
                  className="p-10 sm:p-25 dark-background-image rounded-2xl font-medium text-white flex flex-col justify-between cursor-pointer"
                  role="img" aria-label="Gradient background Image">
                  <div>
                    <p className="font-Subjectivity text-24 break-all">FROZEN</p>
                    <p className="text-16 opacity-50">0 NFTs</p>
                  </div>
                  <div className="-mb-10 sm:-mb-25 -mr-5 sm:-mr-10 flex justify-end">
                    <Image src="/assets/images/wallet/red-snow.png" layout="intrinsic" width="100" height="100"
                           alt="Red Up Arrow"/>
                  </div>
                </div>
                {/*<div className="p-10 sm:p-25 dark-background-image rounded-2xl font-medium text-white flex flex-col justify-between cursor-pointer">*/}
                {/*  <div>*/}
                {/*    <p className="font-Subjectivity text-24 break-all">FAILED</p>*/}
                {/*    <p className="text-16 opacity-50">0 NFTs</p>*/}
                {/*  </div>*/}
                {/*  <div className="-mb-10 sm:-mb-25 -mr-5 sm:-mr-10 flex justify-end">*/}
                {/*    <Image src="/assets/images/wallet/red-circle-quote.png" layout="intrinsic" width="100" height="100" alt="Red Up Arrow"/>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <div
                  className="p-10 sm:p-25 dark-background-image rounded-2xl font-medium text-white flex flex-col justify-between cursor-pointer"
                  role="img" aria-label="Gradient background Image">
                  <div>
                    <p className="font-Subjectivity text-24 break-all">CHARRED</p>
                    <p className="text-16 opacity-50">0 NFTs</p>
                  </div>
                  <div className="-mb-10 sm:-mb-25 -mr-5 sm:-mr-10 flex justify-end">
                    <Image src="/assets/images/wallet/red-fire.png" layout="intrinsic" width="100" height="100"
                           alt="Red Up Arrow"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="content" className="grow">
            {stateComponent}
            {raffleState === RaffleState.Ended && isWhiteListed && (
              <div className="w-full bg-white px-20 py-15 text-16 font-bold flex justify-between">
                <p>CONGRATULATIONS!</p>
                <p><span><Icon name="gift" color="black" size={16}/></span>You’re Whitelisted</p>
              </div>
            )}
            <div
              className={'flex flex-col justify-center items-center my-40 px-10 ' + (tokenIdList.length === 0 ? 'block' : 'hidden')}>
              <p className="text-30 lg:text-60 font-Future wallet-notify-background">You dont own any</p>
              <p className="text-40 lg:text-80 font-Future wallet-notify-background">brainchildNFTs</p>
              <p className="text-22 lg:text-40 text-right font-Future wallet-notify-background">...yet</p>
              <div
                className="text-[#363738] font-bold text-16 sm:text-18 p-20 sm:p-25 rounded-[20px] bg-white flex items-center justify-between cursor-pointer mt-20"
                onClick={() => router.push('/nfts')}
              >
                <img src="/assets/images/landing-page/icon-ethereum.svg" alt="Ethereum Icon"/>
                <span className="mx-15">EXPLORE COLLECTION</span>
                <img src="/assets/images/landing-page/icon-arrow-right.svg" alt="Ethereum Icon"/>
              </div>
            </div>
            <div className={'' + (tokenIdList.length === 0 ? 'hidden' : 'block')}>
              {tokenInfoList.map((tokenInfo: any, index) => (<div key={index}>
                <div className="flex flex-col md:flex-row py-50">
                  <div className="md:w-1/2 lg:w-1/3 flex justify-center items-center px-40">
                    <div>
                      {tokenInfo.image && tokenInfo.image.includes('mp4') &&
                        <video id="background-video" autoPlay loop muted>
                          <source src={tokenInfo.image} type="video/mp4"/>
                        </video>}
                      {tokenInfo.image && tokenInfo.image.includes('png') &&
                        <Image src={tokenInfo.image} layout="intrinsic" width="384" height="524" alt="Ethereum Clock"/>}
                    </div>
                  </div>

                  <div className="md:w-1/2 lg:w-2/3 px-40 mt-50 md:mt-0">
                    <div className="flex justify-between items-center">
                      <p className="font-Future text-white text-70">#{tokenIdList[index]}</p>
                      <div className="w-100 h-100 rounded-full bg-wallet-bar-danger flex justify-center items-center">
                        <p className="font-Future text-danger text-80 -mb-10">{index + 1}</p>
                      </div>
                    </div>
                    <div className="mt-50">
                      <p className="text-white text-18 font-semibold">RARITY TRAITS</p>
                      <div className="flex">
                        <div className="w-1/2">
                          <p className="text-18 text-white mt-20 opacity-50"><Icon className="mr-20"
                                                                                   name="environment_icon" color="white"
                                                                                   size={20}/> Environment</p>
                          <p className="text-18 text-white mt-20 opacity-50"><Icon className="mr-20" name="shine_icon"
                                                                                   color="white" size={20}/> Shine</p>
                          <p className="text-18 text-white mt-20 opacity-50"><Icon className="mr-20"
                                                                                   name="efficiency_icon" color="white"
                                                                                   size={20}/> Efficiency</p>
                          <div
                            className="rounded-xl py-25 bg-danger text-white opacity-50 flex justify-center items-center flex-col mx-5 mt-20 cursor-pointer">
                            <p className="text-20 font-bold font-Subjectivity">ENHANCE</p>
                            <p className="text-14 font-bold font-Subjectivity">Coming Soon!</p>
                          </div>
                        </div>
                        <div className="w-1/2">
                          <p className="text-18 text-white mt-20 font-medium">{tokenInfo.attributes[0].value}<span
                            className="opacity-50 ml-20">{probabilities[tokenInfo.attributes[0].trait_type][tokenInfo.attributes[0].value]}</span>
                          </p>
                          <p className="text-18 text-white mt-20 font-medium">{tokenInfo.attributes[1].value}<span
                            className="opacity-50 ml-20">{probabilities[tokenInfo.attributes[1].trait_type][tokenInfo.attributes[1].value]}</span>
                          </p>
                          <p className="text-18 text-white mt-20 font-medium">{tokenInfo.attributes[2].value}<span
                            className="opacity-50 ml-20">{probabilities[tokenInfo.attributes[2].trait_type][tokenInfo.attributes[2].value]}</span>
                          </p>
                          <div
                            className="rounded-xl py-25 bg-primary text-white opacity-50 flex justify-center items-center flex-col mx-5 mt-20 cursor-pointer">
                            <p className="text-20 font-bold font-Subjectivity">REDEEM</p>
                            <p className="text-14 font-bold font-Subjectivity">Coming Soon!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>))}
            </div>
          </div>

          <div onClick={mintDivClicked}
               className={'absolute top-100 w-screen z-999 p-40 lg:p-100 wallet-mint-background min-w-1600 left-1/2 -translate-x-1/2 ' + (showMint ? 'block' : 'hidden')}>
            <div className="flex justify-between">
              <div><Image src="/assets/images/wallet/wallet_clock1.png" layout="intrinsic" width="307" height="418"
                          alt="Ethereum Clock"/></div>
              <div><Image src="/assets/images/wallet/wallet_clock2.png" layout="intrinsic" width="307" height="418"
                          alt="Ethereum Clock"/></div>
              <div><Image src="/assets/images/wallet/wallet_clock3.png" layout="intrinsic" width="307" height="418"
                          alt="Ethereum Clock"/></div>
              <div><Image src="/assets/images/wallet/wallet_clock4.png" layout="intrinsic" width="307" height="418"
                          alt="Ethereum Clock"/></div>
            </div>
            <div ref={mintRef}
                 className="absolute w-300 h-400 bg-white-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white rounded-3xl">
              <div
                className="bg-[url('/assets/images/nfts/enhancements/question-mark-with-stars.png')] bg-cover bg-no-repeat bg-center w-full h-full">
                <div className="h-200 w-full text-white flex flex-col justify-center items-center">
                  <p className="text-40 font-semibold">{currentTokenId} / {presaleAllowed ? 420 : 5000}</p>
                  <p className="text-16 font-bold">MINTED</p>
                </div>
                <div className="bg-black-70 h-200 rounded-3xl w-full flex flex-col">
                  <div className="grow text-white text-20 font-semibold flex flex-col justify-center items-center">
                    <p>1 mint per wallet</p>
                    <p>{etherPrice} ETH
                      each</p>
                  </div>
                  <div
                    className="flex justify-center items-center bg-white rounded-3xl py-25 text-18 font-bold cursor-pointer"
                    onClick={() => mint()}>
                    <span className="mr-25"><Icon name="gem" color="black" size={16}/></span>
                    <span>MINT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Spinner isLoading={loadingCount > 0}/>
      </Layout>
    </>
  );
}
