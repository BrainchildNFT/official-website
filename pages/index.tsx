import { useEffect, useState } from 'react'
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

  return (
    <>
      <Head>
        <title>Brainchild: HomePage</title>
        <meta name="description" content="Unlocking innovative ownership experiences by connecting to web3. Redeem, upgrade, enhance NFTs that traverse both digital and real world." />
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
                  Level 10
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

        <div className="light-background-image overflow-hidden">
          {/*Immerse yourself in the new age of LUXURY*/}
          <section className="relative pt-130 pb-60">
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
          <section className="relative">
            <div className="container mx-auto flex flex-col pt-95 lg:pt-0 lg:items-center justify-center lg:h-screen">
              <div className="relative font-Voyage text-108 lg:text-130 text-primary-75 text-right pr-120 pb-120 lg:pr-100 lg:pb-100">
                <p className="leading-none sm:leading-tight">
                  <span className="text-45 sm:text-66 lg:text-80">
                    Experience
                  </span>{' '}
                  <span className="text-100 sm:text-120 lg:text-150">NFTs</span>
                </p>
                <p className="text-45 sm:text-66 lg:text-80 leading-none sm:leading-tight">
                  beyond the
                </p>
                <div className="absolute bottom-0 flex justify-end w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 560 500"
                    width="560"
                    height="500"
                  >
                    <path
                      fill="none"
                      id="round"
                      d="M0, 500L400,500C700,450,400,0,700,0L0"
                    />
                    <text
                      x="25"
                      className="fill-primary text-140 tracking-wider"
                    >
                      <textPath xlinkHref="#round">Crypto verse</textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute min-w-1200 top-0 right-0 -mr-400">
                  <Image
                    src="/assets/images/landing-page/multi-line-chart.png"
                    layout="responsive"
                    width={950}
                    height={450}
                    alt="Multi Line Chart"
                  />
                </div>
              </div>
              {/* <div className="flex flex-col sm:flex-row lg:hidden pt-160 pb-80">
                <div className="relative flex justify-center pb-195 sm:pb-0 sm:w-1/2 px-20">
                  <Image
                    className="cursor-pointer"
                    src="/assets/images/landing-page/cartain-with-chair.png"
                    layout="intrinsic"
                    width={337}
                    height={515}
                    alt="Cartain With Chair"
                  />
                  <div className="absolute w-full bottom-0 left-0 -ml-100 pb-50 block sm:hidden">
                    <Image
                      src="/assets/images/landing-page/multi-polygon-dark.svg"
                      layout="intrinsic"
                      width={240}
                      height={240}
                      alt="Multi Polygon"
                    />
                  </div>
                </div>
              </div> */}
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
                <span className="text-30 lg:text-60">with</span> wondrous
                artists
              </p>
          </div>
          <div className="container mx-auto flex flex-col sm:flex-row items-center sm:justify-between mt-90 sm:mt-110">
            <div className="w-300 h-300 flex items-center justify-center my-80 sm:my-0">
              <Image
                  src="/assets/images/landing-page/radial-connect.png"
                  layout="intrinsic"
                  width={420}
                  height={420}
                  alt="Hand Drawing White Hourse"
                />
            </div>
            <div className="text-white">
              <p className="sm:max-w-290">
                  Et faucibus purus, ornare mi aliquam laoreet. Pretium, odio
                  dis sit ipsum pretium elementum, pharetra vitae. A aliquam
                  facilisi egestas pharetra iaculis. Pellentesque nisl convallis
                  ornare augue nisl risus commodo, mi. Purus eget bibendum sit
                  urna. Enim nunc, neque nunc felis massa magna massa porta.
                </p>
            </div>
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
        </section>

        {/*FAQs*/}
        <section className="relative dark-background-image">
          <div className="py-45 sm:py-95 flex flex-col lg:flex-row">
            <div className="lg:w-1/3 flex lg:justify-center lg:items-center text-white">
              <p className="font-Voyage lg:hidden px-30 text-80 lg:vertical-letter font-[Voyage]">FAQ</p>
              {currentFaqIndex === -1 && (
                  <p className="font-Voyage hidden lg:block text-130 vertical-letter font-Voyage">
                    FAQ
                  </p>
              )}
                {currentFaqIndex !== -1 && (
                  <p className="hidden lg:block faq-content-background w-full h-full text-white text-24 font-semibold p-30 sm:pl-90 transition-all">
                    {faqData[currentFaqIndex].content}
                  </p>
                )}
            </div>
            <div className="lg:w-2/3 text-white">
              {faqData.map((faq, index) =>
                (index < faq_display_limit || isLoadMoreFaq) && (
                  <>
                        <p
                    onMouseEnter={() => { if(isDesktop ) {setCurrentFaqIndex(index)}
                          }}
                    onMouseLeave={() => { if(isDesktop ) {setCurrentFaqIndex(-1)}
                          }}
                    onClick={() => { if(!isDesktop ) {setCurrentFaqIndex(currentFaqIndex == index ? -1 : index
                    )
                            }
                          }} className="flex items-center justify-between transition-all border border-r-0 border-gradient-light p-35 lg:mb-35 lg:ml-100 lg:hover:ml-50 lg:hover:pr-85 lg:hover:bg-white-10"
                  >{faq.name} {' '}
                          {!isDesktop && (
                            <Icon
                              name={index === currentFaqIndex ? 'down' : 'up'}
                              color="white"
                              size={18}
                            />
                          )}</p>
                  <p className={'faq-content-background lg:hidden w-full text-white text-24 font-semibold p-30 transition-all my-5 ' + (index === currentFaqIndex ? 'block' : 'hidden')}>{faq.content}</p></>
                )
              )}
              <div className="flex lg:ml-170 justify-center lg:justify-start">
                <a className="cursor-pointer opacity-40" onClick={() => setIsLoadMoreFaq(!isLoadMoreFaq)}>{isLoadMoreFaq ? 'less show...' : 'load more...'}</a>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
