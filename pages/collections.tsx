import Head from 'next/head'
import Image from 'next/image'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRouter } from 'next/router';
import React from 'react';

import { Layout } from '../components/layout/layout';
import Icon from '../components/ui-kit/icon';

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

        <meta property="og:url" content="https://www.brainchildnft.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BrainchildNFT - EthClock" />
        <meta property="og:description" content="A tribute to Ethereum. Redeem, upgrade, enhance NFTs traversing the digital & real world. Unlock innovative ownership experinces with Web3." />
        <meta property="og:image" content="https://i.ibb.co/C1bXMkp/home-env-8.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="brainchildnft.com" />
        <meta property="twitter:url" content="https://www.brainchildnft.com/" />
        <meta name="twitter:title" content="BrainchildNFT - EthClock" />
        <meta name="twitter:description" content="A tribute to Ethereum. Redeem, upgrade, enhance NFTs traversing the digital & real world. Unlock innovative ownership experinces with Web3." />
        <meta name="twitter:image" content="https://i.ibb.co/C1bXMkp/home-env-8.jpg" />
      </Head>
      <Layout>
        <div className="flex flex-col xl:flex-row" onClick={() => goToNfts}>
          <div className="min-w-400 bg-white-10">
            <div className="bg-primary">
              <div className="px-30 py-20 text-white bg-white-10">
                <p className="text-white text-18 font-semibold">COLLECTIONS</p>
              </div>
            </div>
            <div>
              <div onClick={() => goToNfts()} className="cursor-pointer flex items-center mt-40 mx-40 pb-30 border-b border-gradient-light">
                <Icon className="pr-5" name="starWithRhombus" size={40} color="white" />
                <p className="text-white text-30 font-bold font-Subjectivity">ethereum clock</p>
              </div>

              <div className="mt-20 mx-40">
                <p className="text-white py-10 opacity-30 text-18 font-semibold"><span className="mr-20">+</span>...more coming soon!</p>
              </div>
            </div>
          </div>

          <div onClick={() => goToNfts()} className="grow p-100 flex text-white relative overflow-hidden min-h-600 xl:min-h-full">
            <div className="hidden lg:block lg:w-1/2 xl:pr-45 pb-50 z-10">
              <p className="text-60 font-Future leading-tight">Eleifend sed enim vulputate nec, scelerisque. </p>
              <p className="mt-40 font-light leading-tight">An NFT collection of 5000 Ethereum Clocks with enhancements available upto level 10. Penatibus egestas arcu eget eget ultrices eget et. Vitae, interdum nunc duis justo. Integer tincidunt feugiat sit diam.</p>
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
          </div>

          <div onClick={() => goToNfts()} className="cursor-pointer absolute w-60 h-60 sm:w-100 sm:h-100 xl:w-120 xl:h-120 hidden lg:block lg:inset-x-2/3 lg:inset-y-1/2 -mr-200 z-30">
            <Image
              src="/assets/images/landing-page/radial-explore.png"
              layout="fill"
              alt="Explore"
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
