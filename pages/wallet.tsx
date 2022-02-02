import React, { useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useDispatch, useSelector } from 'react-redux'

import { Layout } from '../components/layout/layout'
import { RaffleState } from '../core/data/landing'
import Icon from '../components/ui-kit/icon'
import { NftsMenuType, NftsMenuTypeArr } from '../core/data/nfts'
import useMatchBreakpoints from '../components/ui-kit/common/useMatchBreakpoints'
import { themeUpdate } from '../core/actions/theme-update'
import { ThemeType } from '../core/data/base'
import { WalletMenuType } from '../core/data/wallet';
import Image from 'next/image';
import { AppContext } from '../components/context/app-context';
import { useRouter } from 'next/router';

export default function Wallet() {
  const [isTop, setIsTop] = useState(true)
  const [raffleState, setRaffleState] = useState(RaffleState.Waiting)
  const [stateBarBackground, setStateBarBackground] = useState('bg-danger')
  const [currentMenuId, setCurrentMenuId] = useState(NftsMenuType.About)
  const [textColor, setTextColor] = useState('text-white')

  const themeStatus = useSelector((state: any) => state.ThemeStatus)
  const dispatch = useDispatch()

  const { isHuge } = useMatchBreakpoints()
  const nftContentRef = useRef<HTMLDivElement>(null)
  const mainBody = useRef<HTMLDivElement>(null)

  const menuList = [
    { id: NftsMenuType.About, name: 'ABOUT' },
    { id: NftsMenuType.Artist, name: 'ARTIST' },
    { id: NftsMenuType.PerksAndUtility, name: 'PERKS AND UTILITY' },
    { id: NftsMenuType.TimeLine, name: 'TIMELINE' },
    { id: NftsMenuType.Enhancements, name: 'ENHANCEMENTS' },
    // {id:NftsMenuType.Gallery, name: 'GALLERY'},
    { id: NftsMenuType.WhitePaper, name: 'WHITEPAPER' },
  ]

  interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
  }

  const calculateTimeLeft = (flag: number): TimeLeft => {
    let difference =
      +new Date(Date.UTC(2022, 1, 7 + flag, 0, 0, 0)) - +new Date()
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
      +new Date(Date.UTC(2022, 1, 7, 0, 0, 0)) - +new Date()
    let differenceFromRaffleEnd =
      +new Date(Date.UTC(2022, 1, 8, 0, 0, 0)) - +new Date()

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

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY) {
        setIsTop(false)
      } else {
        setIsTop(true)
      }
    }

    let contentHeight = 0
    Array.from(nftContentRef?.current?.children || []).map((item, index) => {
      const nextHeight = contentHeight + item.clientHeight
      const scrollTop = window.scrollY || 0
      if (scrollTop > contentHeight && scrollTop < nextHeight) {
        setCurrentMenuId(NftsMenuTypeArr[index])
      }
      contentHeight = nextHeight
    })
  }

  const menuClicked = (menuId: NftsMenuType) => {
    if (menuId === NftsMenuType.WhitePaper) {
      window.open(
        'https://docs.google.com/document/d/e/2PACX-1vSFQQYJ06nu371dWY_Yu9PgS4onGKnWCiTDjZ899f3z77ih3eoNkdnbJvmYK2uHvg/pub',
        '_blank'
      )
    } else {
      setCurrentMenuId(menuId)

      const selectedSectionIndex = NftsMenuTypeArr.findIndex(
        (element) => element === menuId
      )
      const childrenArr = Array.from(nftContentRef?.current?.children || [])
      let contentHeight = 0
      if (selectedSectionIndex < childrenArr.length) {
        for (let index = 0; index < selectedSectionIndex; index++) {
          contentHeight += childrenArr[index].clientHeight
        }
      }
      window.scrollTo({
        left: 0,
        top: contentHeight + 100,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    if (currentMenuId === NftsMenuType.About) {
      dispatch(themeUpdate(ThemeType.DarkMode))
    } else {
      dispatch(themeUpdate(ThemeType.LightMode))
    }
  }, [currentMenuId])

  useEffect(() => {
    switch (raffleState) {
      case RaffleState.Waiting:
        setStateBarBackground('bg-danger text-white')
        break
      case RaffleState.Live:
        setStateBarBackground('bg-success text-white')
        break
      case RaffleState.Ended:
        setStateBarBackground('light-background-image text-primary')
        break
      default:
        setStateBarBackground('bg-danger text-white')
    }
  }, [raffleState])

  useEffect(() => {
    setTextColor(
      themeStatus === ThemeType.DarkMode ? 'text-white' : 'text-primary'
    )
  }, [themeStatus])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [selectedMenu, setSelectedMenu] = useState(WalletMenuType.NFTs);
  const [showOutcomeStates, setShowOutcomeStates] = useState(true);
  const { wallet } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!wallet) {
      router.push('/');
    }
  }, [])

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
            <div className="p-25 w-full border-y border-gradient-light bg-wallet-bar-warning flex flex-col md:flex-row md:justify-between">
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
                  <span className="font-medium text-16 mr-15">RESULTS WILL BE LIVE IN</span>
                </div>
                <div className="text-white">
                  <span className="font-bold text-30">21:45:12</span>
                </div>
                <div className="px-20 py-10 xl:ml-15 rounded-full bg-white-50 flex items-center">
                  <span className="mr-10"><Icon name="check_circle" color="white" size={16} /></span>
                  <span className="text-white text-16 font-semibold">Joined Raffle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
