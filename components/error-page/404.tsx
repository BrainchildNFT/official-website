import Link from 'next/link';
import Image from 'next/image';

export default function Error404() {
  return (<section className="w-screen h-screen">
    <div className="container mx-auto flex flex-col justify-center items-center h-full">
      <div className="py-30 md:py-40">
        <Link href="/" passHref><Image className="cursor-pointer" src="/assets/images/logo-green.svg" width={250} height={71} alt="Brainchild logo" /></Link>
      </div>
      <div className="py-0 md:py-30 xl:py-50">
        <h1 className="text-warning text-120 md:text-140 mt text-center leading-none">404</h1>
        <p className="text-warning text-18 text-center">Sorry, we can&apos;t find that page! Don&apos;t worry though, everything is STILL AWESOME!</p>
        <div className="flex flex-col md:flex-row justify-center mt-30 md:mt-60 w-full">
          <Link href="/" passHref><button className="btn btn-primary btn-lg mb-20 md:mb-0 w-full md:w-220">Go to Home Page</button></Link>
          <Link href="/kits" passHref><button className="btn btn-warning btn-lg md:ml-20 w-full md:w-220">Find Your Perfect Kit</button></Link>
        </div>
      </div>
      <p className="text-16 text-light-500 mt-30 md:mt-40 xl:mt-60 text-center">
        You can still contact us via <a className="text-primary" href="https://www.instagram.com/brainchild">Instagram</a>, by email at <a className="text-primary" href="mailto:ken@brainchild.com">ken@brainchild.com</a> or by phone at <a href="tel:123456789" className="text-primary">123 456 789</a>.
      </p>
      <div className="flex flex-col md:flex-row justify-between py-20 md:pb-40 md:pt-80 text-10 w-full">
        <p className="text-center">© 2021. Brainchild.com. All rights reserved.</p>
        <p className="text-center">Need help? Call <a href="tel:123456789">123 456 789</a></p>
      </div>
    </div>
  </section>);
}
