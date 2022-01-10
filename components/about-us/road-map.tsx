import Image from 'next/image';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import disableScroll from 'disable-scroll';

export default function RoadMap() {
  const [currentRoadMap, setCurrentRoadMap] = useState(0);
  const [marginTop, setMarginTop] = useState(0);
  const [childrenHeights, setChildrenHeights] = useState<number[]>([]);

  const roadMapContentRef: MutableRefObject<any> = useRef();
  const roadMapPeriodNames = [
    {
      year: 2021,
      text: 'Q4',
      name: 'NOTHINGNESS',
    },
    {
      year: 2022,
      text: 'Q1',
      name: 'Big Bang',
    },
    {
      year: 2022,
      text: 'Q2',
      name: 'Expansion',
    },
    {
      year: 2022,
      text: 'Q3',
      name: 'BEYOND',
    },
  ];

  const onMouseWheel = ($event: any) => {
    const newMarginTop = marginTop + $event.deltaY;
    if (newMarginTop >= 0 && newMarginTop <= (roadMapContentRef.current.clientHeight - 400)) {
      let heightSum = 0;
      for (let index = 0; index < childrenHeights.length; index ++) {
        if (newMarginTop > heightSum) {
          setCurrentRoadMap(index);
        }
        heightSum += childrenHeights[index];
      }
      disableScroll.on();
      setMarginTop(newMarginTop);
    } else {
      disableScroll.off();
    }
  }

  const onMouseLeave = () => {
    disableScroll.off()
  }

  const roadMapPeriodClicked = (index: number) => {
    setCurrentRoadMap(index);
    let heightSum = 0;
    for (let i = 0; i < index; i ++) {
      heightSum += childrenHeights[i];
    }
    setMarginTop(heightSum);
  }

  useEffect(() => {
    const tmpChildrenHeight: any[] = Array.from(roadMapContentRef.current.children).map((item: any) => item.clientHeight);
    setChildrenHeights(tmpChildrenHeight);
  }, [])

  return (<>
    <div className="flex flex-row" onWheel={onMouseWheel} onMouseLeave={onMouseLeave}>
      <div className="relative lg:w-1/2 flex flex-col">
        <div className="grow pr-50">
          <div className="text-white h-200 relative">
            <p className="text-22 opacity-30 mb-10">ROADMAP</p>
            {roadMapPeriodNames.map((item, index) => <p key={index} className={'absolute text-60 lg:text-80 opacity-90 font-Voyage tracking-tighter break-all mb-60 transition-all duration-500 ease-in-out ' + (index === currentRoadMap ? 'opacity-100' : 'opacity-0')}>{item.name}</p>)}
          </div>
          <div className="h-500 overflow-hidden">
            <div className="text-white transition-all duration-500" ref={roadMapContentRef} style={{ marginTop: '-' + marginTop + 'px' }}>
              <div>
                <ul className="list-disc pl-30">
                  <li>
                    Project Inception
                    <p className="text-17 opacity-50">From the depth of void sparks an idea. A brainchild that turned into an obsession for innovation in the realm of NFT.</p>
                  </li>
                  <li className="mb-40">
                    Smart Contract Development
                    <p className="text-17 opacity-50">Link to github</p>
                  </li>
                  <li className="mb-40">
                    Teaser Website release
                    <div className="mt-10">
                      <Image src="/assets/images/about-us/brainchild-website-header.png" layout="intrinsic" width={531} height={270} alt="Brainchild Website Header" />
                    </div>
                  </li>
                  <li className="mb-40">
                    First Artist Collaboration
                    <div className="flex">
                      <div className="flex items-center mt-10 p-25 bg-white-10">
                        <div className="pr-10">
                          <Image src="/assets/images/about-us/star-in-rhombus.png" layout="intrinsic" width={27} height={30} alt="Star In Square" />
                        </div>
                        <div>
                          <p className="text-14 opacity-60">COLLECTION</p>
                          <p className="text-24">ethereum clock</p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="list-disc pl-30">
                  <li className="mb-40">
                    Official Website Launch
                    <div className="mt-10">
                      <Image src="/assets/images/about-us/offical-website-header.png" layout="intrinsic" width={588} height={328} alt="Official Website Header" />
                    </div>
                  </li>
                  <li className="mb-40">
                    Enhancement Feature
                    <div className="flex">
                      <div className="w-1/2">
                        <p className="text-17 opacity-50">Allowing users upgrade their NFT to unlock designs and improve rarity. Link to enhancement page</p>
                      </div>
                      <div className="w-1/2">
                        <Image src="/assets/images/about-us/up-arrow-with-light-stars.png" layout="intrinsic" width={273} height={210} alt="Up Arrow With Stars" />
                      </div>
                    </div>
                  </li>
                  <li className="mb-40">
                    Smart Contract Audit
                  </li>
                </ul>
              </div>
              <div>
                <ul className="list-disc pl-30">
                  <li className="mb-40">
                    <div className="flex">
                      <div className="w-1/2">
                        <p>Redeem Feature</p>
                        <p className="text-17 opacity-50">Making our NFTs perpetually redeemable, manifesting in the physical world (to your doorstep).</p>
                      </div>
                      <div className="w-1/2 flex justify-center relative">
                        <div className="z-10">
                          <Image src="/assets/images/about-us/gift-box-dark.png" layout="intrinsic" width={195} height={259} alt="Gift Box" />
                        </div>
                        <div className="absolute bottom-0">
                          <Image src="/assets/images/about-us/multi-circle-light.png" layout="intrinsic" width={375} height={135} alt="Multi Circle" />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-40">
                    Brainchild Republic: Voting and Governance
                    <p className="text-17 opacity-50">Establishing Brainchild Republic for NFT owners to participate, vote and govern as citizens.</p>
                  </li>
                  <li className="mb-40">
                    Establishing partnerships for real-world benefits
                  </li>
                </ul>
              </div>
              <div>
                <ul className="list-disc pl-30">
                  <li className="mb-40">
                    Future collaboration with Artists and Luxury Brands
                    <p className="text-17 opacity-50">Birthing adventrous projects by collaborating with exquisite artists and brands to offer innovative ownership experiences.</p>
                  </li>
                  <li className="mb-40">
                    <div className="flex">
                      <div className="w-1/2">
                        Metaverse utility
                        <p className="text-17 opacity-50">Extending our NFTs to the rest of the metaverse, allowing integration of your assets into digital reality on popular metaverses.</p>
                      </div>
                      <div className="w-1/2 flex justify-center">
                        <Image src="/assets/images/about-us/blue-windows.png" layout="intrinsic" width={200} height={280} alt="Blue Windows" />
                      </div>
                    </div>
                  </li>
                  <li>Defi Utility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-40 lg:right-0 h-full">
          <div className="road-map-period-border text-white h-full flex flex-col justify-between py-100" style={{ width: '1px'}}>
            {roadMapPeriodNames.map((item, index) => <div key={index} onClick={() => roadMapPeriodClicked(index)} className={'flex flex-col cursor-pointer items-center justify-center border rounded-full ' + (index == currentRoadMap ? '-ml-40 lg:-ml-10 bg-white w-80 h-80 lg:w-20 lg:h-20' : '-ml-5 opacity-40 w-10 h-10')}>
              {index == currentRoadMap && <span className="lg:hidden text-30 text-primary leading-none font-Voyage">{roadMapPeriodNames[currentRoadMap].text}</span>}
              {index == currentRoadMap && <span className="lg:hidden text-14 font-bold text-primary">{roadMapPeriodNames[currentRoadMap].year}</span>}
            </div>)}
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 text-white items-end justify-end">
        {roadMapPeriodNames.map((item, index) => <div key={index} className={'absolute transition-all duration-500 ease-in-out ' + (currentRoadMap === index ? 'opacity-100' : 'opacity-0')}>
          <span className="text-30 mr-10 opacity-30">{roadMapPeriodNames[index].year}</span>
          <span className="text-300 leading-none font-Voyage road-map-letter-background">{roadMapPeriodNames[index].text}</span>
        </div>)}
      </div>
    </div>
  </>);
}
