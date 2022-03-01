import Head from 'next/head'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Layout } from '../components/layout/layout'
import Icon from '../components/ui-kit/icon'
import { RaffleState } from '../core/data/landing'
import { useEffect, useState } from 'react'

export default function Search() {
  const [raffleState, setRaffleState] = useState(RaffleState.Waiting)
  const [stateBarBackground, setStateBarBackground] = useState('bg-danger')

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
        <title>Brainchild: Search</title>
        <meta name="description" content="" />
      </Head>

      <Layout>
        <section className="relative dark-background-image" role="img" aria-label="Gradient background Image">
          <div className="container mx-auto h-screen-without-navbar py-50 sm:pt-150 flex flex-col justify-start items-center">
            <div className="flex justify-between border border-gradient-light rounded-md p-15 sm:w-1/2">
              <input
                type="search"
                className="outline-none bg-transparent text-white font-medium w-full"
                placeholder="Search"
              />
            </div>
            <div className="mt-20 sm:w-1/2 px-20">
              <div className="flex justify-between items-center bg-black-40 border border-gradient-light text-white text-18 font-medium p-30 mb-10">
                <p>Home/Enhancement</p>
                <a className="cursor-pointer">
                  <Icon name="hyperLink" color="white" size={24} />
                </a>
              </div>
              <div className="flex justify-between items-center bg-black-40 border border-gradient-light text-white text-18 font-medium p-30 mb-10">
                <p>Home/Enhancement</p>
                <a className="cursor-pointer">
                  <Icon name="hyperLink" color="white" size={24} />
                </a>
              </div>
              <div className="flex justify-between items-center bg-black-40 border border-gradient-light text-white text-18 font-medium p-30 mb-10">
                <p>Home/Enhancement</p>
                <a className="cursor-pointer">
                  <Icon name="hyperLink" color="white" size={24} />
                </a>
              </div>
              <div className="flex justify-between items-center bg-black-40 border border-gradient-light text-white text-18 font-medium p-30 mb-10">
                <p>Home/Enhancement</p>
                <a className="cursor-pointer">
                  <Icon name="hyperLink" color="white" size={24} />
                </a>
              </div>
              <div className="flex justify-between items-center bg-black-40 border border-gradient-light text-white text-18 font-medium p-30 mb-10">
                <p>Home/Enhancement</p>
                <a className="cursor-pointer">
                  <Icon name="hyperLink" color="white" size={24} />
                </a>
              </div>
            </div>
          </div>

          {/*state bar*/}
          <div
            className={
              'absolute bottom-0 lg:h-50 w-full bg-danger flex flex-col lg:flex-row items-center justify-between px-20 sm:px-40 ' +
              stateBarBackground
            }
          >
            {raffleState === RaffleState.Waiting && (
              <p className="font-medium text-center">
                Raffle begins on 07 Feb, 2022 at 1:03 PM GMT
              </p>
            )}
            {raffleState === RaffleState.Live && (
              <p className="font-medium text-center">
                Raffle Results{' '}
                <span className="text-30 font-bold">LIVE NOW!</span> end on 08
                Feb, 2022 at 1:03 PM GMT
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
      </Layout>
    </>
  )
}
