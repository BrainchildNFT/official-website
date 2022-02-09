import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { monthNames, projectSchedule, TimeLeft } from '../core/data/base';
import { Layout } from '../components/layout/layout';
import { RaffleState } from '../core/data/landing';
import Icon from '../components/ui-kit/icon';
import { WalletMenuType } from '../core/data/wallet';
import { AppContext } from '../components/context/app-context';

export default function Wallet() {
  const [isTop, setIsTop] = useState(true)
  const [raffleState, setRaffleState] = useState(RaffleState.Waiting)
  const [stateBarBackground, setStateBarBackground] = useState('bg-danger')
  const [selectedMenu, setSelectedMenu] = useState(WalletMenuType.NFTs);
  const [showOutcomeStates, setShowOutcomeStates] = useState(true);
  const { wallet } = useContext(AppContext);
  const router = useRouter();

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

    if (differenceFromRaffleStart > 0) setRaffleState(RaffleState.Waiting)
    if (differenceFromRaffleStart < 1) setRaffleState(RaffleState.Live)
    if (differenceFromRaffleEnd < 1) setRaffleState(RaffleState.Ended)
  }

  const [raffleStartTimeLeft, setRaffleStartTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(0)
  )
  const [raffleEndTimeLeft, setRaffleEndTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(1)
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setRaffleStartTimeLeft(calculateTimeLeft(0))
      setRaffleEndTimeLeft(calculateTimeLeft(1))
      updateRaffleState()
    }, 1000)
  }, [])

  useEffect(() => {
    switch (raffleState) {
      case RaffleState.Waiting:
        setStateBarBackground('bg-wallet-bar-danger')
        break
      case RaffleState.Live:
        setStateBarBackground('bg-wallet-bar-warning')
        break
      case RaffleState.Ended:
        setStateBarBackground('bg-wallet-bar-success')
        break
      default:
        setStateBarBackground('bg-danger text-white')
    }
  }, [raffleState])

  useEffect(() => {
    if (!wallet) {
      router.push('/');
    }
  }, [])

  const raffleClicked = () => {
    alert(process.env.contractAddress);
  }

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
        <div className="relative flex flex-col xl:flex-row">
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
                      RAFFLE BEGINS ON { monthNames[projectSchedule.wMonth - 1] + ' ' + projectSchedule.wDay + ' ' + projectSchedule.wYear }
                    </span>
                  )}
                  {raffleState === RaffleState.Live && (
                    <span className="font-medium text-16 mr-15">
                      RESULTS WILL BE LIVE IN
                    </span>
                  )}
                  {raffleState === RaffleState.Ended && (
                    <span className="font-medium text-16 mr-15">
                      Connect wallet to check if you’re whitelisted
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
                    <p className="font-medium text-center">
                      Connect wallet to check if you’re whitelisted
                    </p>
                  )}
                </div>
                {raffleState === RaffleState.Live && (
                  <div className="px-20 py-10 xl:ml-15 rounded-full bg-white-50 flex items-center cursor-pointer" onClick={() => raffleClicked()}>
                    <span className="mr-10"><Icon name="check_circle" color="white" size={16} /></span>
                    <span className="text-white text-16 font-semibold">Joined Raffle</span>
                  </div>
                )}
              </div>
            </div>
            <div className={"flex flex-col justify-center items-center my-40 px-10 " + (raffleState !== RaffleState.Waiting ? 'hidden' : '')}>
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
          </div>
        </div>
      </Layout>
    </>
  )
}
