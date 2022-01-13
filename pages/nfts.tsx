import { useEffect, useRef, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from '../components/layout/layout';
import { RaffleState } from '../core/data/landing';
import Icon from '../components/ui-kit/icon';
import { Link } from '@mui/material';
import { NftsMenuType, NftsMenuTypeArr } from '../core/data/nfts';
import About from '../components/nfts/about';
import PerksAndUtility from '../components/nfts/perks-and-utility';
import Timeline from '../components/nfts/timeline';
import Enhancements from '../components/nfts/enhancements';
import Gallery from '../components/nfts/gallery';
import useMatchBreakpoints from '../components/ui-kit/common/useMatchBreakpoints';
import Artist from '../components/nfts/artist';
import { themeUpdate } from '../core/actions';
import { ThemeType } from '../core/data/base';

export default function Nfts() {
  const [isTop, setIsTop] = useState(true);
  const [raffleState, setRaffleState] = useState(RaffleState.Waiting);
  const [stateBarBackground, setStateBarBackground] = useState('bg-danger');
  const [currentMenuId, setCurrentMenuId] = useState(NftsMenuType.About);
  const [textColor, setTextColor] = useState('text-white');

  const themeStatus = useSelector((state: any)  => state.ThemeStatus);
  const dispatch = useDispatch();

  const { isHuge } = useMatchBreakpoints()
  const nftContentRef = useRef<HTMLDivElement>(null);

  const menuList = [
    {id:NftsMenuType.About, name: 'ABOUT'},
    {id:NftsMenuType.Artist, name: 'ARTIST'},
    {id:NftsMenuType.PerksAndUtility, name: 'PERKS AND UTILITY'},
    {id:NftsMenuType.TimeLine, name: 'TIMELINE'},
    {id:NftsMenuType.Enhancements, name: 'ENHANCEMENTS'},
    {id:NftsMenuType.Gallery, name: 'GALLERY'},
    {id:NftsMenuType.WhitePaper, name: 'WHITEPAPER'},
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

  const nftContentScrolled = () => {
    if (nftContentRef.current?.scrollTop) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }

    let contentHeight = 0;
    Array.from(nftContentRef?.current?.children || []).map((item, index) => {
      const nextHeight = contentHeight + item.clientHeight;
      const scrollTop = nftContentRef?.current?.scrollTop || 0;
      if (scrollTop > contentHeight - 300 && scrollTop < nextHeight) {
        setCurrentMenuId(NftsMenuTypeArr[index]);
      }
      contentHeight = nextHeight;
    });
  }

  const menuClicked = (menuId: NftsMenuType) => {
    if (menuId === NftsMenuType.WhitePaper) {
      window.open('https://docs.google.com/document/d/e/2PACX-1vSFQQYJ06nu371dWY_Yu9PgS4onGKnWCiTDjZ899f3z77ih3eoNkdnbJvmYK2uHvg/pub', '_blank');
    } else {
      setCurrentMenuId(menuId);

      const selectedSectionIndex = NftsMenuTypeArr.findIndex((element) => element === menuId);
      const childrenArr = Array.from(nftContentRef?.current?.children || []);
      let contentHeight = 0;
      if (selectedSectionIndex < childrenArr.length) {
        for (let index = 0; index < selectedSectionIndex; index ++) {
          contentHeight += childrenArr[index].clientHeight;
        }
      }
      nftContentRef?.current?.childNodes[1]?.parentElement?.scrollTo(
        {
          left: 0,
          top: contentHeight,
          behavior: 'smooth'
        }
      );
    }
  }

  useEffect(() => {
    if (currentMenuId === NftsMenuType.About) {
      dispatch(themeUpdate(ThemeType.DarkMode));
    } else {
      dispatch(themeUpdate(ThemeType.LightMode));
    }
  }, [currentMenuId])

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
    setTextColor(themeStatus === ThemeType.DarkMode ? 'text-white' : 'text-primary');
  }, [themeStatus]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);

  return (
    <>
      <Head>
        <title>Brainchild: NFTs</title>
        <meta name="description" content="EthClock: a tribute to Ethereum, is a collection of 5000 perpetually redeemable NFTs— Upgradeable, Physical, Digital, Tradable & Unique."/>
      </Head>
      <Layout>
        <div className="relative flex flex-col xl:flex-row">
          <div className={"min-w-400 overflow-x-auto sticky top-0 flex flex-col " + (themeStatus === ThemeType.DarkMode ? 'bg-white-10' : 'bg-black-10')}>
            <div className={"grow py-25 pl-40 pr-0 xl:p-40 flex flex-row xl:flex-col whitespace-nowrap " + textColor}>
              <Link className="flex" href="/"><a className={"text-18 font-bold no-underline flex items-center " + textColor}><Icon className="rotate-180 mr-25" name='arrow_right' color={themeStatus === ThemeType.DarkMode ? 'white' : 'primary'} size={21} /><span className="hidden xl:block">COLLECTIONS</span></a></Link>
              <div className="mr-40 xl:mr-0 xl:mt-50 flex items-center">
                <div className="pr-5 flex items-center min-w-40">
                  <Image src={themeStatus === ThemeType.DarkMode ? '/assets/images/about-us/light-star-in-rhombus.png' : '/assets/images/about-us/dark-star-in-rhombus.png'} layout="intrinsic" width={36} height={40} alt="Star In Square" />
                </div>
                <div>
                  <p className="text-30 font-bold">ethereum clock</p>
                </div>
              </div>
              <div className="xl:mt-50 flex flex-row xl:flex-col">
                {menuList.map((menu, index) => (<div key={index} className="flex items-center mr-40 xl:mr-0 xl:mb-30 cursor-pointer" onClick={() => menuClicked(menu.id)}>
                  <div className={'hidden xl:block text-danger transition-all ease-in-out duration-500 ' + (index === currentMenuId ? 'w-50 mr-10 border border-1' : 'w-0 border-0')} style={{ height: '1px'}} />
                  <p className={'font-medium text-16 transition-all ease-in-out duration-500 ' + (index === currentMenuId ? 'text-danger': '')}>{menu.name}<Icon className={'ml-5 ' + (index === menuList.length - 1 ? 'block' : 'hidden')} name='external_link' color={index === currentMenuId ? 'danger' : (themeStatus === ThemeType.DarkMode ? 'white' : 'primary')} size={16} /></p>
                </div>))}
              </div>
              <div className="flex">
                <div className={"rounded-full px-30 py-15 cursor-pointer " + (themeStatus === ThemeType.DarkMode ? "bg-white" : "bg-primary")}>
                  <span className={"font-Subjectivity text-18 font-bold " + (themeStatus === ThemeType.DarkMode ? "text-primary" : "text-white")}>OPENSEA <Icon className="ml-10" name='opensea' color={themeStatus === ThemeType.DarkMode ? "primary" : "white"} size={16} /></span>
                </div>
              </div>
            </div>
            <div className={"px-30 py-15 hidden xl:block " + (themeStatus === ThemeType.DarkMode ? "bg-primary" : "bg-white-50")}>
              <p className={"text-center text-16 " + textColor}>RAFFLE BEGINS ON JAN 24, 2022</p>
            </div>
            <div className="bg-danger py-20 px-30 hidden xl:block">
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

          <div onScroll={() => nftContentScrolled()} ref={nftContentRef} className={"h-screen text-white overflow-y-auto overflow-x-hidden" + (isHuge ? " collection-body-width" : " w-screen")}>
            <About />
            <Artist />
            <PerksAndUtility />
            <Timeline />
            <Enhancements />
            <Gallery />
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
