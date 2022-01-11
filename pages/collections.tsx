import { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Layout } from '../components/layout/layout';
import { RaffleState } from '../core/data/landing';
import Icon from '../components/ui-kit/icon';
import { Link } from '@mui/material';
import { CollectionsMenuType } from '../core/data/collections';
import About from '../components/collections/about';
import PerksAndUtility from '../components/collections/perks-and-utility';
import Timeline from '../components/collections/timeline';
import Enhancements from '../components/collections/enhancements';
import Gallery from '../components/collections/gallery';
import useMatchBreakpoints from '../components/ui-kit/common/useMatchBreakpoints';
import Artist from '../components/collections/artist';

export default function Collections() {
  const [isTop, setIsTop] = useState(true);
  const [raffleState, setRaffleState] = useState(RaffleState.Waiting);
  const [stateBarBackground, setStateBarBackground] = useState('bg-danger');
  const [currentMenuId, setCurrentMenuId] = useState(CollectionsMenuType.Gallery);

  const { isHuge } = useMatchBreakpoints()

  const menuList = [
    {id:CollectionsMenuType.About, name: 'ABOUT'},
    {id:CollectionsMenuType.Artist, name: 'ARTIST'},
    {id:CollectionsMenuType.PerksAndUtility, name: 'PERKS AND UTILITY'},
    {id:CollectionsMenuType.TimeLine, name: 'TIMELINE'},
    {id:CollectionsMenuType.Enhancements, name: 'ENHANCEMENTS'},
    {id:CollectionsMenuType.Gallery, name: 'GALLERY'},
    {id:CollectionsMenuType.WhitePaper, name: 'WHITEPAPER'},
  ];

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    }
  }

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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Brainchild: NFT Collections</title>
        <meta name="description" content="EthClock: a tribute to Ethereum, is a collection of 5000 perpetually redeemable NFTs— Upgradeable, Physical, Digital, Tradable & Unique."/>
      </Head>
      <Layout>
        <div className="relative z-0 overflow-hidden">
          <div className="absolute top-0 w-full h-full">
            <div className="absolute top-0 w-full h-full light-background-image" />
            <div className="absolute top-0 w-full h-full dark-background-image" />
          </div>
          <div className="relative flex">
            <div className="hidden xl:flex min-w-400 bg-white-10 flex-col">
              <div className="p-40 text-white grow">
                <Link href="/"><a className="text-18 text-white font-bold no-underline flex items-center"><Icon className="rotate-180 mr-25" name='arrow_right' color='white' size={21} />COLLECTIONS</a></Link>
                <div className="mt-50 flex items-center">
                  <div className="pr-5 flex items-center">
                    <Image src="/assets/images/about-us/star-in-rhombus.png" layout="intrinsic" width={36} height={40} alt="Star In Square" />
                  </div>
                  <div>
                    <p className="text-30 font-bold">ethereum clock</p>
                  </div>
                </div>
                <div className="mt-50">
                  {menuList.map((menu, index) => (<div key={index} className="flex items-center mb-30 cursor-pointer" onClick={() => setCurrentMenuId(menu.id)}>
                    <div className={'text-danger transition-all ease-in-out duration-500 ' + (index === currentMenuId ? 'w-50 mr-10 border border-1' : 'w-0 border-0')} style={{ height: '1px'}} />
                    <p className={'font-medium text-16 transition-all ease-in-out duration-500 ' + (index === currentMenuId ? 'text-danger': '')}>{menu.name}<Icon className={'ml-5 ' + (index === menuList.length - 1 ? 'block' : 'hidden')} name='external_link' color={index === currentMenuId ? 'danger' : 'white'} size={16} /></p>
                  </div>))}
                </div>
                <div className="flex">
                  <div className="bg-white rounded-full px-30 py-15 cursor-pointer">
                    <span className="font-Subjectivity text-primary text-18 font-bold">OPENSEA <Icon className="ml-10" name='opensea' color='primary' size={16} /></span>
                  </div>
                </div>
              </div>
              <div className="bg-primary px-30 py-15">
                <p className="text-center text-white text-16">RAFFLE BEGINS ON JAN 24, 2022</p>
              </div>
              <div className="bg-danger py-20 px-30">
                <p className="text-center text-white text-40 font-Subjectivity font-bold">01:23:45:12</p>
                <p className="text-16 text-white flex items-center justify-center">
                  <span className="pr-25 opacity-40">Stay connected</span>
                  <Icon className="pr-25" name="discord" color="white" size={16} />
                  <Icon className="pr-25" name="twitter" color="white" size={16} />
                  <Icon className="pr-25" name="instagram" color="white" size={16} />
                  <Icon name="telegram" color="white" size={16} />
                </p>
              </div>
            </div>

            <div className={"relative grow" + (isHuge ? " collection-body-width" : " w-screen")}>
              <section className={'text-white transition duration-500 ease-in-out ' + (currentMenuId === CollectionsMenuType.About ? 'opacity-100' : 'opacity-0 h-0')}>
                <About />
              </section>
              <section className={'text-white transition duration-500 ease-in-out ' + (currentMenuId === CollectionsMenuType.Artist? 'opacity-100' : 'opacity-0 h-0')}>
                <Artist />
              </section>
              <section className={'light-background-image text-white transition duration-500 ease-in-out ' + (currentMenuId === CollectionsMenuType.PerksAndUtility? 'opacity-100' : 'opacity-0 h-0')}>
                <PerksAndUtility />
              </section>
              <section className={'light-background-image text-white transition duration-500 ease-in-out ' + (currentMenuId === CollectionsMenuType.TimeLine? 'opacity-100' : 'opacity-0 h-0')}>
                <Timeline />
              </section>
              <section className={'text-white transition duration-500 ease-in-out ' + (currentMenuId === CollectionsMenuType.Enhancements? 'opacity-100' : 'opacity-0 h-0')}>
                <Enhancements />
              </section>
              <section className={'overflow-hidden text-white transition duration-500 ease-in-out ' + (currentMenuId === CollectionsMenuType.Gallery? 'opacity-100' : 'opacity-0 h-0') + (isHuge ? " collection-body-width" : " w-screen")}>
                <Gallery />
              </section>
              <section className={'text-white transition duration-500 ease-in-out ' + (currentMenuId === CollectionsMenuType.WhitePaper? 'opacity-100' : 'opacity-0 h-0')}>
                <p>WhitePaper</p>
              </section>
            </div>
          </div>
        </div>

        <section className={ isTop ? 'z-40 block xl:hidden' : 'hidden' }>
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
      </Layout>
    </>
  );
}
