import Image from 'next/image';

export default function PerksAndUtility() {
  return (<>
    <div className="px-20 sm:px-80 py-50 sm:py-70 xl:py-120">
      <p className="p-10 text-danger text-16 font-medium">PERKS AND UTILITY</p>
      <div className="mt-10 flex flex-col xl:flex-row xl:flex-wrap">

        <div className="flex flex-col md:flex-row xl:flex-col xl:w-1/3">
          <div className="perk-and-utility-item-background border perk-and-utility-item-border relative h-500 m-20 overflow-hidden md:w-1/2 xl:w-auto">
            <div className="absolute top-30 right-30 z-30">
              <p className="text-40 text-primary font-Voyage">01</p>
            </div>
            <div className="pt-40 relative flex justify-center">
              <div className="flex justify-center z-20">
                <Image src="/assets/images/collections/gift-box-light.png" layout="intrinsic" width={195} height={260} alt="Light Gift Box" />
              </div>
              <div className="absolute bottom-0 px-10 z-10">
                <Image src="/assets/images/collections/multi-circle-dark.png" layout="intrinsic" width={375} height={135} alt="Dark Multi Circle" />
              </div>
            </div>
            <div className="p-30">
              <p className="text-40 text-primary font-Future text-center break-all">Perpetually Redeemable</p>
            </div>
          </div>
          <div className="p-10 m-20 mt-10 md:w-1/2 xl:w-auto">
            <p className="text-primary-50 leading-tight">Receive the physical version of your Ethclock at your doorstep. Three months later, redeem it again! Redeem, receive, repeat, forever!</p>
            <p className="mt-30 text-primary font-bold font-Subjectivity">COMING SOON!</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row xl:flex-col xl:w-1/3">
          <div className="perk-and-utility-item-background border perk-and-utility-item-border relative h-500 m-20 flex flex-col justify-between overflow-hidden md:w-1/2 xl:w-auto">
            <div className="absolute top-30 right-30 z-30">
              <p className="text-40 text-primary font-Voyage">02</p>
            </div>
            <div className="pt-80">
              <p className="text-40 text-primary font-Future text-center break-all">Gamified Enhancements</p>
            </div>
            <div className="pt-15 relative flex justify-center">
              <div className="flex justify-center px-10 z-20">
                <Image src="/assets/images/collections/up-arrow-with-dark-stars.png" layout="intrinsic" width={240} height={250} alt="Light Gift Box" />
              </div>
            </div>
          </div>
          <div className="p-10 m-20 mt-10 md:w-1/2 xl:w-auto">
            <p className="text-primary-50 leading-tight">Level up to unlock new designs and improve the rarity of your Ethclock... at your own risk! Look out for the frost giant and fiery dragon, or you may be blessed by a godsent angel. Who knows?</p>
            <p className="mt-30 text-primary font-bold font-Subjectivity">COMING SOON!</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row xl:flex-col xl:w-1/3">
          <div className="perk-and-utility-item-background border perk-and-utility-item-border relative h-500 m-20 overflow-hidden md:w-1/2 xl:w-auto">
            <div className="absolute top-30 right-30 z-30">
              <p className="text-40 text-primary font-Voyage">03</p>
            </div>
            <div className="relative flex justify-center">
              <div className="flex justify-center px-10 z-20">
                <Image src="/assets/images/collections/blue-windows-light.png" layout="intrinsic" width={250} height={280} alt="Light Gift Box" />
              </div>
            </div>
            <div className="p-30 pt-40">
              <p className="text-40 text-primary font-Future text-center break-all">Teleportable into crypto worlds</p>
            </div>
          </div>
          <div className="p-10 m-20 mt-10 md:w-1/2 xl:w-auto">
            <p className="text-primary-50 leading-tight">Explore the metaverse and never lose track of time with an Ethclock on your back... its party time!</p>
            <p className="mt-30 text-primary font-bold font-Subjectivity">COMING SOON!</p>
          </div>
        </div>
      </div>
    </div>
  </>);
}