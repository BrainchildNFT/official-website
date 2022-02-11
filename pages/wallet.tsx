import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Web3 from 'web3';

import { monthNames, projectSchedule, TimeLeft, probabilities } from '../core/data/base';
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
  const [isTop, setIsTop] = useState(true)
  const [raffleState, setRaffleState] = useState(RaffleState.Waiting)
  const [selectedMenu, setSelectedMenu] = useState(WalletMenuType.NFTs);
  const [showOutcomeStates, setShowOutcomeStates] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isWhiteListed, setIsWhiteListed] = useState(false);
  const [showMint, setShowMint] = useState(false);
  const [presaleAllowed, setPresaleAllowed] = useState(false);
  const [currentTokenId, setCurrentTokenId] = useState(0);
  const [tokenIdList, setTokenIdList] = useState<number[]>([]);
  const [tokenInfoList, setTokenInfoList] = useState<Object[]>([]);
  const [raffleStartTimeLeft, setRaffleStartTimeLeft] = useState<TimeLeft>({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [raffleEndTimeLeft, setRaffleEndTimeLeft] = useState<TimeLeft>({days: 0, hours: 0, minutes: 0, seconds: 0});
  const mintRef = useRef<HTMLDivElement>(null);
  const { wallet } = useContext(AppContext);
  const router = useRouter();
  const alertService = useAlert();

  const calculateTimeLeft = (flag: number): TimeLeft => {
    let difference =
      +new Date(Date.UTC(projectSchedule.wYear, projectSchedule.wMonth - 1, projectSchedule.wDay + flag, projectSchedule.wHour, projectSchedule.wMin, projectSchedule.wSec)) - +new Date()
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const updateRaffleState = () => {
    let differenceFromRaffleStart =
      +new Date(Date.UTC(projectSchedule.wYear, projectSchedule.wMonth - 1, projectSchedule.wDay, projectSchedule.wHour, projectSchedule.wMin, projectSchedule.wSec)) - +new Date()
    let differenceFromRaffleEnd =
      +new Date(Date.UTC(projectSchedule.endYear, projectSchedule.endMonth - 1, projectSchedule.endDay, projectSchedule.endHour, projectSchedule.endMin, projectSchedule.endSec)) - +new Date()

    if (differenceFromRaffleEnd < 1) {
      setRaffleState(RaffleState.Ended)
    } else {
      if (differenceFromRaffleStart > 0) setRaffleState(RaffleState.Waiting)
      if (differenceFromRaffleStart < 1) setRaffleState(RaffleState.Live)
    }
  }

  useEffect(() => {
    if (!wallet) {
      router.push('/');
    } else {
      // const source = `{
      //                   "name":"Pending #1",
      //                   "symbol":"BRAINChiLD",
      //                   "edition":"2022",
      //                   "description":"BrainchildNFT Pending Image",
      //                   "image":"https://ipfs.io/ipfs/QmeUx26kP3SybJGPKGgQqp5ABcU8jBwZyt9UPat24PLopw",
      //                   "external_url":"https://ipfs.io/ipfs/images/1.png",
      //                   "attributes":[
      //                     {
      //                       "trait_type":"Environment",
      //                       "value":"Reneqade Node"
      //                     },
      //                     {
      //                       "trait_type":"Shine",
      //                       "value":"Marble"
      //                     },
      //                     {
      //                       "trait_type":"Efficiency",
      //                       "value":"Brilliant"
      //                     }
      //                   ]
      //                 }`;
      // setTokenIdList([3080]);
      // setTokenInfoList([JSON.parse(source)]);
      updateRaffleState();
    }

    const timer = setInterval(() => {
      setRaffleStartTimeLeft(calculateTimeLeft(0))
      setRaffleEndTimeLeft(calculateTimeLeft(1))
      updateRaffleState()
    }, 1000)
  }, [])

  useEffect(() => {
    getInitialValues();
  }, [raffleState]);

  useEffect(() => {
    getCurrentTokenId();
  }, [showMint])

  useEffect(() => {
    getTokenInfo();
  }, [tokenIdList])

  const mintDivClicked = (event: any) => {
    if (mintRef.current && !mintRef.current.contains(event.target)) {
      setShowMint(false);
    }
  };

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
          return 'bg-wallet-bar-danger';
        }
      default:
        return 'bg-danger text-white';
    }
  }, [raffleState, isWhiteListed]);

  const getTokenInfo = async () => {
    try {
      setIsLoading(true);
      const web3 = new Web3(Web3.givenProvider);
      const contract = new web3.eth.Contract(ethereumClockTokenAbi as any, process.env.contractAddress);
      let tempList: Object[] = [];
      tokenIdList.map(async (tokenId: any) => {
        const tokenURI = await contract.methods.tokenURI(tokenId).call();
        const res: any = await nftApiService.requestNFTInfo(tokenURI);
        tempList.push(JSON.parse(res));
      })
      setTokenInfoList(tempList);
    } catch(err: any) {
      alertService.notify('MetaMask Connection Error', 'You wallet not connect correctly. Please try again.', 'Ok');
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentTokenId = async () => {
    try {
      setIsLoading(true);
      const web3 = new Web3(Web3.givenProvider);
      const contract = new web3.eth.Contract(ethereumClockTokenAbi as any, process.env.contractAddress);
      const _currentTokenId = await contract.methods.currentTokenId().call();
      setCurrentTokenId(_currentTokenId);
    } catch(err: any) {
      alertService.notify('MetaMask Connection Error', 'You wallet not connect correctly. Please try again.', 'Ok');
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

  const getInitialValues = async () => {
    try {
      setIsLoading(true);
      const web3 = new Web3(Web3.givenProvider);
      const contract = new web3.eth.Contract(ethereumClockTokenAbi as any, process.env.contractAddress);
      const registerFlag = await contract.methods.userList(wallet).call();
      setIsRegistered(!!registerFlag);
      const _presaleAllowed = await contract.methods._PRESALE_ALLOWED_().call();
      setPresaleAllowed(!!_presaleAllowed);
      const whiteListedFlag = await contract.methods.whiteList(wallet).call();
      setIsWhiteListed(!!whiteListedFlag);
      const _tokenIdList = await contract.methods.tokenIdList(wallet).call();
      setTokenIdList(_tokenIdList || []);
    } catch(err: any) {
      alertService.notify('MetaMask Connection Error', 'You wallet not connect correctly. Please try again.', 'Ok');
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  }

  const raffleClicked = async () => {
    try {
      setIsLoading(true);
      const web3 = new Web3(Web3.givenProvider);
      const contract = new web3.eth.Contract(ethereumClockTokenAbi as any, process.env.contractAddress, {from: wallet, gasPrice: '20000000000'});
      if (!isRegistered) {
        contract.methods.register().send({from: wallet})
        .on('transactionHash', function(hash: any){
          alertService.notify('Raffle Success', 'You wallet address joined raffle.', 'Ok');
        })
        .on('receipt', function(receipt: any){
          console.log('receipt = ', receipt);
        })
        .on('confirmation', function(confirmationNumber: any, receipt: any){
          getInitialValues()
        })
        .on('error', function(error: any, receipt: any) {
          alertService.notify('Raffle Failed', 'You wallet didn\'t joined raffle. Please try again', 'Ok');
        });
      } else {
        alertService.notify('Raffle Failed', 'You wallet address already registered.', 'Ok');
      }
    } catch(err: any) {
      alertService.notify('MetaMask Connection Error', 'You wallet not connect correctly. Please try again.', 'Ok');
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  }

  const mint = () => {
    if (isWhiteListed) {
      try {
        setIsLoading(true);
        const web3 = new Web3(Web3.givenProvider);
        const contract = new web3.eth.Contract(ethereumClockTokenAbi as any, process.env.contractAddress, {from: wallet, gasPrice: '20000000000'});
        contract.methods.drop().send({from: wallet, value: presaleAllowed ? process.env.preSaleAmount : process.env.publicSaleAmount})
          .on('transactionHash', function(hash: any){
            console.log('hash - ', hash);
            alertService.notify('Minting Success', 'You minted a Eth-Clock NFT.', 'Ok');
          })
          .on('receipt', function(receipt: any){
            console.log('receipt = ', receipt);
          })
          .on('confirmation', function(confirmationNumber: any, receipt: any){
            console.log('confirmationNumber - ', confirmationNumber);
            console.log('receipt - ', receipt);
            setShowMint(false);
            getInitialValues();
          })
          .on('error', function(error: any, receipt: any) {
            alertService.notify('Minting Failed', 'You wallet didn\'t mint. Please try again', 'Ok');
          });
      } catch(err: any) {
        alertService.notify('MetaMask Connection Error', 'You wallet not connect correctly. Please try again.', 'Ok');
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    }
  }

  const stateComponent = useMemo(() => {
    return (<>
      <div className={"p-25 w-full border-y border-gradient-light flex flex-col md:flex-row md:justify-between " + stateBarBackground}>
        <div className="flex items-start xl:items-center flex-col xl:flex-row">
          <div className="flex items-center">
            <span><Icon name="starWithRhombus" size={36} color="white"/></span>
            <span className="font-bold text-30 font-Subjectivity text-white ml-5">ethereum clock</span>
          </div>
          <div className="px-20 py-10 xl:ml-15 rounded-full bg-black-50 flex items-center">
            <span className="text-white text-16 font-semibold mr-10">View Collection</span>
            <Link href="/nfts"><a className="cursor-pointer"><Icon name="hyperLink" color="white" size={16} /></a></Link>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row xl:items-center items-end">
          <div className="text-white">
            {raffleState === RaffleState.Waiting && (
              <span className="font-medium text-16 mr-15">
                      RAFFLE BEGINS ON { monthNames[projectSchedule.wMonth - 1] + ' ' + projectSchedule.wDay + ', ' + projectSchedule.wYear }
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
              <div onClick={() => setShowMint(true)} className={"px-20 py-10 xl:ml-15 rounded-full flex items-center cursor-pointer " + (isWhiteListed ? 'bg-success-500' : 'bg-danger')}>
                <span className="mr-10"><Icon name={isWhiteListed ? 'gem' : 'circle_info'} color="white" size={16} /></span>
                <span className="text-white text-16 font-semibold">{isWhiteListed ? 'Start Minting' : 'Not Whitelisted'}</span>
              </div>
            )}
          </div>
          {raffleState === RaffleState.Live && (
            <>
              <div className={"px-20 py-10 xl:ml-15 rounded-full bg-success flex items-center cursor-pointer " + (isRegistered ? 'hidden' : 'block')} onClick={() => raffleClicked()}>
                <span className="text-white text-16 font-semibold">JOIN RAFFLE</span>
              </div>
              <div className={"px-20 py-10 xl:ml-15 rounded-full bg-white-50 flex items-center " + (isRegistered ? 'block' : 'hidden')}>
                <span className="mr-10"><Icon name="check_circle" color="white" size={16} /></span>
                <span className="text-white text-16 font-semibold">Joined Raffle</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>)
  }, [stateBarBackground, raffleStartTimeLeft, raffleEndTimeLeft, raffleState, isWhiteListed, isRegistered])

  // @ts-ignore
  // @ts-ignore
  return (
    <>
      <Head>
        <title>Brainchild: Wallet</title>
        <meta
          name="description"
          content=""
        />
      </Head>
      <Layout>
        <div className="relative flex flex-col xl:flex-row overflow-hidden">
          <div id="left-bar" className={'sm:min-w-500 top-65 flex flex-col z-50 dark-background-image ' + (isTop ? 'xl:h-screen-without-navbar' : 'xl:h-screen-without-topbar')}>
            <div className="bg-white-10 p-20 xl:p-30 h-full">
              <div className="flex items-center justify-between border-b border-gradient-light">
                <div onClick={() => setSelectedMenu(WalletMenuType.NFTs)} className={"cursor-pointer pb-20 pr-10 border-b-2 " + (selectedMenu === WalletMenuType.NFTs ? 'opacity-100 border-white' : 'opacity-30 border-transparent') }>
                  <Icon name="rhombusStars" color="white" size={20} />
                  <span className="text-bold font-Subjectivity text-24 break-all ml-10 text-white">NFTs</span>
                </div>
                <div onClick={() => setSelectedMenu(WalletMenuType.TransactionHistory)} className={"cursor-pointer pb-20 pl-10 border-b-2 " + (selectedMenu === WalletMenuType.TransactionHistory ? 'opacity-100 border-white' : 'opacity-30 border-transparent') }>
                  <Icon name="arrowLeftRight" color="white" size={20} />
                  <span className="text-bold font-Subjectivity text-24 break-all ml-10 text-white">Transaction History</span>
                </div>
              </div>

              <div className="mt-20 xl:mt-40 flex items-center justify-between text-16">
                <div className="hidden xl:block">
                  <span className="font-medium text-16 text-white">OUTCOME STATES</span>
                </div>
                <div onClick={() => setShowOutcomeStates(!showOutcomeStates)} className="xl:hidden text-white flex items-center px-20 py-10 bg-white-10 rounded-xl cursor-pointer">
                  <span className="mr-10">OUTCOME STATES</span>
                  <span><Icon name={showOutcomeStates ? 'down' : 'up'} color="white" size={10} /></span>
                </div>
                <div className="text-white flex items-center px-20 py-10 bg-white-10 rounded-xl">
                  <span className="opacity-30 mr-5">Sort by:</span>
                  <span className="mr-10">Mint Date</span>
                  <span><Icon name="down" color="white" size={10} /></span>
                </div>
              </div>

              <div className={"mt-20 xl:mt-40 grid grid-cols-2 grid-rows-3 gap-10 " + (showOutcomeStates ? 'block' : 'hidden')}>
                <div className="p-10 sm:p-25 dark-background-image rounded-2xl font-medium text-white flex flex-col justify-between">
                  <div>
                    <p className="font-Subjectivity text-24 break-all">ENHANCABLE</p>
                    <p className="text-16 opacity-50">12 NFTs</p>
                  </div>
                  <div className="-mb-10 sm:-mb-25 -mr-5 sm:-mr-10 flex justify-end">
                    <Image src="/assets/images/wallet/red-up-arrow.png" layout="intrinsic" width="100" height="100" alt="Red Up Arrow"/>
                  </div>
                </div>
                <div className="p-10 sm:p-25 dark-background-image rounded-2xl font-medium text-white flex flex-col justify-between">
                  <div>
                    <p className="font-Subjectivity text-24 break-all">GOD-TEIR</p>
                    <p className="text-16 opacity-50">12 NFTs</p>
                  </div>
                  <div className="-mb-10 sm:-mb-25 -mr-5 sm:-mr-10 flex justify-end">
                    <Image src="/assets/images/wallet/red-crown.png" layout="intrinsic" width="100" height="100" alt="Red Up Arrow"/>
                  </div>
                </div>
                <div className="p-10 sm:p-25 dark-background-image rounded-2xl font-medium text-white flex flex-col justify-between">
                  <div>
                    <p className="font-Subjectivity text-24 break-all">FROZEN</p>
                    <p className="text-16 opacity-50">12 NFTs</p>
                  </div>
                  <div className="-mb-10 sm:-mb-25 -mr-5 sm:-mr-10 flex justify-end">
                    <Image src="/assets/images/wallet/red-snow.png" layout="intrinsic" width="100" height="100" alt="Red Up Arrow"/>
                  </div>
                </div>
                <div className="p-10 sm:p-25 dark-background-image rounded-2xl font-medium text-white flex flex-col justify-between">
                  <div>
                    <p className="font-Subjectivity text-24 break-all">FAILED</p>
                    <p className="text-16 opacity-50">12 NFTs</p>
                  </div>
                  <div className="-mb-10 sm:-mb-25 -mr-5 sm:-mr-10 flex justify-end">
                    <Image src="/assets/images/wallet/red-circle-quote.png" layout="intrinsic" width="100" height="100" alt="Red Up Arrow"/>
                  </div>
                </div>
                <div className="p-10 sm:p-25 dark-background-image rounded-2xl font-medium text-white flex flex-col justify-between">
                  <div>
                    <p className="font-Subjectivity text-24 break-all">CHARRED</p>
                    <p className="text-16 opacity-50">12 NFTs</p>
                  </div>
                  <div className="-mb-10 sm:-mb-25 -mr-5 sm:-mr-10 flex justify-end">
                    <Image src="/assets/images/wallet/red-fire.png" layout="intrinsic" width="100" height="100" alt="Red Up Arrow"/>
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
                <p><span><Icon name="gift" color="black" size={16} /></span>You’re Whitelisted</p>
              </div>
            )}
            <div className={"flex flex-col justify-center items-center my-40 px-10 " + (tokenIdList.length === 0 ? 'block' : 'hidden')}>
              <p className="text-30 lg:text-60 font-Future wallet-notify-background">You dont own any</p>
              <p className="text-40 lg:text-80 font-Future wallet-notify-background">brainchildNFTs</p>
              <p className="text-22 lg:text-40 text-right font-Future wallet-notify-background">...yet</p>
              <div
                className="text-[#363738] font-bold text-16 sm:text-18 p-20 sm:p-25 rounded-[20px] bg-white flex items-center justify-between cursor-pointer mt-20"
                onClick={() => router.push('/nfts')}
              >
                <img src="/assets/images/landing-page/icon-ethereum.svg" />
                <span className="mx-15">EXPLORE COLLECTION</span>
                <img src="/assets/images/landing-page/icon-arrow-right.svg" />
              </div>
            </div>
            <div className={"" + (tokenIdList.length === 0 ? 'hidden' : 'block')}>
              {tokenInfoList.map((tokenInfo: any, index) => (<div key="index">
                <div className="flex flex-col md:flex-row py-50">
                  <div className="md:w-1/2 lg:w-1/3 flex justify-center items-center px-40">
                    <div><Image src={tokenInfo.image} layout="intrinsic" width="384" height="524" alt="Ethereum Clock"/></div>
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
                          <p className="text-18 text-white mt-20 opacity-50"><Icon className="mr-20" name="environment_icon" color="white" size={20} /> Environment</p>
                          <p className="text-18 text-white mt-20 opacity-50"><Icon className="mr-20" name="shine_icon" color="white" size={20} /> Shine</p>
                          <p className="text-18 text-white mt-20 opacity-50"><Icon className="mr-20" name="efficiency_icon" color="white" size={20} /> Efficiency</p>
                          <div className="rounded-xl py-25 bg-danger text-white opacity-50 flex justify-center items-center flex-col mx-5 mt-20 cursor-pointer">
                            <p className="text-20 font-bold font-Subjectivity">ENHANCE</p>
                            <p className="text-14 font-bold font-Subjectivity">Coming Soon!</p>
                          </div>
                        </div>
                        <div className="w-1/2">
                          <p className="text-18 text-white mt-20 font-medium">{tokenInfo.attributes[0].value}<span className="opacity-50 ml-20">{probabilities[tokenInfo.attributes[0].trait_type][tokenInfo.attributes[0].value]}</span></p>
                          <p className="text-18 text-white mt-20 font-medium">{tokenInfo.attributes[1].value}<span className="opacity-50 ml-20">{probabilities[tokenInfo.attributes[1].trait_type][tokenInfo.attributes[1].value]}</span></p>
                          <p className="text-18 text-white mt-20 font-medium">{tokenInfo.attributes[2].value}<span className="opacity-50 ml-20">{probabilities[tokenInfo.attributes[2].trait_type][tokenInfo.attributes[2].value]}</span></p>
                          <div className="rounded-xl py-25 bg-primary text-white opacity-50 flex justify-center items-center flex-col mx-5 mt-20 cursor-pointer">
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

          <div onClick={mintDivClicked} className={"absolute top-100 w-screen z-999 p-40 lg:p-100 wallet-mint-background min-w-1600 left-1/2 -translate-x-1/2 " + (showMint ? 'block' : 'hidden')}>
            <div className="flex justify-between">
              <div><Image src="/assets/images/wallet/wallet_clock1.png" layout="intrinsic" width="307" height="418" alt="Ethereum Clock"/></div>
              <div><Image src="/assets/images/wallet/wallet_clock2.png" layout="intrinsic" width="307" height="418" alt="Ethereum Clock"/></div>
              <div><Image src="/assets/images/wallet/wallet_clock3.png" layout="intrinsic" width="307" height="418" alt="Ethereum Clock"/></div>
              <div><Image src="/assets/images/wallet/wallet_clock4.png" layout="intrinsic" width="307" height="418" alt="Ethereum Clock"/></div>
            </div>
            <div ref={mintRef} className="absolute w-300 h-400 bg-white-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white rounded-3xl">
              <div className="bg-[url('/assets/images/nfts/enhancements/question-mark-with-stars.png')] bg-cover bg-no-repeat bg-center w-full h-full">
                <div className="h-200 w-full text-white flex flex-col justify-center items-center">
                  <p className="text-40 font-semibold">{currentTokenId} / {presaleAllowed ? 420 : 5000}</p>
                  <p className="text-16 font-bold">MINTED</p>
                </div>
                <div className="bg-black-70 h-200 rounded-3xl w-full flex flex-col">
                  <div className="grow text-white text-20 font-semibold flex flex-col justify-center items-center">
                    <p>1 mint per wallet</p>
                    <p>{presaleAllowed ? (process.env.preSaleAmount as any)/1000000000000000000 : (process.env.publicSaleAmount as any)/1000000000000000000} ETH each</p>
                  </div>
                  <div className="flex justify-center items-center bg-white rounded-3xl py-25 text-18 font-bold cursor-pointer" onClick={() => mint()}>
                    <span className="mr-25"><Icon name="gem" color="black" size={16} /></span>
                    <span>MINT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Spinner isLoading={isLoading} />
      </Layout>
    </>
  )
}
