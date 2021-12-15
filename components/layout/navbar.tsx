import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Icon from '../ui-kit/icon';
import useMatchBreakpoints from '../ui-kit/common/useMatchBreakpoints';

export function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const { isMobile } = useMatchBreakpoints()

  return (<div className={navbarOpen ? "bg-primary" : "bg-primary pt-40"}>
    <nav className="h-65 z-10 flex px-15 sticky text-white filter drop-shadow-lg border-y border-gradient-light">
      <div className="container px-0 mx-auto flex justify-between xl:justify-left">
        <Link href="/"><a className="flex items-center"><Image className="cursor-pointer" src="/assets/images/logo-light-large.svg" width={isMobile ? 180 : 201} height={isMobile ? 55 : 63} alt="Brainchild logo" /></a></Link>
        <button className="xl:hidden outline-none px-10" onClick={() => setNavbarOpen(!navbarOpen)}><Icon name="menu" color="white" size={27} /></button>
        <div className={
          "fixed xl:relative duration-300 transition-all xl:transition-none h-screen xl:h-auto xl:flex flex-col xl:flex-row xl:flex-grow w-full md:w-365 bg-white xl:bg-opacity-0 top-0 justify-start xl:justify-between items-start xl:items-center drop-shadow-lg" +
          (navbarOpen ? " left-0 ease-out-in" : " -left-800 xl:left-0 ease-in-out")
        }>
          <div className="flex w-full xl:hidden justify-between py-30 bg-primary h-65 px-20 xl:px-0 ">
            <Link href="/"><a className="flex xl:hidden items-center"><Image className="cursor-pointer" src="/assets/images/logo-light-large.svg" width={isMobile ? 180 : 201} height={isMobile ? 55 : 63} alt="Brainchild logo" /></a></Link>
            <button className="px-10 flex items-center" onClick={() => setNavbarOpen(false)}><Icon name="close" color="white" size={25} /></button>
          </div>
          <div className="w-full xl:hidden px-10 py-20">
            <div className="flex justify-between border border-gradient-dark rounded-md p-15">
              <input type="search" className="outline-none text-primary w-10/12" placeholder="Search"/>
              <button className="flex items-center outline-none"><Icon name="search" color="primary" size={18} /></button>
            </div>
          </div>
          <ul className="flex flex-col xl:flex-row xl:w-full xl:justify-center font-medium text-45 sm:text-18 xl:text-14 text-primary sm:text-white">
            <li className="py-15 px-20 xl:px-0 nav-link border-b border-gradient-dark sm:border-b-0"><Link href="/collections"><a className="relative xl:px-25 xl:py-10">Collections</a></Link></li>
            <li className="py-15 px-20 xl:px-0 nav-link border-b border-gradient-dark sm:border-b-0"><Link href="/about-us"><a className="relative xl:px-25 xl:py-10">About Us</a></Link></li>
            <li className="pt-20 pb-10 px-20 xl:px-0 nav-link hidden sm:block"><Link href="/opensea"><a className="relative xl:px-25 xl:py-10"><Icon name="search" color="white" size={18} /></a></Link></li>
            <li className="py-15 px-20 xl:px-0 nav-link border-b border-gradient-dark sm:border-b-0"><Link href="/opensea"><a className="relative xl:px-25 xl:py-10">Opensea</a></Link></li>
            <li className="py-15 px-20 xl:px-0 nav-link border-b border-gradient-dark sm:border-b-0"><Link href="/other"><a className="relative xl:px-25 xl:py-10">Other</a></Link></li>
          </ul>
        </div>
        <div className="hidden xl:flex px-20 xl:px-0">
          <button className="px-5 text-18 font-bold">Connect Wallet</button>
        </div>
      </div>
    </nav>
  </div>);
}
