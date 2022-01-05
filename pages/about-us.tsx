import {useEffect, useState} from 'react';
import Head from 'next/head'
import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {Layout} from '../components/layout/layout';
import {nftList, RaffleState, faqs, faq_display_limit} from '../core/data/landing';
import {shimmerUrl} from '../components/ui-kit/common/blur-image';
import useGAService from '../core/app-services/ga-service';
import useMatchBreakpoints from '../components/ui-kit/common/useMatchBreakpoints';
import Icon from '../components/ui-kit/icon';
import RoadMap from '../components/about-us/road-map';

export default function AboutUs() {
  const [raffleState, setRaffleState] = useState(RaffleState.Waiting);
  const [stateBarBackground, setStateBarBackground] = useState('bg-danger');

  const { isDesktop } = useMatchBreakpoints()

  useEffect(() => {
    switch (raffleState) {
      case RaffleState.Waiting:
        setStateBarBackground('bg-danger text-white');
        break;
      case RaffleState.Live:
        setStateBarBackground('bg-success text-white');
        break;
      case RaffleState.Ended:
        setStateBarBackground('light-background-image text-primary');
        break;
      default:
        setStateBarBackground('bg-danger text-white');
    }
  }, [raffleState]);

  return (
    <>
      <Head>
        <title>Brainchild: About Us</title>
        <meta name="description" content=""/>
      </Head>
      <Layout>
        <div className="dark-background-image">
          {/*Pushing the boundaries of NFTs*/}
          <section className="container mx-auto pt-35 sm:pt-105 lg:pt-145 pb-110 sm:pb-195 lg:pb-305 flex flex-col items-center">
            <p className="font-Voyage text-white text-center opacity-90 text-60 sm:text-100 lg:text-130">Pushing the<br className="sm:hidden"/> boundaries<br className="sm:hidden"/> of NFTs</p>
            <div className="-mt-150 -mb-100">
              <Image src="/assets/images/landing-page/multi-polygon-light.png" layout="intrinsic" width={450} height={450} alt="Multi Polygon" />
            </div>
            <p className="text-white sm:max-w-420 mb-50">What comes to mind when you hear NFTs? Is it hundred different variations of an ape, An avatar or do you think of an art? Are they digital game cards? Did your imagination transcend the cryptoverse?</p>
            <p className="text-white sm:max-w-420 text-right">NFTs are just at the beginning of their spring. PFPs and avatars are the early sprouts. There’s so much more that can be acheived, we at brainchildNFT aim to bring that potential to fruition.</p>
          </section>

          {/*RoadMap for New Year*/}
          <section className="container mx-auto py-150">
            <RoadMap />
          </section>
        </div>
      </Layout>
    </>
  );
}
