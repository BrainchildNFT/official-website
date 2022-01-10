import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Icon from '../ui-kit/icon'
import ConnectWalletButton from '../elements/connect-wallet-button/ConnectWalletButton'
import useMatchBreakpoints from '../ui-kit/common/useMatchBreakpoints'
import { faDiscord, faInstagram, faRedditAlien, faTelegramPlane, faTwitter, } from '@fortawesome/free-brands-svg-icons'

export function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false)

  const { isMobile } = useMatchBreakpoints()

  return (
    <div
      className={
        navbarOpen ? 'dark-background-image' : 'dark-background-image pt-40'
      }
    >
      <nav className="h-65 z-[100] flex px-15 sticky text-white border-y border-gradient-light overflow-x-clip">
        <div className="container px-0 mx-auto flex justify-between xl:justify-left">
          <Link href="/">
            <a className="flex items-center">
              <Image
                className="cursor-pointer"
                src="/assets/images/logo/logo-light-large.svg"
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
            <Icon name="menu" color="white" size={27} />
          </button>
          <div
            className={
              'fixed xl:relative duration-300 transition-all xl:transition-none min-h-screen xl:h-auto xl:flex flex-col xl:flex-row xl:flex-grow w-full md:w-365 xl:bg-opacity-0 top-0 justify-start xl:justify-between items-start xl:items-center' +
              (navbarOpen
                ? ' left-0 ease-out-in light-background-image'
                : ' -left-800 xl:left-0 ease-in-out')
            }
          >
            <div className="flex w-full xl:hidden justify-between py-30 dark-background-image h-65 px-20 xl:px-0 ">
              <Link href="/">
                <a className="flex xl:hidden items-center">
                  <Image
                    className="cursor-pointer"
                    src="/assets/images/logo/logo-light-large.svg"
                    width={isMobile ? 180 : 201}
                    height={isMobile ? 55 : 63}
                    alt="Brainchild logo"
                  />
                </a>
              </Link>
              <button
                className="px-10 flex items-center"
                onClick={() => setNavbarOpen(false)}
              >
                <Icon name="close" color="white" size={25} />
              </button>
            </div>
            <div className="w-full xl:hidden px-10 py-20">
              <div className="flex justify-between border border-gradient-dark rounded-md p-15">
                <input
                  type="search"
                  className="outline-none bg-transparent text-primary w-10/12"
                  placeholder="Search"
                />
                <button className="flex items-center outline-none">
                  <Icon name="search" color="primary" size={18} />
                </button>
              </div>
            </div>
            <ul className="flex flex-col xl:flex-row xl:w-full xl:justify-center font-medium text-45 xl:text-18 xl:text-14 text-primary xl:text-white">
              <li className="py-15 px-20 xl:px-0 nav-link border-b border-gradient-dark xl:border-b-0">
                <Link href="/collections">
                  <a className="relative xl:px-25 xl:py-10">Collections</a>
                </Link>
              </li>
              <li className="py-15 px-20 xl:px-0 nav-link border-b border-gradient-dark xl:border-b-0">
                <Link href="/about-us">
                  <a className="relative xl:px-25 xl:py-10">About Us</a>
                </Link>
              </li>
              <li className="pt-20 pb-10 px-20 xl:px-0 nav-link hidden xl:block">
                <Link href="/search">
                  <a className="relative xl:px-25 xl:py-10">
                    <Icon name="search" color="white" size={18} />
                  </a>
                </Link>
              </li>
              <li className="py-15 px-20 xl:px-0 nav-link border-b border-gradient-dark xl:border-b-0">
                <Link href="/opensea">
                  <a className="relative xl:px-25 xl:py-10">Opensea</a>
                </Link>
              </li>
              <li className="py-15 px-20 xl:px-0 nav-link border-b border-gradient-dark xl:border-b-0 relative group">
                <a className="relative xl:px-25 xl:py-10">Other</a>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div
                    className="mt-20 p-30 back-drop rounded-[30px] border-[1px] hidden xl:group-hover:block"
                    style={{
                      borderColor: '#FFFFFF66',
                    }}
                  >
                    <div className="flex w-260 items-center">
                      <FontAwesomeIcon
                        icon={faDiscord}
                        size="1x"
                        className="transform scale-150"
                      />
                      <span
                        className="ml-10 text-[18px] tracking-wider"
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
                      className="text-[12px] mt-5 tracking-wider"
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
                        className="transform scale-150"
                      />
                      <span
                        className="text-[18px] ml-10"
                        style={{
                          fontFamily: 'Subjectivity Serif',
                          fontWeight: 400,
                        }}
                      >
                        <Link href="https://docs.google.com/document/d/e/2PACX-1vSFQQYJ06nu371dWY_Yu9PgS4onGKnWCiTDjZ899f3z77ih3eoNkdnbJvmYK2uHvg/pub">
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
                    <div className="flex mt-20">
                      <a href="https://t.me/joinchat/KxQp5cc1K35lM2Jl">
                        <FontAwesomeIcon
                          icon={faTelegramPlane}
                          size="1x"
                          className="transform scale-150"
                        />
                      </a>
                      <a href="https://www.reddit.com/r/brainchildNFT/">
                        <FontAwesomeIcon
                          icon={faRedditAlien}
                          size="1x"
                          className="transform scale-150 ml-40"
                        />
                      </a>
                      <a href="https://www.instagram.com/brainchildnft/">
                        <FontAwesomeIcon
                          icon={faInstagram}
                          size="1x"
                          className="transform scale-150 ml-40"
                        />
                      </a>
                      <a href="https://twitter.com/BrainchildNFT">
                        <FontAwesomeIcon
                          icon={faTwitter}
                          size="1x"
                          className="transform scale-150 ml-40"
                        />
                      </a>
                    </div>
                    <div
                      className="text-[12px] tracking-wider mt-10"
                      style={{
                        fontFamily: 'Subjectivity Serif',
                        fontWeight: 400,
                      }}
                    >
                      Keep yourself updated with our announcement channels
                    </div>
                  </div>
                </div>
              </li>
              <div className="block xl:hidden p-20">
                <div className="flex items-center mt-10">
                  <div className="w-50">
                    <FontAwesomeIcon
                      icon={faDiscord}
                      size="1x"
                      className="transform scale-75"
                    />
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
                <div className="flex items-center mt-10">
                  <div className="w-50">
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      size="1x"
                      className="transform scale-75"
                    />
                  </div>
                  <span
                    className="ml-10 text-[18px] tracking-wider"
                    style={{
                      fontFamily: 'Subjectivity Serif',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                    }}
                  >
                    <Link href="https://docs.google.com/document/d/e/2PACX-1vSFQQYJ06nu371dWY_Yu9PgS4onGKnWCiTDjZ899f3z77ih3eoNkdnbJvmYK2uHvg/pub">
                      Whitepaper
                    </Link>
                  </span>
                </div>
                <div className="flex items-center mt-10">
                  <div className="w-50">
                    <FontAwesomeIcon
                      icon={faTelegramPlane}
                      size="1x"
                      className="transform scale-75"
                    />
                  </div>
                  <span
                    className="ml-10 text-[18px] tracking-wider"
                    style={{
                      fontFamily: 'Subjectivity Serif',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                    }}
                  >
                    <Link href="https://t.me/joinchat/KxQp5cc1K35lM2Jl">
                      Telegram
                    </Link>
                  </span>
                </div>
                <div className="flex items-center mt-10">
                  <div className="w-50">
                    <FontAwesomeIcon
                      icon={faRedditAlien}
                      size="1x"
                      className="transform scale-75"
                    />
                  </div>
                  <span
                    className="ml-10 text-[18px] tracking-wider"
                    style={{
                      fontFamily: 'Subjectivity Serif',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                    }}
                  >
                    <Link href="https://www.reddit.com/r/brainchildNFT/">
                      Reddit
                    </Link>
                  </span>
                </div>
                <div className="flex items-center mt-10">
                  <div className="w-50">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      size="1x"
                      className="transform scale-75"
                    />
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
                <div className="flex items-center mt-10">
                  <div className="w-50">
                    <FontAwesomeIcon
                      icon={faTwitter}
                      size="1x"
                      className="transform scale-75"
                    />
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
            <ConnectWalletButton />
          </div>
        </div>
      </nav>
    </div>
  )
}
