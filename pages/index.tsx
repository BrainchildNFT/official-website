import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Layout } from '../components/layout/layout'
import {
  nftList,
  RaffleState,
  faqs,
  faq_display_limit,
} from '../core/data/landing'
import { shimmerUrl } from '../components/ui-kit/common/blur-image'
import useGAService from '../core/app-services/ga-service'
import useMatchBreakpoints from '../components/ui-kit/common/useMatchBreakpoints'
import Icon from '../components/ui-kit/icon'

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
    slidesPerView: 1.1,
  },
}

export default function Home() {
  const gaService = useGAService()
  gaService.pageView('/')

  const [currentFaqIndex, setCurrentFaqIndex] = useState(-1)
  const [isLoadMoreFaq, setIsLoadMoreFaq] = useState(false)
  const [raffleState, setRaffleState] = useState(RaffleState.Waiting)
  const [stateBarBackground, setStateBarBackground] = useState('bg-danger')

  const nfts = nftList.images
  const faqData = faqs.data
  const { isDesktop } = useMatchBreakpoints()

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

  const experiencedNFTRef = useRef<HTMLDivElement>(null)
  const chairImageRef = useRef<HTMLImageElement>(null)

  const [scrollY, setScrollY] = useState(0)
  const [prevChairWidth, setPrevChairWidth] = useState(0)
  const [prevChairHeight, setPrevChairHeight] = useState(0)

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
        if (isDesktop) {
          const progress = Math.min(
            1,
            ((experiencedNFTRef.current?.clientHeight || 0) +
              experiencedTop -
              window.innerHeight) /
              ((experiencedNFTRef.current?.clientHeight || 0) -
                2 * window.innerHeight)
          )
          chairImageRef.current.style.width =
            window.innerWidth -
            (window.innerWidth - prevChairWidth) * progress +
            'px'
          chairImageRef.current.style.height =
            window.innerHeight -
            (window.innerHeight - prevChairHeight) * progress +
            'px'
        } else {
          chairImageRef.current.style.width = '100%'
          chairImageRef.current.style.height = '100%'
        }
      }
    }
  }, [scrollY])

  return (
    <>
      <Head>
        <title>Brainchild: HomePage</title>
        <meta name="description" content="" />
      </Head>
      <Layout>
        {/*Ether clock landing page*/}
        <section className="relative dark-background-image h-screen-without-navbar overflow-hidden">
          <div className="relative h-screen-without-navbar">
            <div className="px-30 flex flex-col xl:flex-row items-end xl:items-center justify-center text-white text-20 sm:text-28 text-right xl:text-center font-light pt-35 xl:pt-125">
              <p className="pb-20 sm:py-30 xl:py-0 border-0 sm:border-b xl:border-0 border-gradient-light sm:w-2/3 xl:w-fit">
                <span
                  className="font-bold italic"
                  style={{ fontFamily: 'Subjectivity Serif' }}
                >
                  5000
                </span>{' '}
                Mints
              </p>
              <div className="hidden xl:block bg-white w-10 h-10 mx-30 rounded-full" />
              <p className="pb-20 sm:py-30 xl:py-0 border-0 sm:border-b xl:border-0 border-gradient-light sm:w-2/3 xl:w-fit">
                Upto{' '}
                <span
                  className="font-bold italic"
                  style={{ fontFamily: 'Subjectivity Serif' }}
                >
                  Levels 10
                </span>{' '}
                Enhancement
              </p>
              <div className="hidden xl:block bg-white w-10 h-10 mx-30 rounded-full" />
              <p className="pb-20 sm:py-30 xl:py-0 border-0 sm:border-b xl:border-0 border-gradient-light sm:w-2/3 xl:w-fit">
                Perpetually{' '}
                <span
                  className="font-bold italic"
                  style={{ fontFamily: 'Subjectivity Serif' }}
                >
                  Redeemable
                </span>
              </p>
              <div className="hidden xl:block bg-white w-10 h-10 mx-30 rounded-full" />
              <p className="pb-20 sm:py-30 xl:py-0 border-0 sm:border-b xl:border-0 border-gradient-light sm:hidden xl:block">
                Mint Price{' '}
                <span
                  className="font-bold italic"
                  style={{ fontFamily: 'Subjectivity Serif' }}
                >
                  0.12 Eth
                </span>
              </p>
            </div>

            <div className="relative pt-60 sm:pt-80 flex justify-center items-center">
              <div className="absolute w-1/2 flex items-center justify-center">
                <Image
                  className=""
                  src="/assets/images/landing-page/eth-clock-design.png"
                  layout="intrinsic"
                  width={547}
                  height={547}
                  alt="Ethereum Clock Design"
                />
              </div>
              <div>
                <Image
                  className="animate-spin-60s"
                  src="/assets/images/landing-page/eth-clock-letter.png"
                  layout="intrinsic"
                  width={1063}
                  height={1063}
                  alt="Ethereum Clock Letter"
                />
              </div>
              <div className="absolute w-120 h-120 sm:w-150 sm:h-150 xl:w-175 xl:h-175 -top-[50px] left-[5px] sm:left-[50px] lg:left-[100px] xl:top-[400px] xl:right-[50px] xl:left-auto">
                <Image
                  src="/assets/images/landing-page/radial-explore.png"
                  layout="fill"
                  alt="Explore"
                />
              </div>
            </div>
          </div>

          {/*state bar*/}
          <div
            className={
              'absolute bottom-0 lg:h-50 w-full bg-danger flex flex-col lg:flex-row items-center justify-between px-20 sm:px-40 py-10 sm:py-0 ' +
              stateBarBackground
            }
          >
            {raffleState === RaffleState.Waiting && (
              <p className="font-medium text-center">
                Raffle begins on 15 Jan, 2022 at 1:03 PM GMT
              </p>
            )}
            {raffleState === RaffleState.Live && (
              <p className="font-medium text-center">
                Raffle Results{' '}
                <span className="text-30 font-bold">LIVE NOW!</span> end on 15
                Jan, 2022 at 1:03 PM GMT
              </p>
            )}
            {raffleState === RaffleState.Ended && (
              <p className="font-medium text-center">
                Raffle Results{' '}
                <span className="text-30 font-bold">LIVE NOW!</span>
              </p>
            )}

            {raffleState !== RaffleState.Ended && (
              <p className="font-medium text-center">
                <span className="text-30 font-bold">01:23:45:12</span> Left
              </p>
            )}
            {raffleState === RaffleState.Ended && (
              <p className="font-medium text-center">
                Connect wallet to check if you’re whitelisted
              </p>
            )}
          </div>
        </section>

        <div className="light-background-image">
          {/*Immerse yourself in the new age of LUXURY*/}
          <section className="relative pt-130 pb-60 overflow-x-hidden">
            <div className="border-y border-gradient-dark p-25">
              <p className="text-primary-50 whitespace-nowrap transition eas-in-out transform -translate-y-1">
                Fermentum euismod sed pretium amet viverra odio ut. Mattis urna
                eget mi augue malesuada scelerisque sed consequat, non. Sagittis
                magnis ac, auctor dictum tristique turpis posuere. Fermentum
                euismod sed pretium amet viverra odio ut. Mattis urna eget mi
                augue malesuada scelerisque sed consequat, non.
              </p>
            </div>
            <div className="container mx-auto relative z-50">
              <div className="text-60 sm:text-95 lg:text-130 font-Voyage opacity-90 sm:opacity-75 lg:opacity-90 leading-tight text-primary-75 pt-60 lg:pb-195 text-left lg:text-center">
                <p>
                  Immerse
                  <br className="block lg:hidden" /> yourself
                  <br className="hidden lg:block" />{' '}
                  <span className="text-45 sm:text-71 lg:text-80">in the</span>{' '}
                  <br className="block lg:hidden" />
                  new age{' '}
                  <span className="text-45 sm:text-71 lg:text-80">of</span>
                </p>
                <p className="mt-10 text-100 sm:text-160 lg:text-180">LUXURY</p>
              </div>
            </div>

            <div className="container mx-auto relative z-40 block lg:hidden mt-30 mb-70">
              <Image
                className="cursor-pointer z-40"
                src="/assets/images/common/ether-clock.png"
                layout="responsive"
                width={335}
                height={420}
                alt="Ethereum Clock"
              />
            </div>

            <div className="container mx-auto relative block lg:hidden text-primary-50 z-50">
              <p className="text-right">
                Luxury has always been a timeless phenomenon but has it ever
                truly been forever?
                <br />
                <br />
                Well, Our NFTs are redeemable forever... Yes,
              </p>
              <p className="text-right font-Voyage text-80">Forever.</p>
            </div>
          </section>

          {/*Experience NFTs beyond Cryptoverse Section*/}
          <section className="relative" ref={experiencedNFTRef}>
            <div className="mx-auto" style={{ height: '400vh' }}>
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
                  className="object-cover object-center"
                  src="/assets/images/landing-page/cartain-with-chair.png"
                  alt="Cartain With Chair"
                />
              </div>
            </div>
          </section>

          {/*And more NFTs*/}
          <section className="relative py-200">
            <div className="flex justify-between items-center px-20 sm:px-80 xl:px-200">
              <p className="font-Voyage text-30 sm:text-50 text-primary-75">
                and more...
              </p>
              <div className="hidden lg:block">
                <Image
                  src="/assets/images/landing-page/eye-on-line.png"
                  layout="intrinsic"
                  width={316}
                  height={25}
                  alt="Eye On Line"
                />
              </div>
            </div>
            <div className="mt-100 px-20 sm:px-80 lg:pr-0 xl:pl-200">
              <Swiper
                className="w-full"
                spaceBetween={80}
                breakpoints={swiperBreakPoints}
              >
                {nfts.map((nft, i) => (
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
                        <span className="font-Voyage text-50 sm:text-80 text-primary-75 leading-none mb-20 font-Voyage">
                          {nft.name}
                        </span>
                        <p className="mt-20 p-20 border border-gradient-dark-linner">
                          {nft.content}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        </div>

        {/*Collaboration*/}
        <section className="relative dark-background-image">
          <div className="container mx-auto p-30 pt-50 sm:pt-200 text-white sm:text-center font-Voyage">
            <p className="text-45 lg:text-80">exquisite</p>
            <p className="text-justify sm:text-center break-all text-80 lg:text-100 xl:text-150">
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
                <Image
                  src="/assets/images/landing-page/radial-connect-hover.png"
                  layout="intrinsic"
                  width={420}
                  height={420}
                  alt="Hand Drawing White Hourse"
                />
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
            <div className="lg:w-1/3 flex lg:justify-center lg:items-center text-white">
              <p className="font-Voyage lg:hidden px-30 text-80 lg:vertical-letter font-[Voyage]">
                FAQ
              </p>
              {currentFaqIndex === -1 && (
                <p className="font-Voyage hidden lg:block text-130 vertical-letter font-Voyage">
                  FAQ
                </p>
              )}
              {currentFaqIndex !== -1 && (
                <p className="hidden lg:block faq-content-background w-full h-full text-white text-24 font-semibold p-30 sm:pl-90 transition-all animate-fadeIn">
                  {faqData[currentFaqIndex].content}
                </p>
              )}
            </div>
            <div className="lg:w-2/3 text-white">
              {faqData.map(
                (faq, index) =>
                  (index < faq_display_limit || isLoadMoreFaq) && (
                    <div key={faq.content + index}>
                      <div
                        onMouseEnter={() => {
                          if (isDesktop) {
                            setCurrentFaqIndex(index)
                          }
                        }}
                        onMouseLeave={() => {
                          if (isDesktop) {
                            setCurrentFaqIndex(-1)
                          }
                        }}
                        onClick={() => {
                          if (!isDesktop) {
                            setCurrentFaqIndex(
                              currentFaqIndex == index ? -1 : index
                            )
                          }
                        }}
                        className="p-0 lg:pb-35"
                      >
                        <div className="flex items-center justify-between transition-all duration-500 border border-r-0 border-gradient-light p-35 lg:mb-35 lg:ml-100 lg:hover:ml-50 lg:hover:pr-85 lg:hover:bg-white-10">
                          {faq.name}{' '}
                          {!isDesktop && (
                            <Icon
                              name={index === currentFaqIndex ? 'down' : 'up'}
                              color="white"
                              size={18}
                            />
                          )}
                        </div>
                      </div>
                      <p
                        className={
                          'faq-content-background lg:hidden w-full text-white text-24 font-semibold p-30 transition-all my-5 ' +
                          (index === currentFaqIndex ? 'block' : 'hidden')
                        }
                      >
                        {faq.content}
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
