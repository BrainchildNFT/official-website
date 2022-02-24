import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactSlider from 'react-slider';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore, { Scrollbar } from 'swiper';

import { monthNames, projectSchedule, TimeLeft } from '../core/data/base';
import { Layout } from '../components/layout/layout';
import { faq_display_limit, faqs, nftList, RaffleState, } from '../core/data/landing';
import useGAService from '../core/app-services/ga-service';
import useMatchBreakpoints from '../components/ui-kit/common/useMatchBreakpoints';
import Icon from '../components/ui-kit/icon';

SwiperCore.use([Scrollbar])

const swiperBreakPoints = {
  640: {
    width: 640,
    slidesPerView: 1,
  },
  768: {
    width: 768,
    slidesPerView: 1,
  },
  1024: {
    width: 1024,
    slidesPerView: 2,
  },
}

interface WindowSize {
  width: number
  height: number
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      const handleResize = () => {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      // Add event listener
      window.addEventListener('resize', handleResize)

      // Call handler right away so state gets updated with initial window size
      handleResize()

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

export default function Home() {
  const gaService = useGAService()
  gaService.pageView('/')

  const [currentFaqIndex, setCurrentFaqIndex] = useState(-1)
  const [isLoadMoreFaq, setIsLoadMoreFaq] = useState(false)
  const [raffleState, setRaffleState] = useState<RaffleState>(RaffleState.Waiting)
  const [stateBarBackground, setStateBarBackground] = useState('bg-danger')
  const [swiperValue, setSwiperValue] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [prevChairWidth, setPrevChairWidth] = useState(500)
  const [prevChairHeight, setPrevChairHeight] = useState(700)
  const [raffleStartTimeLeft, setRaffleStartTimeLeft] = useState<TimeLeft>({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [raffleEndTimeLeft, setRaffleEndTimeLeft] = useState<TimeLeft>({days: 0, hours: 0, minutes: 0, seconds: 0});

  const experiencedNFTRef = useRef<HTMLDivElement>(null)
  const chairImageRef = useRef<HTMLImageElement>(null)
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperCore>()

  const nfts = nftList.images
  const faqData = faqs.data
  const { isDesktop, isMobile } = useMatchBreakpoints()

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

  const size = useWindowSize()

  const onInit = (Swiper: SwiperCore): void => {
    swiperRef.current = Swiper
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    handleScroll()
    setPrevChairWidth(chairImageRef.current?.clientWidth || 0)
    setPrevChairHeight(chairImageRef.current?.clientHeight || 0)

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const experiencedTop =
      experiencedNFTRef.current?.getBoundingClientRect().top || 0
    if (experiencedTop < -window.innerHeight) {
      if (chairImageRef.current) {
        if (!isMobile) {
          const progress = Math.min(
            1,
            ((experiencedNFTRef.current?.clientHeight || 0) +
              experiencedTop -
              window.innerHeight -
              400) /
              ((experiencedNFTRef.current?.clientHeight || 0) -
                2 * window.innerHeight -
                400)
          )
          chairImageRef.current.style.width =
            window.innerWidth -
            (window.innerWidth - prevChairWidth) * progress +
            'px'
          chairImageRef.current.style.height =
            window.innerHeight -
            (window.innerHeight - prevChairHeight) * progress +
            'px'
          // chairImageRef.current.style.marginTop = `-${300 * progress}px`
        } else {
          chairImageRef.current.style.width = '100%'
          chairImageRef.current.style.height = '100%'
        }
      }
    }
  }, [scrollY])

  const router = useRouter()

  const calculateTimeLeft = (flag: number): TimeLeft => {
    let difference =
      +new Date(Date.UTC(projectSchedule.wYear, projectSchedule.wMonth - 1, projectSchedule.wDay + flag, projectSchedule.wHour, projectSchedule.wMin, projectSchedule.wSec)) - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

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
    updateRaffleState()
    const timer = setInterval(() => {
      setRaffleStartTimeLeft(calculateTimeLeft(0))
      setRaffleEndTimeLeft(calculateTimeLeft(1))
      updateRaffleState()
    }, 1000)
  }, [])

  const stateComponent = useMemo(() => {
    return (<>
      {scrollY <
        (heroSectionRef.current?.clientHeight || 0) - size.height / 2 && (
          <div className="fixed bottom-0 w-full flex flex-col items-center">
            <div
              className="text-[#363738] font-bold text-16 sm:text-18 p-20 sm:p-25 rounded-[20px] bg-white flex items-center justify-between cursor-pointer"
              onClick={() => router.push('/nfts')}
            >
              <img src="/assets/images/landing-page/icon-ethereum.svg" />
              <span className="mx-15">EXPLORE COLLECTION</span>
              <img src="/assets/images/landing-page/icon-arrow-right.svg" />
            </div>
            <div
              className={
                'w-full bg-danger flex flex-col lg:flex-row items-center justify-between px-20 sm:px-40 py-10 sm:py-0 text-18 sm:text-20 mt-50 ' +
                stateBarBackground
              }
            >
              {raffleState === RaffleState.Waiting && (
                <p className="font-medium text-center">
                  { projectSchedule.stateStr } begins on { projectSchedule.wDay + ' ' + monthNames[projectSchedule.wMonth - 1] + ', ' + projectSchedule.wYear } at 00:00 AM UTC
                </p>
              )}
              {raffleState === RaffleState.Live && (
                <p className="font-medium text-center">
                  { projectSchedule.stateStr } Results{' '}
                  <span className="text-30 font-bold">LIVE NOW!</span> end on
                  { projectSchedule.endDay + ' ' + monthNames[projectSchedule.endMonth - 1] + ', ' + projectSchedule.endYear } at 00:00 AM UTC
                </p>
              )}
              {raffleState === RaffleState.Ended && (
                <p className="font-medium text-center">
                  Raffle Results{' '}
                  <span className="text-30 font-bold">LIVE NOW!</span>
                </p>
              )}

              {raffleState === RaffleState.Waiting && (
                <p className="font-medium text-center">
                  <span className="text-30 font-bold">
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
                  </span>{' '}
                  Left
                </p>
              )}

              {raffleState === RaffleState.Live && (
                <p className="font-medium text-center">
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
                </p>
              )}
              {raffleState === RaffleState.Ended && (
                <p className="font-medium text-center">
                  Connect wallet to check if you’re whitelisted
                </p>
              )}
            </div>
          </div>
        )}
    </>)
  }, [raffleStartTimeLeft, raffleEndTimeLeft, stateBarBackground, raffleState])

  return (
    <>
      <Head>
        <title>Brainchild: HomePage</title>
        <meta name="description" content="A tribute to Ethereum.  Redeem, upgrade, enhance NFTs traversing the digital & real world. Unlock innovative ownership experinces with Web3." />
      </Head>
      <Layout>
        {/*Ether clock landing page*/}
        <section className="dark-background-image overflow-hidden">
          <div
            className="relative"
            ref={heroSectionRef}
          >
            <div className="relative pt-60 sm:pt-80 flex justify-center items-center">
              <div className="absolute w-full sm:w-3/5 flex items-center justify-center transform -translate-y-1/4 transy20">
                <div className="w-full flex justify-center">
                  <Image
                    src="/assets/images/landing-page/eth-clock-design.png"
                    layout="intrinsic"
                    width={1400}
                    height={1400}
                    alt="Ethereum Clock Design"
                  />
                </div>
              </div>
              <div
                className="w-full sm:w-2/3 mx-auto flex justify-center"
                style={{ fontFamily: 'Future Classic' }}
              >
                <Image
                  className="animate-spin-60s"
                  src="/assets/images/landing-page/eth-clock-letter.svg"
                  layout="intrinsic"
                  width={1300}
                  height={1300}
                  alt="Ethereum Clock Letter"
                />
              </div>
            </div>
            <div className="px-30 lg:px-100 flex flex-col sm:flex-row sm:flex-wrap items-end sm:items-center justify-center text-white text-20 sm:text-28 text-right xl:text-center font-light py-35 xl:py-100">
              <p className="pb-20 sm:py-30 xl:py-0">
                <span
                  className="font-bold italic"
                  style={{ fontFamily: 'Subjectivity Serif' }}
                >
                  5000
                </span>{' '}
                Mints
              </p>
              <div className="hidden sm:block bg-white w-10 h-10 mx-30 rounded-full" />
              <p className="pb-20 sm:py-30 xl:py-0">
                Up to{' '}
                <span
                  className="font-bold italic"
                  style={{ fontFamily: 'Subjectivity Serif' }}
                >
                  Level 10
                </span>{' '}
                Enhancement
              </p>
              <div className="hidden sm:block bg-white w-10 h-10 mx-30 rounded-full" />
              <p className="pb-20 sm:py-30 xl:py-0">
                Perpetually{' '}
                <span
                  className="font-bold italic"
                  style={{ fontFamily: 'Subjectivity Serif' }}
                >
                  Redeemable
                </span>
              </p>
              <div className="hidden sm:block bg-white w-10 h-10 mx-30 rounded-full" />
              <p className="pb-20 sm:py-30 xl:py-0">
                Mint Price{' '}
                <span
                  className="font-bold italic"
                  style={{ fontFamily: 'Subjectivity Serif' }}
                >
                  0.12 Eth
                </span>
              </p>
            </div>
          </div>

          {/*state bar*/}
          {stateComponent}
        </section>

        <div className="light-background-image">
          {/*Immerse yourself in the new age of LUXURY*/}
          <section className="relative pt-130 overflow-x-hidden">
            <div className="p-30 sm:p-100 mx-auto relative z-50">
              <div
                className="text-45 sm:text-95 lg:text-120 text-center leading-tight text-primary-75 pt-60 lg:text-center"
                style={{ fontFamily: 'Future Classic' }}
              >
                <p>
                  <span>Immerse</span>
                  <br className="block sm:hidden" /> <span>yourself</span>
                  <br className="hidden lg:block" />{' '}
                  <span className="text-45 sm:text-71 lg:text-80">in the</span>{' '}
                  <br className="block lg:hidden" />
                  NEW AGE{' '}
                  <span className="text-45 sm:text-71 lg:text-80">of</span>
                </p>
                <p className="mt-10 text-70 sm:text-140 lg:text-160">LUXURY</p>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 p-0 md:p-40 lg:p-80 gap-0 md:gap-[40px] lg:gap-[80px] -mt-160 md:-mt-240 lg:-mt-300">
              <img
                className="w-full h-600 sm:h-auto object-cover"
                src="/assets/images/landing-page/gallery-1.png"
              />
              <img
                className="w-full h-600 sm:h-auto object-cover"
                src="/assets/images/landing-page/gallery-2.png"
              />
              <div className="w-full h-600 sm:h-auto relative overflow-y-clip">
                <img
                  className="w-full h-full object-cover"
                  src="/assets/images/landing-page/gallery-3.png"
                />
                <div className="absolute w-full bottom-0 right-0 text-white p-20 z-50">
                  <p className="text-right">
                    Luxury has always been a timeless phenomenon but has it ever
                    truly been forever?
                    <br />
                    <br />
                    Well, Our NFTs are redeemable forever... Yes,
                  </p>
                  <p className="text-right font-Voyage text-80 break-words leading-none">
                    Forever.
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="container mx-auto relative z-40 block lg:hidden mt-30 mb-70">
              <Image
                className="cursor-pointer z-40"
                src="/assets/images/common/ether-clock.png"
                layout="responsive"
                width={335}
                height={420}
                alt="Ethereum Clock"
              />
            </div>

             */}
          </section>

          {/*Experience NFTs beyond Cryptoverse Section*/}
          <section className="relative" ref={experiencedNFTRef}>
            <div className="mx-auto h-[400vh]">
              <div className="w-full overflow-x-clip h-screen flex items-center justify-center sticky top-0">
                <img
                  className="hidden sm:block sm:p-50 xs:p-200"
                  style={{ maxWidth: '100%' }}
                  src="/assets/images/landing-page/text-experienced-nft.svg"
                />
                <img
                  className="block sm:hidden w-full"
                  src="/assets/images/landing-page/text-experienced-nft-mobile.svg"
                />
              </div>
              <div className="w-full h-screen flex items-center justify-center sticky top-0">
                <img
                  ref={chairImageRef}
                  className="object-cover w-500 h-700 object-top"
                  src="/assets/images/landing-page/cartain-with-chair.jpg"
                  alt="Cartain With Chair"
                />
              </div>
              <div className="w-full h-screen sticky top-0 flex flex-row-reverse items-end">
                <div className="p-30 w-full sm:w-300 text-white">
                  Imagine you could bring your Minecraft axe to dig up your
                  backyard (Why not?). Well, We are bridging that gap. Our NFTs
                  transcend the metaverse and find their place in the physical
                  world, even if that place is your mum’s backyard.
                </div>
              </div>
            </div>
          </section>

          {/*And more NFTs*/}
          <section className="relative py-200 overflow-x-hidden" id="and-more">
            <div className="flex justify-between items-center px-20 sm:px-80 xl:px-200">
              <p
                className="text-30 sm:text-50 text-primary-75"
                style={{ fontFamily: 'Future Classic' }}
              >
                and more...
              </p>
            </div>
            <div className="mt-100 px-0 sm:px-80 lg:pr-0 xl:pl-200">
              <Swiper
                className="w-full"
                spaceBetween={80}
                breakpoints={swiperBreakPoints}
                scrollbar={{
                  hide: false,
                  draggable: true,
                  dragClass: 'thumb',
                  el: 'scrollbar',
                }}
                onInit={onInit}
                onProgress={(swiper, progress) => {
                  setSwiperValue(progress * 100)
                }}
              >
                <SwiperSlide className="flex-grow" style={{ height: 'auto' }}>
                  <div className="background-gray-blur p-30 sm:p-40 pb-0 sm:pb-0 w-full">
                    <p
                      className="text-50 sm:text-80 text-[#232425]"
                      style={{ fontFamily: 'Future Classic' }}
                    >
                      Enhance
                    </p>
                    <div className="text-18 sm:text-20 text-[#343536]">
                      Play with our mysterious dice to test your luck and evolve
                      your NFTs to higher levels. Roll the dice for 5 possible
                      outcomes of enhancement!
                    </div>
                    <div className="flex w-full flex-wrap mt-10 -m-10">
                      <img
                        className="p-10 h-50"
                        src="/assets/images/landing-page/tag-enhanced.svg"
                      />
                      <img
                        className="p-10 h-50"
                        src="/assets/images/landing-page/tag-god-teir.svg"
                      />
                      <img
                        className="p-10 h-50"
                        src="/assets/images/landing-page/tag-frozen.svg"
                      />
                      <img
                        className="p-10 h-50"
                        src="/assets/images/landing-page/tag-failed.svg"
                      />
                      <img
                        className="p-10 h-50"
                        src="/assets/images/landing-page/tag-charred.svg"
                      />
                    </div>
                    <img
                      className="w-full"
                      src="/assets/images/landing-page/bg-enhance-item.png"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide className="flex-grow" style={{ height: 'auto' }}>
                  <div className="background-gray-blur p-30 sm:p-40 w-full h-full pb-0 relative">
                    <p
                      className="text-50 sm:text-80 text-[#232425]"
                      style={{ fontFamily: 'Future Classic' }}
                    >
                      Redeem
                    </p>
                    <div className="text-18 sm:text-20 text-[#343536]">
                      Get the physical manifestation of your NFT delivered right
                      to your front door. Touch it. Feel it. Lick it. Get weird
                      with it. Throw it and redeem again. It’s yours, FOREVER.
                      Our NFTs are perpetually redeemable.
                    </div>
                    <img
                      className="w-full absolute bottom-0 left-0"
                      src="/assets/images/landing-page/bg-redeem-item.png"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide className="flex-grow" style={{ height: 'auto' }}>
                  <div className="background-gray-blur p-30 sm:p-40 w-full h-full pb-0 relative">
                    <p
                      className="text-50 sm:text-80 text-[#232425]"
                      style={{ fontFamily: 'Future Classic' }}
                    >
                      Participate
                    </p>
                    <div className="text-18 sm:text-20 text-[#343536]">
                      You will be given digital tickets and gain entry to our
                      private community events and receive exclusive benefits
                      including premium NFT drops, lavish collaborations,
                      gamified experiences and a whole lot more...
                    </div>
                    <img
                      className="w-full mt-20 absolute left-0 bottom-0"
                      src="/assets/images/landing-page/bg-coming-soon.svg"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide className="flex-grow" style={{ height: 'auto' }}>
                  <div className="background-gray-blur p-30 sm:p-40 w-full h-full pb-0 relative">
                    <p
                      className="text-50 sm:text-80 text-[#232425]"
                      style={{ fontFamily: 'Future Classic' }}
                    >
                      Vote
                    </p>
                    <div className="text-18 sm:text-20 text-[#343536]">
                      Have your say in how things will turn out, from launches,
                      collaborations to designs and features. Be one of the many
                      potter hands to mold future brainchild projects!
                    </div>
                    <img
                      className="w-full mt-20 absolute left-0 bottom-0"
                      src="/assets/images/landing-page/bg-coming-soon.svg"
                    />
                  </div>
                </SwiperSlide>
                {/* {nfts.map((nft, i) => (
                  <SwiperSlide className="flex-grow" key={i}>
                    <div className="flex flex-col lg:flex-row">
                      <div>
                        <Image
                          className="overflow-hidden cursor-pointer relative z-40"
                          src={nft.image}
                          width={nft.width}
                          height={nft.height}
                          layout="intrinsic"
                          alt={nft.name}
                          placeholder="blur"
                          blurDataURL={shimmerUrl}
                        />
                      </div>
                      <div className="lg:max-w-350 lg:-ml-100 mt-50 relative z-50">
                        <span className="font-Future text-50 sm:text-80 text-primary-75 leading-none mb-20 font-Future">
                          {nft.name}
                        </span>
                        <p className="mt-20 p-20 border border-gradient-dark-linner">
                          {nft.content}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))} */}
              </Swiper>
            </div>
            <div className="w-full mr-50 -mt-100 sm:mt-30 sm:w-400 ml-auto relative scrollbar z-[100]">
              <ReactSlider
                className="h-50"
                trackClassName="h-[3px] top-25 bg-[#373839]"
                thumbActiveClassName=""
                renderThumb={(props, state) => (
                  <div
                    {...props}
                    className="w-140 active:outline-none focus:outline-none"
                  >
                    <img
                      className="px-20"
                      src="/assets/images/landing-page/scrollbar-thumb.png"
                      alt="Eye On Line"
                    />
                  </div>
                )}
                value={swiperValue}
                onChange={(value, index) => {
                  swiperRef.current?.setProgress(value / 100)
                }}
              />
            </div>
          </section>
        </div>

        {/*Collaboration*/}
        <section className="relative dark-background-image" id="collaborations">
          <div
            className="container mx-auto p-30 pt-50 sm:pt-200 text-white text-center"
            style={{ fontFamily: 'Future Classic' }}
          >
            <p className="text-45 lg:text-80">exquisite</p>
            <p
              className="text-justify indent-2 sm:indent-0 sm:ml-0 sm:text-center break-all text-80 lg:text-100 xl:text-150"
              style={{ textIndent: `${isMobile ? '4rem' : '0'}` }}
            >
              Collaborations
            </p>
            <p className="text-45 lg:text-80">
              <span className="text-30 lg:text-60">with</span> wondrous artists
            </p>
          </div>
          <div className="absolute top-0 w-full h-full flex items-center justify-center">
            <Image
              src="/assets/images/landing-page/white-hand-draw-hourse.png"
              layout="intrinsic"
              width={792}
              height={818}
              alt="Hand Drawing White Hourse"
            />
          </div>
          <div className="container mx-auto flex flex-col sm:flex-row items-center sm:justify-between mt-90 sm:mt-110">
            <div className="w-300 h-300 flex items-center justify-center my-80 sm:my-0 group cursor-pointer">
              <div className="hidden group-hover:block">
                <Link href="mailto:BrainchildNFT@gmail.com">
                  <Image
                    src="/assets/images/landing-page/radial-connect-hover.png"
                    layout="intrinsic"
                    width={420}
                    height={420}
                    alt="Hand Drawing White Hourse"
                  />
                </Link>
              </div>
              <div className="block group-hover:hidden">
                <Image
                  src="/assets/images/landing-page/radial-connect.png"
                  layout="intrinsic"
                  width={420}
                  height={420}
                  alt="Hand Drawing White Hourse"
                />
              </div>
            </div>
            <div className="text-white">
              <p className="sm:max-w-290">
                We ensure a rich collaborative experience to bring an
                uncompromised creative vision to fruition.
                <br />
                <br />
                Connect with our talented artists to build your identities
                beyond the cryptoverse!
              </p>
            </div>
          </div>
        </section>

        {/*FAQs*/}
        <section className="relative dark-background-image">
          <div className="py-45 sm:py-95 flex flex-col lg:flex-row">
            <div className="lg:w-1/3 flex lg:justify-center text-white">
              <p
                className="lg:hidden px-30 text-80 lg:vertical-letter"
                style={{ fontFamily: 'Future Classic' }}
              >
                FAQ
              </p>
              {currentFaqIndex === -1 && (
                <p
                  className="hidden lg:block text-130 vertical-letter"
                  style={{ fontFamily: 'Future Classic' }}
                >
                  FAQ
                </p>
              )}
              {currentFaqIndex !== -1 && (
                <div
                  className="hidden lg:block faq-content-background w-full h-max text-white text-24 font-semibold p-30 sm:p-50 transition-all"
                  style={{
                    marginTop: `${137 * currentFaqIndex}px`,
                  }}
                >
                  <div className="animate-fadeIn">
                    {faqData[currentFaqIndex].content}
                  </div>
                </div>
              )}
            </div>
            <div className="lg:w-2/3 text-white lg:ml-100 mb-100">
              {faqData.map(
                (faq, index) =>
                  (index < faq_display_limit || isLoadMoreFaq) && (
                    <div key={faq.content + index}>
                      <div
                        onMouseEnter={() => {
                          // if (!isMobile) {
                          //   setCurrentFaqIndex(index)
                          // }
                        }}
                        onMouseLeave={() => {
                          // if (!isMobile) {
                          //   setCurrentFaqIndex(-1)
                          // }
                        }}
                        onClick={() => {
                          // if (isMobile) {
                          setCurrentFaqIndex(
                            currentFaqIndex == index ? -1 : index
                          )
                          // }
                        }}
                      >
                        <div
                          className={
                            'flex items-center justify-between transition-all duration-500 border border-r-0 border-gradient-light p-35 lg:mb-35 lg:hover:-ml-50 lg:hover:pr-85 lg:hover:bg-white-10 ' +
                            (index === currentFaqIndex
                              ? 'lg:-ml-50 bg-white-10'
                              : '')
                          }
                        >
                          {faq.name}{' '}
                          {isMobile && (
                            <Icon
                              name={index === currentFaqIndex ? 'up' : 'down'}
                              color="white"
                              size={18}
                            />
                          )}
                        </div>
                      </div>
                      <p
                        className={
                          'faq-content-background lg:hidden w-full text-white text-24 font-semibold p-30 transition-all my-5 leading-tight ' +
                          (index === currentFaqIndex ? 'block' : 'hidden')
                        }
                      >
                        <span className="animate-fadeIn">{faq.content}</span>
                      </p>
                    </div>
                  )
              )}
              {/* <div className="flex lg:ml-170 justify-center lg:justify-start">
                <a
                  className="cursor-pointer opacity-40"
                  onClick={() => setIsLoadMoreFaq(!isLoadMoreFaq)}
                >
                  {isLoadMoreFaq ? 'less show...' : 'load more...'}
                </a>
              </div> */}
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
