import Head from 'next/head'
import Image from 'next/image'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRouter } from 'next/router';

import { Layout } from '../components/layout/layout';
import React from 'react';

export default function Collections() {
  const router = useRouter();

  const goToNfts = () => {
    router.push('/nfts');
  }

  return (
    <>
      <Head>
        <title>Brainchild: Collections</title>
        <meta name="description" content="EthClock: a tribute to Ethereum, is a collection of 5000 perpetually redeemable NFTs— Upgradeable, Physical, Digital, Tradable & Unique."/>
      </Head>
      <Layout>
        <div className="flex flex-col xl:flex-row">
          <div className="min-w-400 bg-white-10">
            <div className="px-30 py-20 bg-primary">
              <p className="text-white text-18 font-semibold">COLLECTIONS</p>
            </div>
            <div>
              <div className="flex items-center mt-40 mx-40 pb-30 border-b border-gradient-light">
                <div className="pr-5 flex items-center">
                  <Image src="/assets/images/about-us/light-star-in-rhombus.png" layout="intrinsic" width={36} height={40} alt="Star In Square" />
                </div>
                <div>
                  <p className="text-white text-30 font-bold">ethereum clock</p>
                </div>
              </div>

              <div className="mt-30 mx-40">
                <p className="text-white opacity-30 text-18 font-semibold"><span className="mr-20">+</span>...more coming soon!</p>
              </div>
            </div>
          </div>

          <div onClick={() => goToNfts()} className="grow p-100 flex text-white relative overflow-hidden min-h-600 xl:min-h-full">
            <div className="hidden lg:block lg:w-1/2 xl:pr-45 pb-50 z-10">
              <p className="text-60 font-Voyage">Eleifend sed enim vulputate nec, scelerisque. </p>
              <p className="mt-40 font-light">An NFT collection of 5000 Ethereum Clocks with enhancements available upto level 10. Penatibus egestas arcu eget eget ultrices eget et. Vitae, interdum nunc duis justo. Integer tincidunt feugiat sit diam.</p>
              <p className="mt-40 p-20 font-medium border-0 border-b border-gradient-light">500 Mints</p>
              <p className="mt-10 p-20 font-medium border-0 border-b border-gradient-light">Level 1-10 Enhancements available</p>
              <p className="mt-10 p-20 font-medium border-0 border-b border-gradient-light">Perpetually Redeemable</p>
            </div>
            <div className="hidden lg:flex lg:w-1/2 xl:pl-45 items-end justify-center z-10">
              <Image
                src="/assets/images/landing-page/eth-clock-design.png"
                layout="intrinsic"
                width={505}
                height={564}
                alt="Ethereum Clock Design"
              />
            </div>
            <div className="absolute top-0 w-full h-full blur-2xl pt-200">
              <Image
                src="/assets/images/landing-page/eth-clock-design.png"
                layout="responsive"
                width={505}
                height={564}
                alt="Ethereum Clock Design"
              />
            </div>
            <div onClick={() => goToNfts()} className="cursor-pointer absolute w-120 h-120 sm:w-150 sm:h-150 xl:w-175 xl:h-175 -top-[50px] hidden lg:block lg:inset-x-1/2 lg:inset-y-1/2 z-30">
              <Image
                src="/assets/images/landing-page/radial-explore.png"
                layout="fill"
                alt="Explore"
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
