import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faInstagram, faTwitter, } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '../ui-kit/icon';
import ConnectWalletButton from '../elements/connect-wallet-button/ConnectWalletButton';
import useMatchBreakpoints from '../ui-kit/common/useMatchBreakpoints';
import { ThemeType } from '../../core/data/base';
import { sidebarUpdate } from '../../core/actions/sidebar-update';
import { AppContext } from '../context/app-context';

export function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    'dark-background-image'
  );
  const [textColor, setTextColor] = useState('text-white');
  const [borderColor, setBorderColor] = useState('border-gradient-light');

  const themeStatus = useSelector((state: any) => state.ThemeStatus);
  const sidebarStatus = useSelector((state: any) => state.SidebarStatus);
  const {isMobile, isTablet} = useMatchBreakpoints();
  const router = useRouter();
  const dispatch = useDispatch();
  const {wallet} = useContext(AppContext);

  const collectionsClicked = () => {
    dispatch(sidebarUpdate());
  };

  const goToNfts = () => {
    dispatch(sidebarUpdate());
    router.push('/nfts');
  };

  const goToOpenSea = () => {
    window.open('https://testnets.opensea.io/assets/0xd8a3c2a69ab79cf75c15299e00528f7da244c42a', '_blank');
  };

  useEffect(() => {
    setBackgroundColor(
      themeStatus === ThemeType.DarkMode
        ? 'dark-background-image'
        : 'light-background-image'
    );
    setTextColor(
      themeStatus === ThemeType.DarkMode ? 'text-white' : 'text-primary'
    );
    setBorderColor(
      themeStatus === ThemeType.DarkMode
        ? 'border-gradient-light'
        : 'border-gradient-dark'
    );
  }, [themeStatus]);

  return (
    <div
      className={
        navbarOpen
          ? backgroundColor + ' transition duration-500 z-[1000] sticky top-0'
          : backgroundColor +
          ' z-[1000] sticky top-0 transition duration-500 mt-40 relative'
      }
      role="img"
      aria-label="Gradient background Image"
    >
      <nav
        className={
          'h-65 z-[1000] flex px-15 sticky border-y overflow-x-clip transition duration-500 ' +
          textColor +
          ' ' +
          borderColor
        }
      >
        <div className="container px-0 mx-auto flex justify-between xl:justify-left">
          <Link href="/">
            <a className="flex items-center ml-20">
              <Image
                className="cursor-pointer"
                src={
                  themeStatus === ThemeType.DarkMode
                    ? '/assets/images/logo/logo-light-large.svg'
                    : '/assets/images/logo/logo-dark-large.svg'
                }
                width={isMobile ? 180 : 201}
                height={isMobile ? 55 : 63}
                alt="Brainchild logo"
              />
            </a>
          </Link>
          <button
            className="xl:hidden outline-none px-10"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            {!navbarOpen && (
              <Icon
                name="menu"
                color={themeStatus === ThemeType.DarkMode ? 'white' : 'primary'}
                size={27}
              />
            )}
            {navbarOpen && (
              <Icon
                name="close"
                color={themeStatus === ThemeType.DarkMode ? 'white' : 'primary'}
                size={25}
              />
            )}
          </button>
          <div
            className={
              'absolute xl:relative duration-300 transition-all xl:transition-none h-screen xl:h-auto xl:flex flex-col xl:flex-row xl:flex-grow w-full md:w-365 xl:bg-opacity-0 top-0 justify-start xl:justify-between items-start xl:items-center' +
              (navbarOpen
                ? ' left-0 top-[64px] block ease-out-in light-background-image overflow-y-scroll'
                : ' top-[100vh] hidden left-0 xl:top-0 ease-in-out')
            }
            style={{height: navbarOpen ? 'calc(100vh - 65px)' : 'auto'}}
            role="img"
            aria-label="Gradient background Image"
          >
            <ul
              className={
                'flex flex-col xl:flex-row xl:w-full xl:justify-center font-medium text-45 xl:text-16 ' +
                (isMobile || isTablet ? ' text-primary xl:' : 'xl:') +
                textColor
              }
            >
              <li className="py-15 px-20 xl:px-0 nav-link border-b border-gradient-dark xl:border-b-0">
                <a
                  onClick={() => collectionsClicked()}
                  className={
                    'cursor-pointer relative xl:px-25 xl:py-10 ' +
                    (router.pathname == '/collections' ? 'text-[#AF5F5F]' : '')
                  }
                  style={{fontFamily: 'Subjectivity Serif'}}
                >
                  Collections
                </a>
              </li>
              <li className="py-15 px-20 xl:px-0 nav-link border-b border-gradient-dark xl:border-b-0">
                <Link href="/about-us">
                  <a
                    className={
                      'relative xl:px-25 xl:py-10 ' +
                      (router.pathname == '/about-us' ? 'text-[#AF5F5F]' : '')
                    }
                    style={{fontFamily: 'Subjectivity Serif'}}
                  >
                    About Us
                  </a>
                </Link>
              </li>
              {/* <li className="pt-20 pb-10 px-20 xl:px-0 nav-link hidden xl:block">
                <Link href="/search">
                  <a className="relative xl:px-25 xl:py-10">
                    <Icon name="search" color={themeStatus === ThemeType.DarkMode ? 'white' : 'primary'} size={18} />
                  </a>
                </Link>
              </li> */}
              <li className="py-15 px-20 xl:px-0 nav-link border-b border-gradient-dark xl:border-b-0">

                <a
                  onClick={goToOpenSea}
                  className={
                    'relative xl:px-25 xl:py-10 cursor-pointer ' +
                    (router.pathname == '/opensea' ? 'text-[#AF5F5F]' : '')
                  }
                  style={{fontFamily: 'Subjectivity Serif'}}
                >
                  OpenSea
                </a>
              </li>
              <li
                className={'py-15 px-20 xl:px-0 nav-link border-b border-gradient-dark xl:border-b-0 ' + (wallet ? 'block' : 'hidden')}>
                <Link href="/wallet">
                  <a
                    className={
                      'relative xl:px-25 xl:py-10 ' +
                      (router.pathname == '/wallet' ? 'text-[#AF5F5F]' : '')
                    }
                    style={{fontFamily: 'Subjectivity Serif'}}
                  >
                    Wallet
                  </a>
                </Link>
              </li>
              <li
                className="py-15 px-20 xl:px-0 nav-link border-b border-gradient-dark xl:border-b-0 relative group cursor-pointer">
                <a
                  className={
                    'relative xl:px-25 xl:py-10 ' +
                    (router.pathname == '/other' ? 'text-[#AF5F5F]' : '')
                  }
                  style={{fontFamily: 'Subjectivity Serif'}}
                >
                  Other
                </a>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div
                    className="mt-20 p-25 back-drop rounded-[30px] border-[1px] hidden xl:group-hover:block"
                    style={{
                      borderColor: '#FFFFFF66',
                    }}
                  >
                    <div className="flex w-200 items-center">
                      <FontAwesomeIcon
                        icon={faDiscord}
                        size="1x"
                        // className="transform scale-150"
                      />
                      <span
                        className="ml-10 text-[14px] tracking-wider"
                        style={{
                          fontFamily: 'Subjectivity Serif',
                          fontWeight: 400,
                          verticalAlign: 'middle',
                        }}
                      >
                        <Link href="https://discord.gg/7S55rjvxm3">
                          Discord
                        </Link>
                      </span>
                    </div>
                    <div
                      className="text-[10px] mt-5 tracking-wider"
                      style={{
                        fontFamily: 'Subjectivity Serif',
                        fontWeight: 400,
                      }}
                    >
                      Join our active community there!
                    </div>
                    <div
                      className="w-full h-[2px] mt-20"
                      style={{
                        background:
                          'linear-gradient(270.16deg, rgba(255, 255, 255, 0) 1.04%, rgba(255, 255, 255, 0.4) 48.58%, rgba(255, 255, 255, 0) 100.31%)',
                      }}
                    />
                    <div className="flex mt-20 items-center tracking-wider">
                      <FontAwesomeIcon
                        icon={faFileAlt}
                        size="1x"
                        // className="transform scale-150"
                      />
                      <span
                        className="text-[14px] ml-10"
                        style={{
                          fontFamily: 'Subjectivity Serif',
                          fontWeight: 400,
                        }}
                      >
                        <Link
                          href="https://docs.google.com/document/d/e/2PACX-1vSFQQYJ06nu371dWY_Yu9PgS4onGKnWCiTDjZ899f3z77ih3eoNkdnbJvmYK2uHvg/pub">
                          Whitepaper
                        </Link>
                      </span>
                    </div>
                    <div
                      className="w-full h-[2px] mt-20"
                      style={{
                        background:
                          'linear-gradient(270.16deg, rgba(255, 255, 255, 0) 1.04%, rgba(255, 255, 255, 0.4) 48.58%, rgba(255, 255, 255, 0) 100.31%)',
                      }}
                    />
                    <div className="flex mt-20 items-center tracking-wider">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        size="1x"
                        // className="transform scale-150"
                      />
                      <span
                        className="text-[14px] ml-10"
                        style={{
                          fontFamily: 'Subjectivity Serif',
                          fontWeight: 400,
                        }}
                      >
                        <Link href="https://www.instagram.com/brainchildnft/">
                          Instagram
                        </Link>
                      </span>
                    </div>
                    <div
                      className="w-full h-[2px] mt-20"
                      style={{
                        background:
                          'linear-gradient(270.16deg, rgba(255, 255, 255, 0) 1.04%, rgba(255, 255, 255, 0.4) 48.58%, rgba(255, 255, 255, 0) 100.31%)',
                      }}
                    />
                    <div className="flex mt-20 items-center tracking-wider">
                      <FontAwesomeIcon
                        icon={faTwitter}
                        size="1x"
                        // className="transform scale-150"
                      />
                      <span
                        className="text-[14px] ml-10"
                        style={{
                          fontFamily: 'Subjectivity Serif',
                          fontWeight: 400,
                        }}
                      >
                        <Link href="https://twitter.com/BrainchildNFT">
                          Twitter
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <div className="block xl:hidden p-20">
                <div className="flex items-center mt-10">
                  <div className="w-20 flex">
                    <Icon name="discord" color="#353637" size={20}/>
                  </div>
                  <span
                    className="ml-10 text-[18px] tracking-wider"
                    style={{
                      fontFamily: 'Subjectivity Serif',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                    }}
                  >
                    <Link href="https://discord.gg/7S55rjvxm3">Discord</Link>
                  </span>
                </div>
                <div className="flex items-center mt-30">
                  <div className="w-20 flex">
                    <Icon name="file_text" color="#353637" size={20}/>
                  </div>
                  <span
                    className="ml-10 text-[18px] tracking-wider"
                    style={{
                      fontFamily: 'Subjectivity Serif',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                    }}
                  >
                    <Link
                      href="https://docs.google.com/document/d/e/2PACX-1vSFQQYJ06nu371dWY_Yu9PgS4onGKnWCiTDjZ899f3z77ih3eoNkdnbJvmYK2uHvg/pub">
                      Whitepaper
                    </Link>
                  </span>
                </div>
                <div className="flex items-center mt-30">
                  <div className="w-20 flex">
                    <Icon name="instagram" color="#353637" size={20}/>
                  </div>
                  <span
                    className="ml-10 text-[18px] tracking-wider"
                    style={{
                      fontFamily: 'Subjectivity Serif',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                    }}
                  >
                    <Link href="https://www.instagram.com/brainchildnft/">
                      Instagram
                    </Link>
                  </span>
                </div>
                <div className="flex items-center mt-30">
                  <div className="w-20 flex">
                    <Icon name="twitter" color="#353637" size={20}/>
                  </div>
                  <span
                    className="ml-10 text-[18px] tracking-wider"
                    style={{
                      fontFamily: 'Subjectivity Serif',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                    }}
                  >
                    <Link href="https://twitter.com/BrainchildNFT">
                      Twitter
                    </Link>
                  </span>
                </div>
              </div>
            </ul>
          </div>
          <div className="hidden xl:flex px-20 xl:px-0 xl:mr-50">
            <ConnectWalletButton/>
          </div>
        </div>
      </nav>
      <div className="relative">
        <div
          className={
            'absolute top-0 h-screen w-full sm:w-400 z-[1000] transition-all duration-500 dark-background-image' +
            (!sidebarStatus
              ? ' ease-in-out -left-800 sm:-left-400'
              : ' ease-out-in left-0')
          }
          role="img"
          aria-label="Gradient background Image"
        >
          <div className="bg-white-10 h-full">
            <div className="bg-primary">
              <div className="px-30 py-20 bg-white-10">
                <p className="text-white text-18 font-semibold">COLLECTIONS</p>
              </div>
            </div>
            <div>
              <div
                onClick={() => goToNfts()}
                className="cursor-pointer flex items-center mt-40 mx-40 pb-30 border-b border-gradient-light"
              >
                <Icon
                  className="pr-5"
                  name="starWithRhombus"
                  size={40}
                  color="white"
                />
                <p className="text-white text-30 font-bold font-Subjectivity">
                  ethereum clock
                </p>
              </div>

              <div className="mt-20 mx-40">
                <p className="text-white py-10 opacity-30 text-18 font-semibold">
                  <span className="mr-20">+</span>...more coming soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
