import React, { useEffect, useRef, useState } from 'react'
import ReactSlider from 'react-slider'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import SwiperCore, { Scrollbar } from 'swiper'

SwiperCore.use([Scrollbar])

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
import { useRouter } from 'next/router'

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

export default function Home() {
  const gaService = useGAService()
  gaService.pageView('/')

  const [currentFaqIndex, setCurrentFaqIndex] = useState(-1)
  const [isLoadMoreFaq, setIsLoadMoreFaq] = useState(false)
  const [raffleState, setRaffleState] = useState(RaffleState.Waiting)
  const [stateBarBackground, setStateBarBackground] = useState('bg-danger')
  const [swiperValue, setSwiperValue] = useState(0)

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

  const experiencedNFTRef = useRef<HTMLDivElement>(null)
  const chairImageRef = useRef<HTMLImageElement>(null)
  const exploreImageRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperCore>()

  const onInit = (Swiper: SwiperCore): void => {
    swiperRef.current = Swiper
  }

  const [scrollY, setScrollY] = useState(0)
  const [prevChairWidth, setPrevChairWidth] = useState(500)
  const [prevChairHeight, setPrevChairHeight] = useState(700)

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
        } else {
          chairImageRef.current.style.width = '100%'
          chairImageRef.current.style.height = '100%'
        }
      }
    }
  }, [scrollY])

  const router = useRouter()

  return (
    <>
      <Head>
        <title>Brainchild: HomePage</title>
        <meta
          name="description"
          content="Unlocking innovative ownership experiences by connecting to web3. Redeem, upgrade, enhance NFTs that traverse both digital and real world."
        />
      </Head>
      <Layout>
        {/*Ether clock landing page*/}
        <section className="relative dark-background-image h-screen-without-navbar overflow-hidden">
          <div
            className="relative h-screen-without-navbar"
            onMouseMove={(event) => {
              if (exploreImageRef.current) {
                exploreImageRef.current.style.top =
                  event.clientY - 105 + scrollY + 'px'
                exploreImageRef.current.style.left = event.clientX + 'px'
              }
            }}
            onClick={() => router.push('/collections')}
            style={{ cursor: 'none' }}
          >
            <div
              className="absolute w-120 h-120 sm:w-150 sm:h-150 xl:w-175 xl:h-175 -top-[50px] left-[5px] sm:left-[50px] lg:left-[100px] xl:top-[400px] xl:right-[50px] xl:left-auto transform -translate-x-1/2 -translate-y-1/2 z-[400]"
              ref={exploreImageRef}
            >
              <Image
                src="/assets/images/landing-page/radial-explore.png"
                layout="fill"
                alt="Explore"
              />
            </div>
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
                  src="/assets/images/landing-page/eth-clock-letter.svg"
                  layout="intrinsic"
                  width={1063}
                  height={1063}
                  alt="Ethereum Clock Letter"
                />
              </div>
            </div>
          </div>

          {/*state bar*/}
          {scrollY < 1 && (
            <div
              className={
                'absolute bottom-0 lg:h-50 w-full bg-danger flex flex-col lg:flex-row items-center justify-between px-20 sm:px-40 py-10 sm:py-0 ' +
                stateBarBackground
              }
            >
              {raffleState === RaffleState.Waiting && (
                <p
                  className="text-center"
                  style={{ fontFamily: 'Subjectivity Serif' }}
                >
                  Raffle begins on 15 Jan, 2022 at 1:03 PM GMT
                </p>
              )}
              {raffleState === RaffleState.Live && (
                <p
                  className="font-medium text-center"
                  style={{ fontFamily: 'Subjectivity Serif' }}
                >
                  Raffle Results{' '}
                  <span className="text-30 font-bold">LIVE NOW!</span> end on 15
                  Jan, 2022 at 1:03 PM GMT
                </p>
              )}
              {raffleState === RaffleState.Ended && (
                <p
                  className="font-medium text-center"
                  style={{ fontFamily: 'Subjectivity Serif' }}
                >
                  Raffle Results{' '}
                  <span className="text-30 font-bold">LIVE NOW!</span>
                </p>
              )}

              {raffleState !== RaffleState.Ended && (
                <p
                  className="font-medium text-center"
                  style={{ fontFamily: 'Subjectivity Serif' }}
                >
                  <span className="text-30 font-bold">01:23:45:12</span> Left
                </p>
              )}
              {raffleState === RaffleState.Ended && (
                <p
                  className="font-medium text-center"
                  style={{ fontFamily: 'Subjectivity Serif' }}
                >
                  Connect wallet to check if you’re whitelisted
                </p>
              )}
            </div>
          )}
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

            <div className="container mx-auto relative block lg:hidden text-primary-50 z-50">
              <p className="text-right">
                Luxury has always been a timeless phenomenon but has it ever
                truly been forever?
                <br />
                <br />
                Well, Our NFTs are redeemable forever... Yes,
              </p>
              <p className="text-right font-Voyage text-80">Forever.</p>
            </div> */}
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
                  className="object-cover object-center w-500 h-700"
                  src="/assets/images/landing-page/cartain-with-chair.png"
                  alt="Cartain With Chair"
                />
              </div>
              <div className="w-full h-screen sticky top-0 flex flex-row-reverse items-end">
                <div className="p-30 w-full sm:w-300 text-white">
                  Imagine you could bring your Minecraft axe to dig up your
                  backyard (Why not?). Well, We are bridging that gap.Our NFTs
                  transcend the metaverse and find their place in the physical
                  world, even if that place is your mum’s backyard.
                </div>
              </div>
            </div>
          </section>

          {/*And more NFTs*/}
          <section className="relative py-200">
            <div className="flex justify-between items-center px-20 sm:px-80 xl:px-200">
              <p className="font-Voyage text-30 sm:text-50 text-primary-75">
                and more...
              </p>
            </div>
            <div className="mt-100 px-20 sm:px-80 lg:pr-0 xl:pl-200">
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
                  <div className="background-gray-blur p-30 sm:p-40 pb-0 w-full">
                    <p
                      className="text-50 sm:text-80 text-[#232425]"
                      style={{ fontFamily: 'Future Classic' }}
                    >
                      Enhance
                    </p>
                    <div className="text-18 sm:text-20 text-[#343536]">
                      Play with our mysterious dice to test your luck and evolve
                      your NFTs to higher levels.Roll the dice for 5 possible
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
                      src="/assets/images/landing-page/bg-enhance-item.svg"
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
                      to your front door.Touch it. Feel it. Lick it. Get weird
                      with it. Throw it and redeem again.It’s yours, FOREVER.Our
                      NFTs are perpetually redeemable.
                    </div>
                    <img
                      className="w-full absolute bottom-0 left-0"
                      src="/assets/images/landing-page/bg-redeem-item.svg"
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
                        <span className="font-Voyage text-50 sm:text-80 text-primary-75 leading-none mb-20 font-Voyage">
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
                <p className="hidden lg:block faq-content-background w-full h-full text-white text-24 font-semibold p-30 sm:pl-90 transition-all">
                  <span className="animate-fadeIn">
                    {faqData[currentFaqIndex].content}
                  </span>
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
                          if (!isMobile) {
                            setCurrentFaqIndex(index)
                          }
                        }}
                        onMouseLeave={() => {
                          if (!isMobile) {
                            setCurrentFaqIndex(-1)
                          }
                        }}
                        onClick={() => {
                          if (isMobile) {
                            setCurrentFaqIndex(
                              currentFaqIndex == index ? -1 : index
                            )
                          }
                        }}
                      >
                        <div className="flex items-center justify-between transition-all duration-500 border border-r-0 border-gradient-light p-35 lg:mb-35 lg:ml-100 lg:hover:ml-50 lg:hover:pr-85 lg:hover:bg-white-10">
                          {faq.name}{' '}
                          {isMobile && (
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
