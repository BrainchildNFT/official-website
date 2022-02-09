import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

import { ThemeType } from '../../../core/data/base';
import { AppContext } from '../../context/app-context';

const ConnectWalletButton = () => {
  let gProvider: any = null

  const themeStatus = useSelector((state: any) => state.ThemeStatus)
  const [metaMaskAccount, setMetaMaskAccount] = useState<string>('')
  const [showConnectModal, setShowConnectModal] = useState(false);
  const { wallet, lang, updateWallet } = useContext(AppContext)
  const metaMaskRef = useRef<HTMLDivElement>(null);

  const providerOptions = {
    walletconnect: {
      rpcUrl: process.env.rpcURI,
    },
  }

  let web3Modal: any = null;

  if (typeof (window as any) !== 'undefined') {
    web3Modal = new Web3Modal({
      network: process.env.network,
      cacheProvider: true,
      providerOptions,
    });
  }

  const loadProvider = async () => {
    if (!gProvider) {
      console.log("connecting >> network = " + process.env.network)
      gProvider = await web3Modal.connect()
      onConnect()
      gProvider.on('accountsChanged', onConnect)
      gProvider.on('disconnect', onDisconnect)
    }
    return gProvider
  }

  const onConnect = async () => {
    const web3 = new Web3(gProvider)
    const accounts = await web3.eth.getAccounts()
    if (accounts.length > 0) {
      updateWallet(accounts[0]);
      setMetaMaskAccount(shortenTxHash(accounts[0]));
    }
  }

  const onDisconnect = () => {
    setMetaMaskAccount('');
    gProvider = null
  }

  const shortenTxHash = (txHash: any) => {
    return txHash.substr(0, 6) + "_" + txHash.substr(txHash.length-4)
  }

  const connectMetaMask = () => {
    gProvider = loadProvider()
    setShowConnectModal(false);
  }

  const connectWallet = async () => {
    if (!metaMaskAccount) {
      setShowConnectModal(true);
    } else {
      onDisconnect();
    }
  }

  useEffect(() => {
    if (wallet) {
      setMetaMaskAccount(shortenTxHash(wallet));
    }
    function handleClickOutside(event: any) {
      if (metaMaskRef.current && !metaMaskRef.current.contains(event.target)) {
        setShowConnectModal(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  return (
    <>
      <div
        className="group relative flex items-center cursor-pointer"
        onClick={() => connectWallet()}
      >
        <div className="absolute h-full w-full overflow-y-clip">
          <svg
            className="transform rotate-[30deg] scale-y-150 group-hover:scale-y-100 scale-x-90 group-hover:scale-x-100 group-hover:rotate-0 transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-5"
            width="263"
            height="54"
            viewBox="0 0 263 54"
            fill="url(#img1)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-opacity-0 group-hover:fill-opacity-1 transition-all duration-500"
              d="M261.516 10.7259C261.666 11.9234 261.057 13.2832 259.529 14.8025C258.01 16.3132 255.659 17.9034 252.53 19.5418C246.279 22.8158 237.038 26.2256 225.475 29.5684C202.356 36.2518 170.044 42.6423 134.022 47.1509C97.9994 51.6595 65.1092 53.4296 41.0566 52.6502C29.0264 52.2603 19.2301 51.2332 12.3646 49.6009C8.92901 48.7841 6.25797 47.8226 4.41341 46.7328C2.55845 45.6369 1.6327 44.4693 1.48281 43.2717C1.33292 42.0741 1.94235 40.7144 3.46999 39.1951C4.98906 37.6843 7.34075 36.0942 10.4691 34.4558C16.7204 31.1818 25.9614 27.772 37.5245 24.4292C60.643 17.7458 92.9549 11.3552 128.977 6.84666C165 2.33808 197.89 0.567941 221.943 1.3474C233.973 1.73726 243.769 2.76436 250.635 4.39666C254.07 5.2135 256.741 6.17498 258.586 7.26478C260.441 8.36071 261.367 9.52828 261.516 10.7259Z"
              fill="url(#img1)"
              fillOpacity="1"
              stroke="url(#paint1_linear_841_8208)"
            />
            <defs>
              <pattern
                id="img1"
                patternUnits="userSpaceOnUse"
                width="268"
                height="180"
              >
                <image
                  href="/assets/images/common/black-conical-gradient.png"
                  x="0"
                  y="-60"
                  width="268"
                  height="180"
                />
              </pattern>
              <linearGradient
                id="paint1_linear_841_8208"
                x1="259.799"
                y1="12.1483"
                x2="-0.56836"
                y2="39.9995"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={
                    themeStatus === ThemeType.DarkMode ? 'white' : 'primary'
                  }
                  stopOpacity="0.4"
                />
                <stop
                  offset="0.478947"
                  stopColor={
                    themeStatus === ThemeType.DarkMode ? 'white' : 'primary'
                  }
                  stopOpacity="0"
                />
                <stop
                  offset="1"
                  stopColor={
                    themeStatus === ThemeType.DarkMode ? 'white' : 'primary'
                  }
                  stopOpacity="0.4"
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:-mt-40"
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={
              'group-hover:stroke-pink-gray group-hover:fill-pink-gray transition-all duration-200 ' +
              (metaMaskAccount ? '' : 'fill-transparent')
            }
            d="M37.1166 31.649L11.761 38.443C10.8003 38.7004 9.77676 38.5657 8.91544 38.0684C8.05413 37.5711 7.42563 36.752 7.16822 35.7914L2.80065 19.4914C2.54324 18.5307 2.67799 17.5071 3.17528 16.6458C3.67256 15.7845 4.49163 15.156 5.4523 14.8986L30.8079 8.10457C31.7685 7.84716 32.7921 7.98192 33.6534 8.4792C34.5147 8.97648 35.1432 9.79555 35.4006 10.7562L39.7682 27.0562C40.0256 28.0169 39.8909 29.0405 39.3936 29.9018C38.8963 30.7631 38.0772 31.3916 37.1166 31.649Z"
            stroke={metaMaskAccount ? 'white' : 'gray'}
            strokeWidth="0.75"
            fill={metaMaskAccount ? 'green' : ''}
          />
          <path
            className="group-hover:stroke-white group-hover:fill-white"
            d="M29.677 21.9952C29.4368 22.0596 29.1809 22.0259 28.9656 21.9016C28.7503 21.7772 28.5931 21.5725 28.5288 21.3323C28.4644 21.0921 28.4981 20.8362 28.6224 20.6209C28.7468 20.4056 28.9515 20.2485 29.1917 20.1841C29.4319 20.1198 29.6878 20.1535 29.9031 20.2778C30.1184 20.4021 30.2755 20.6069 30.3399 20.847C30.4042 21.0872 30.3705 21.3431 30.2462 21.5584C30.1219 21.7737 29.9171 21.9309 29.677 21.9952Z"
            fill="gray"
            stroke={metaMaskAccount ? 'white' : 'gray'}
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="group-hover:stroke-pink-gray transition-all duration-500"
            d="M28.9965 8.58982L28.3186 6.0597C28.1697 5.50464 27.8952 4.99123 27.5164 4.55911C27.1375 4.12699 26.6644 3.78772 26.1336 3.56751C25.6028 3.3473 25.0285 3.25204 24.455 3.28908C23.8815 3.32612 23.3242 3.49447 22.8261 3.78113L4.32721 14.4313C3.61086 14.8435 3.05078 15.4809 2.73405 16.2444C2.41732 17.0078 2.36167 17.8545 2.57577 18.6528L2.80046 19.4913"
            stroke={metaMaskAccount ? 'white' : 'gray'}
            strokeWidth="0.75"
          />
        </svg>
        <button className="hidden px-5 text-18 font-bold w-150 group-hover:block">
          {metaMaskAccount ? 'Disconnect' : 'Coming Soon'}
        </button>
        <button className="flex items-center group-hover:hidden px-5 text-18 font-bold w-150 z-10">
          <p
            className={
              'w-10 h-10 border text-white bg-success rounded-full mr-5 ' +
              (metaMaskAccount ? 'block' : 'hidden')
            }
          ></p>
          <p>
            {metaMaskAccount
              ? metaMaskAccount.substring(0, 4) +
                '...' +
                metaMaskAccount.slice(-4)
              : 'Connect Wallet'}
          </p>
        </button>
      </div>
      <div className={"absolute flex justify-center top-0 left-0 bottom-0 right-0 bg-black-60 z-50 " + (showConnectModal ? 'block' : 'hidden')}>
        <div ref={metaMaskRef} className="flex flex-col items-center h-200 mt-200 w-350 bg-black-90 rounded-xl p-40 border border cursor-pointer" onClick={() => connectMetaMask()}>
          <img src="/assets/images/common/metamask.svg"/>
          <span className="text-white text-25 font-medium">Metamask</span>
          <span className="text-warning text-12">Connect your metamask wallet</span>
        </div>
      </div>
    </>
  )
}

export default ConnectWalletButton
