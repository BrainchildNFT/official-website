import Link from 'next/link'
import Image from 'next/image'
import Icon from '../ui-kit/icon'

export function Footer() {
  return (
    <footer className="bg-black z-10 text-center lg:text-left text-light-400 py-100">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-4 text-18 mt-5">
          <div>
            <p className="text-14 font-Subjectivity font-bold text-white mb-20 mt-30 lg:mt-0 tracking-widest">
              COMPANY
            </p>
            <ul className="flex flex-col font-['Inter']">
              <li className="py-5">
                <Link href="/about-us">
                  <a>About Us</a>
                </Link>
              </li>
              <li className="py-5">
                <Link href="https://discord.gg/7S55rjvxm3">
                  <a target="_blank">We&apos;re Hiring</a>
                </Link>
              </li>
              <li className="py-5">
                <Link href="/#and-more">
                  <a>How It Works</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-14 font-Subjectivity font-bold text-white mb-20 mt-30 lg:mt-0 tracking-widest">
              ARTIST
            </p>
            <ul className="flex flex-col font-['Inter']">
              <li className="py-5">
                <Link href="/#collaborations">
                  <a>Collaborate</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-14 font-Subjectivity font-bold text-white mb-20 mt-30 lg:mt-0 tracking-widest">
              COMMUNITY
            </p>
            <ul className="flex flex-col items-center lg:items-start font-['Inter']">
              <li className="py-5">
                <Link href="https://discord.gg/7S55rjvxm3" passHref>
                  <a
                    className="flex items-center justify-center sm:justify-start"
                    target="_blank"
                  >
                    <Icon name="discord" color="white" size={18} />
                    <span className="ml-10">Discord</span>
                  </a>
                </Link>
              </li>
              <li className="py-5">
                <Link href="https://twitter.com/BrainchildNFT" passHref>
                  <a
                    className="flex items-center justify-center sm:justify-start"
                    target="_blank"
                  >
                    <Icon name="twitter" color="white" size={18} />
                    <span className="ml-10">Twitter</span>
                  </a>
                </Link>
              </li>
              <li className="py-5">
                <Link href="https://www.instagram.com/brainchildnft/" passHref>
                  <a
                    className="flex items-center justify-center sm:justify-start"
                    target="_blank"
                  >
                    <Icon name="instagram" color="white" size={18} />
                    <span className="ml-10">Instagram</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-14 font-Subjectivity font-bold text-white mb-20 mt-30 lg:mt-0 tracking-widest">
              RELEVENT LINKS
            </p>
            <ul className="flex flex-col font-['Inter']">
              <li className="py-5">
                <Link href="https://opensea.io">
                  <a target="_blank" rel="noreferrer">
                    Opensea
                  </a>
                </Link>
              </li>
              <li className="py-5">
                <Link href="https://docs.google.com/document/d/e/2PACX-1vSFQQYJ06nu371dWY_Yu9PgS4onGKnWCiTDjZ899f3z77ih3eoNkdnbJvmYK2uHvg/pub">
                  <a target="_blank" rel="noreferrer">
                    Whitepapaer
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:flex justify-center mt-100 leading-10">
          <Link href="/">
            <a className="flex items-center justify-center">
              <Image
                className="cursor-pointer"
                src="/assets/images/logo/logo-light-large.svg"
                width={201}
                height={63}
                alt="Brainchild logo"
              />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  )
}
