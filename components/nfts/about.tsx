import Image from 'next/image';

export default function About() {
  return (<>
    <div className="flex flex-col xl:flex-row p-40 lg:p-100">
      <div className="xl:w-1/2 xl:pr-45 pb-50">
        <p className="text-60 font-Future leading-tight">A Timeless Tribute to Ethereum</p>
        <p className="mt-40 font-light leading-tight">9 years after Vitalik’s inception of Ethereum in 2013 and 7 years after Genesis Block One on 30th July 2015. A tribute collection matching Genesis Block One’s initial gas limit. Ethereum ushered <span className="cursor-pointer text-white-50">...read more</span></p>
        <p className="mt-40 p-20 font-medium border-0 border-b border-gradient-light">500 Mints</p>
        <p className="mt-10 p-20 font-medium border-0 border-b border-gradient-light">Level 1-10 Enhancements available</p>
        <p className="mt-10 p-20 font-medium border-0 border-b border-gradient-light">Mint Price - 0.12 ETH</p>
      </div>
      <div className="xl:w-1/2 xl:pl-45 flex items-end justify-center">
        <Image
          src="/assets/images/landing-page/eth-clock-design.png"
          layout="intrinsic"
          width={505}
          height={564}
          alt="Ethereum Clock Design"
        />
      </div>
    </div>
  </>);
}