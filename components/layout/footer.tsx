import Link from 'next/link';
import Image from 'next/image';
import Icon from '../ui-kit/icon';

export function Footer() {
  return (<footer className="bg-black z-10 text-center lg:text-left text-light-400 py-100">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-5 text-18 mt-5">
        <div>
          <p className="text-14 font-Subjectivity font-bold text-white mb-20 mt-30 lg:mt-0 tracking-widest">COMPANY</p>
          <ul className="flex flex-col">
            <li className="py-10"><Link href="/about-us"><a>About Us</a></Link></li>
            <li className="py-10"><Link href="/collections"><a>We&apos;re Hiring</a></Link></li>
            <li className="py-10"><Link href="/about-us"><a>How It Works</a></Link></li>
          </ul>
        </div>
        <div>
          <p className="text-14 font-Subjectivity font-bold text-white mb-20 mt-30 lg:mt-0 tracking-widest">ARTIST</p>
          <ul className="flex flex-col">
            <li className="py-10"><Link href="/about-us"><a>Collaborate</a></Link></li>
            <li className="py-10"><Link href="/collections"><a>How It Works</a></Link></li>
          </ul>
        </div>
        <div>
          <p className="text-14 font-Subjectivity font-bold text-white mb-20 mt-30 lg:mt-0 tracking-widest">COMMUNITY</p>
          <ul className="flex flex-col items-center lg:items-start">
            <li className="py-10"><Link href="https://www.discord.com/brainchild" passHref><a className="flex items-center justify-center sm:justify-start"><Icon name="discord" color="white" size={18} /><span className="ml-10">Discord</span></a></Link></li>
            <li className="py-10"><Link href="https://www.telegram.com/brainchild" passHref><a className="flex items-center justify-center sm:justify-start"><Icon name="telegram" color="white" size={18} /><span className="ml-10">Telegram</span></a></Link></li>
            <li className="py-10"><Link href="https://www.reddit.com/brainchild" passHref><a className="flex items-center justify-center sm:justify-start"><Icon name="reddit" color="white" size={18} /><span className="ml-10">Reddit</span></a></Link></li>
            <li className="py-10"><Link href="https://www.instagram.com/brainchild" passHref><a className="flex items-center justify-center sm:justify-start"><Icon name="instagram" color="white" size={18} /><span className="ml-10">Instagram</span></a></Link></li>
            <li className="py-10"><Link href="https://www.twitter.com/brainchild" passHref><a className="flex items-center justify-center sm:justify-start"><Icon name="twitter" color="white" size={18} /><span className="ml-10">Twitter</span></a></Link></li>
          </ul>
        </div>
        <div>
          <p className="text-14 font-Subjectivity font-bold text-white mb-20 mt-30 lg:mt-0 tracking-widest">RELEVENT LINKS</p>
          <ul className="flex flex-col">
            <li className="py-10"><Link href="/about-us"><a>Opensea</a></Link></li>
            <li className="py-10"><Link href="/collections"><a>Whitepapaer</a></Link></li>
            <li className="py-10"><Link href="/collections"><a>Docs</a></Link></li>
          </ul>
        </div>
      </div>
      <div className="lg:flex justify-center mt-100 leading-10">
        <Link href="/"><a className="flex items-center justify-center"><Image className="cursor-pointer" src="/assets/images/logo/logo-light-large.svg" width={201} height={63} alt="Brainchild logo" /></a></Link>
      </div>
    </div>
  </footer>);
}
