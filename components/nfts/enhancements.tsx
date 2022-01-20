import Image from 'next/image'
import ScrollContainer from 'react-indiana-drag-scroll'
import Icon from '../ui-kit/icon'
import { useState } from 'react';

export default function Enhancements() {
  const [openLevel, setOpenLevel] = useState(false);
  const [openEnvironment, setOpenEnvironment] = useState(false);
  const [openShine, setOpenShine] = useState(false);
  const [openEfficiency, setOpenEfficiency] = useState(false);
  const [openEnhancement, setOpenEnhancement] = useState(true);

  return (
    <>
      <div className="p-15 sm:p-40 lg:p-100">
        <p className="p-10 text-danger text-16 font-semibold">ENHANCEMENTS</p>
        <div className="flex flex-col md:flex-row mt-10">
          <div className="md:w-1/2">
            <p className="text-18 text-primary font-light p-10">
              As an owner of EthClock, you have full control over the destiny of
              your NFT. Set yourself apart and rise above the the others! Will
              you take the chance to upgrade it? Unlocking new looks and
              features while improving its rarity... that is if you succeed...{' '}
            </p>
          </div>
        </div>

        <div className="mt-40 sm:mt-100 flex flex-col md:flex-row justify-between items-center">
          <p
            onClick={() => setOpenEnhancement(!openEnhancement)}
            className="cursor-pointer p-10 text-40 text-primary text-center break-words"
            style={{ fontFamily: 'Future Classic' }}
          >
            Enhancement Outcomes
          </p>
          <div>
            <Icon name={openEnhancement ? 'down' : 'up'} color="#353637" size={18} />
          </div>
        </div>
        <div className={openEnhancement ? 'block' : 'hidden'}>
          <div className="mt-20 grid grid-cols-1 grid-rows-5 sm:grid-cols-2 sm:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 xxl:grid-cols-5 xxl:grid-rows-1">
            <div className="relative enhancement-item-background min-h-270 p-20 text-[#373839] flex-1 m-10">
              <p className="text-20 font-Subjectivity font-semibold">GOD-TEIR</p>
              <p className="font-16 mt-10 mb-30">
                Lady Luck smiles upon you, instantly enhanced to max level 10.
              </p>
              <div className="absolute bottom-0 right-0 -mb-10">
                <Image
                  src="/assets/images/landing-page/bg-god-tier.svg"
                  layout="intrinsic"
                  width="100"
                  height="100"
                  alt="God Tier"
                />
              </div>
            </div>
            <div className="relative enhancement-item-background min-h-270 p-20 text-[#373839] flex-1 m-10">
              <p className="text-20 font-Subjectivity font-semibold">ENHANCED</p>
              <p className="font-16 mt-10 mb-30">
                Blessed! Successfully enhanced to the next level.
              </p>
              <div className="absolute bottom-0 right-0 -mb-10">
                <Image
                  src="/assets/images/landing-page/bg-enhanced-item.svg"
                  layout="intrinsic"
                  width="100"
                  height="100"
                  alt="Enhanced Item"
                />
              </div>
            </div>
            <div className="relative enhancement-item-background min-h-270 p-20 text-[#373839] flex-1 m-10">
              <p className="text-20 font-Subjectivity font-semibold">FAILED</p>
              <p className="font-16 mt-10 mb-30">
                Darn! Took your chance and it failed, drops down by one level.
              </p>
              <div className="absolute bottom-0 right-0 -mb-10">
                <Image
                  src="/assets/images/landing-page/bg-failed-item.svg"
                  layout="intrinsic"
                  width="100"
                  height="100"
                  alt="Failed Item"
                />
              </div>
            </div>
            <div className="relative enhancement-item-background min-h-270 p-20 text-[#373839] flex-1 m-10">
              <p className="text-20 font-Subjectivity font-semibold">FROZEN</p>
              <p className="font-16 mt-10 mb-30">
                Frost giants came knocking and you weren`&apos;t prepared. Forever stuck
                at current level.
              </p>
              <div className="absolute bottom-0 right-0 -mb-10">
                <Image
                  src="/assets/images/landing-page/bg-frozen-item.svg"
                  layout="intrinsic"
                  width="100"
                  height="100"
                  alt="Frozen Item"
                />
              </div>
            </div>
            <div className="relative enhancement-item-background min-h-270 p-20 text-[#373839] flex-1 m-10">
              <p className="text-20 font-Subjectivity font-semibold">CHARRED</p>
              <p className="font-16 mt-10 mb-30">
                Burst into a ball of flame! Leaving char and soot behind, unable
                to redeem or enhance. Grants airdrops and whitelist to the future.
              </p>
              <div className="absolute bottom-0 right-0 -mb-10">
                <Image
                  src="/assets/images/landing-page/bg-charred-item.svg"
                  layout="intrinsic"
                  width="100"
                  height="100"
                  alt="Charred Item"
                />
              </div>
            </div>
          </div>
          <div className="p-10 mt-20 text-[#353637]">
            <div className=" w-full lg:w-1/2">
              <p className="text-[24px] font-semibold">
                But there&apos;s a chance?...
              </p>
              <p className="text-[18px]">
                Here&apos;s the probability of each of these outcomes at different
                levels.
              </p>
            </div>
          </div>
          <ScrollContainer vertical={false} horizontal={true} className="w-full">
            <div className="w-full min-w-1000 md:min-w-0">
              <Image
                src="/assets/images/landing-page/outcome-table.svg"
                layout="responsive"
                width="1080"
                height="560"
                alt="Outcome Table"
              />
            </div>
          </ScrollContainer>
          <div className="mt-40 sm:mt-100 block sm:flex">
            <div className="w-full sm:w-500 md:sticky md:top-100 self-start flex justify-center">
              <Image
                src="/assets/images/nfts/ethclock01.png"
                layout="intrinsic"
                width="440"
                height="650"
                className="rounded-[30px]"
                alt="Eth Clock"
              />
            </div>
            <div className="w-full ml-0 sm:ml-50 mt-50 sm:mt-0">
              <div>
                <div className="flex items-center text-[#353637]">
                  <div>
                    <Image
                      src="/assets/images/nfts/icon-level.svg"
                      layout="intrinsic"
                      width="20"
                      height="20"
                      alt="Icon Level"
                    />
                  </div>
                  <div className="font-Subjectivity font-semibold text-[18px] ml-10">
                    Level
                  </div>
                  <div
                    className="w-full h-[1px] mx-10"
                    style={{
                      background:
                        'linear-gradient(270.16deg, rgba(0, 0, 0, 0.4) 1.04%, rgba(0, 0, 0, 0) 48.58%, rgba(0, 0, 0, 0.4) 100.31%)',
                    }}
                  />
                  <span onClick={() => setOpenLevel(!openLevel)} className="flex items-center cursor-pointer"><Icon name={openLevel ? 'minus_round' : 'plus_round'} color="#363738" size={18} /></span>
                </div>
                <div className={"border-gradient-dark-linner mr-10 " + (openLevel ? "border-r" : "")}>
                  <div className={"text-[#353637] p-10 text-16 " + (openLevel ? "block" : "hidden")}>
                    Upgrade your EthClock to unlock new designs, environment
                    animations and increase rarity. Beware of the risk with
                    different enhancement outcomes! Improved designs at every level.
                    Unlock environment animation at level 4. Significant upgrade at
                    level 7 & 10.
                  </div>
                  <div className="flex mt-10 flex-wrap text-[#353637] text-16 font-medium">
                    <div className="level-item w-50 h-40 justify-center items-center flex m-5">
                      1
                    </div>
                    <div className="w-50 h-40 justify-center items-center flex m-5">
                      2
                    </div>
                    <div className="w-50 h-40 justify-center items-center flex m-5">
                      3
                    </div>
                    <div className="w-50 h-40 justify-center items-center flex m-5">
                      4
                    </div>
                    <div className="w-50 h-40 justify-center items-center flex m-5">
                      5
                    </div>
                    <div className="w-50 h-40 justify-center items-center flex m-5">
                      6
                    </div>
                    <div className="w-50 h-40 justify-center items-center flex m-5">
                      7
                    </div>
                    <div className="w-50 h-40 justify-center items-center flex m-5">
                      8
                    </div>
                    <div className="w-50 h-40 justify-center items-center flex m-5">
                      9
                    </div>
                    <div className="w-50 h-40 justify-center items-center flex m-5">
                      10
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center text-[#353637]">
                  <div>
                    <Image
                      src="/assets/images/nfts/icon-environment.svg"
                      layout="intrinsic"
                      width="20"
                      height="20"
                      alt="Icon Environment"
                    />
                  </div>
                  <div className="font-Subjectivity font-semibold text-[18px] ml-10">
                    Environment
                  </div>
                  <div
                    className="w-full h-[1px] mx-10"
                    style={{
                      background:
                        'linear-gradient(270.16deg, rgba(0, 0, 0, 0.4) 1.04%, rgba(0, 0, 0, 0) 48.58%, rgba(0, 0, 0, 0.4) 100.31%)',
                    }}
                  />
                  <span onClick={() => setOpenEnvironment(!openEnvironment)} className="flex items-center cursor-pointer"><Icon name={openEnvironment ? 'minus_round' : 'plus_round'} color="#363738" size={18} /></span>
                </div>
                <div className={"border-gradient-dark-linner mr-10 " + (openEnvironment ? "border-r" : "")}>
                  <div className={"text-[#353637] p-10 text-16 " + (openEnvironment ? "block" : "hidden")}>
                    Where did your EthClock come from in the metaverse?
                  </div>
                  <div className={"grid grid-cols-2 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 gap-10 ml-10 mb-10 mr-30 " + (openEnvironment ? "block" : "hidden")}>
                    <div className="bg-[url('/assets/images/nfts/enhancements/question-mark-with-stars.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item active p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">4%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-[#363738]">
                          Smart Contact
                        </div>
                      </div>
                    </div>
                    <div className="bg-[url('/assets/images/nfts/enhancements/question-mark-with-stars.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">16%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-[#363738]">
                          Renegade Mode
                        </div>
                      </div>
                    </div>
                    <div className="bg-[url('/assets/images/nfts/enhancements/question-mark-with-stars.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">8%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-[#363738] break-words">
                          Near Future Tribe
                        </div>
                      </div>
                    </div>
                    <div className="bg-[url('/assets/images/nfts/enhancements/question-mark-with-stars.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">32%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-[#363738]">
                          Depths of Defi
                        </div>
                      </div>
                    </div>
                    <div className="bg-[url('/assets/images/nfts/enhancements/blue-space.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">40%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-white">
                          Gas Belt
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className={"flex mt-10 flex-wrap text-[#353637] text-16 font-medium " + (openEnvironment ? "hidden" : "block")}>
                    <div className="level-item p-10 h-40 justify-center items-center flex m-5">
                      Smart Contract <span className="ml-10 opacity-50">4%</span>
                    </div>
                    <div className="p-10 h-40 justify-center items-center flex m-5">
                      Renegade Mode <span className="ml-10 opacity-50">16%</span>
                    </div>
                    <div className="p-10 h-40 justify-center items-center flex m-5">
                      Near Future Tribe <span className="ml-10 opacity-50">8%</span>
                    </div>
                    <div className="p-10 h-40 justify-center items-center flex m-5">
                      Depths of Defi <span className="ml-10 opacity-50">32%</span>
                    </div>
                    <div className="p-10 h-40 justify-center items-center flex m-5">
                      Gas Belt <span className="ml-10 opacity-50">40%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center text-[#353637]">
                  <div>
                    <Image
                      src="/assets/images/nfts/icon-shine.svg"
                      layout="intrinsic"
                      width="20"
                      height="20"
                      alt="Icon Shine"
                    />
                  </div>
                  <div className="font-Subjectivity font-semibold text-[18px] ml-10">
                    shine
                  </div>
                  <div
                    className="w-full h-[1px] mx-10"
                    style={{
                      background:
                        'linear-gradient(270.16deg, rgba(0, 0, 0, 0.4) 1.04%, rgba(0, 0, 0, 0) 48.58%, rgba(0, 0, 0, 0.4) 100.31%)',
                    }}
                  />
                  <span onClick={() => setOpenShine(!openShine)} className="flex items-center cursor-pointer"><Icon name={openShine ? 'minus_round' : 'plus_round'} color="#363738" size={18} /></span>
                </div>
                <div className={"border-gradient-dark-linner mr-10 " + (openShine ? "border-r" : "")}>
                  <div className={"text-[#353637] p-10 text-16 " + (openShine ? "block" : "hidden")}>
                    Semper mattis eget venenatis, vitae, viverra cras suspendisse. Elementum egestas morbi feugiat morbi ultrices nulla pellentesque.
                  </div>
                  <div className={"grid grid-cols-2 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 gap-10 ml-10 mb-10 mr-30 " + (openShine ? "block" : "hidden")}>
                    <div className="bg-[url('/assets/images/nfts/enhancements/shine-marble.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item active p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">10%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-white">
                          Marble
                        </div>
                      </div>
                    </div>

                    <div className="bg-[url('/assets/images/nfts/enhancements/shine-aluminium.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">15%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-white">
                          Aluminium
                        </div>
                      </div>
                    </div>

                    <div className="bg-[url('/assets/images/nfts/enhancements/shine-patina.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">20%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-white break-words">
                          Patina
                        </div>
                      </div>
                    </div>

                    <div className="bg-[url('/assets/images/nfts/enhancements/shine-timber.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">25%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-white">
                          Timber
                        </div>
                      </div>
                    </div>

                    <div className="bg-[url('/assets/images/nfts/enhancements/shine-acrylic.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">30%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-white">
                          Acrylic
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"flex mt-10 flex-wrap text-[#353637] text-16 font-medium " + (openShine ? "hidden" : "block")}>
                    <div className="level-item p-10 h-40 justify-center items-center flex m-5">
                      Marble <span className="ml-10 opacity-50">10%</span>
                    </div>
                    <div className="p-10 h-40 justify-center items-center flex m-5">
                      Steel <span className="ml-10 opacity-50">15%</span>
                    </div>
                    <div className="p-10 h-40 justify-center items-center flex m-5">
                      Patina <span className="ml-10 opacity-50">20%</span>
                    </div>
                    <div className="p-10 h-40 justify-center items-center flex m-5">
                      Timber <span className="ml-10 opacity-50">25%</span>
                    </div>
                    <div className="p-10 h-40 justify-center items-center flex m-5">
                      Acrylic <span className="ml-10 opacity-50">30%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center text-[#353637]">
                  <div>
                    <Image
                      src="/assets/images/nfts/icon-efficiency.svg"
                      layout="intrinsic"
                      width="20"
                      height="20"
                      alt="Icon Efficiency"
                    />
                  </div>
                  <div className="font-Subjectivity font-semibold text-[18px] ml-10">
                    Efficiency
                  </div>
                  <div
                    className="w-full h-[1px] mx-10"
                    style={{
                      background:
                        'linear-gradient(270.16deg, rgba(0, 0, 0, 0.4) 1.04%, rgba(0, 0, 0, 0) 48.58%, rgba(0, 0, 0, 0.4) 100.31%)',
                    }}
                  />
                  <span onClick={() => setOpenEfficiency(!openEfficiency)} className="flex items-center cursor-pointer"><Icon name={openEfficiency ? 'minus_round' : 'plus_round'} color="#363738" size={18} /></span>
                </div>

                <div className="mr-10">
                  <div className={"text-[#353637] p-10 text-16 " + (openEfficiency ? "block" : "hidden")}>
                    Semper mattis eget venenatis, vitae, viverra cras suspendisse. Elementum egestas morbi feugiat morbi ultrices nulla pellentesque.
                  </div>
                  <div className={"grid grid-cols-2 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 gap-10 ml-10 mb-10 mr-30 " + (openEfficiency ? "block" : "hidden")}>
                    <div className="bg-[url('/assets/images/nfts/enhancements/diamond-1.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item active p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">15%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-[#363738]">
                          Flawed
                        </div>
                      </div>
                    </div>
                    <div className="bg-[url('/assets/images/nfts/enhancements/diamond-2.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">20%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-[#363738]">
                          Raw
                        </div>
                      </div>
                    </div>
                    <div className="bg-[url('/assets/images/nfts/enhancements/diamond-3.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">30%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-[#363738] break-words">
                          Polished
                        </div>
                      </div>
                    </div>
                    <div className="bg-[url('/assets/images/nfts/enhancements/diamond-4.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">40%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-[#363738]">
                          Brilliant
                        </div>
                      </div>
                    </div>
                    <div className="bg-[url('/assets/images/nfts/enhancements/diamond-5.png')] bg-cover bg-no-repeat bg-center">
                      <div className="relative w-full h-200 expanded-item p-10 font-semibold">
                        <div className="absolute text-24 top-10 right-10">15%</div>
                        <div className="absolute text-16 bottom-10 left-10 text-[#363738]">
                          Pristine
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"flex mt-10 flex-wrap text-[#353637] text-16 font-medium " + (openEfficiency ? "hidden" : "block")}>
                    <div className="level-item p-10 h-40 justify-center items-center flex m-5">
                      Flawed <span className="ml-10 opacity-50">15%</span>
                    </div>
                    <div className="p-10 h-40 justify-center items-center flex m-5">
                      Raw <span className="ml-10 opacity-50">20%</span>
                    </div>
                    <div className="p-10 h-40 justify-center items-center flex m-5">
                      Polished <span className="ml-10 opacity-50">30%</span>
                    </div>
                    <div className="p-10 h-40 justify-center items-center flex m-5">
                      Brilliant <span className="ml-10 opacity-50">40%</span>
                    </div>
                    <div className="p-10 h-40 justify-center items-center flex m-5">
                      Pristine <span className="ml-10 opacity-50">15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
