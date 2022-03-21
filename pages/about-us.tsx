import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { monthNames, projectSchedule, TimeLeft } from '../core/data/base';
import { Layout } from '../components/layout/layout';
import { RaffleState } from '../core/data/landing';
import Icon from '../components/ui-kit/icon';
import RoadMap from '../components/about-us/road-map';

export default function AboutUs() {
  const [isTop, setIsTop] = useState(true);
  const [raffleState, setRaffleState] = useState(RaffleState.Waiting);
  const [stateBarBackground, setStateBarBackground] = useState('bg-danger');
  const [raffleStartTimeLeft, setRaffleStartTimeLeft] = useState<TimeLeft>({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [raffleEndTimeLeft, setRaffleEndTimeLeft] = useState<TimeLeft>({days: 0, hours: 0, minutes: 0, seconds: 0});

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    }
  };

  useEffect(() => {
    switch (raffleState) {
      case RaffleState.Waiting:
        setStateBarBackground('bg-danger text-white');
        break;
      case RaffleState.Live:
        setStateBarBackground('bg-success text-white');
        break;
      case RaffleState.Ended:
        setStateBarBackground('light-background-image text-primary');
        break;
      default:
        setStateBarBackground('bg-danger text-white');
    }
  }, [raffleState]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const calculateTimeLeft = (flag: number): TimeLeft => {
    let difference =
      +new Date(Date.UTC(projectSchedule.wYear, projectSchedule.wMonth - 1, projectSchedule.wDay + flag, projectSchedule.wHour, projectSchedule.wMin, projectSchedule.wSec)) - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const updateRaffleState = () => {
    let differenceFromRaffleStart =
      +new Date(Date.UTC(projectSchedule.wYear, projectSchedule.wMonth - 1, projectSchedule.wDay, projectSchedule.wHour, projectSchedule.wMin, projectSchedule.wSec)) - +new Date();
    let differenceFromRaffleEnd =
      +new Date(Date.UTC(projectSchedule.endYear, projectSchedule.endMonth - 1, projectSchedule.endDay, projectSchedule.endHour, projectSchedule.endMin, projectSchedule.endSec)) - +new Date();

    if (differenceFromRaffleStart > 0) setRaffleState(RaffleState.Waiting);
    if (differenceFromRaffleStart < 1) setRaffleState(RaffleState.Live);
    if (differenceFromRaffleEnd < 1) setRaffleState(RaffleState.Ended);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRaffleStartTimeLeft(calculateTimeLeft(0));
      setRaffleEndTimeLeft(calculateTimeLeft(1));
      updateRaffleState();
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Brainchild: About Us</title>
        <meta
          name="description"
          content="We collaborate with artists, design studios & brands to provide experimental interactions and novel experience around product ownership enabled by blockchain."
        />
      </Head>
      <Layout>
        <div className="dark-background-image" role="img" aria-label="Gradient background Image">
          {/*Pushing the boundaries of NFTs*/}
          <section
            className="container mx-auto pt-35 sm:pt-105 lg:pt-145 pb-110 sm:pb-195 lg:pb-305 flex flex-col items-center">
            <h1 className="font-Future text-white text-center opacity-90 text-60 sm:text-100 lg:text-130">
              Pushing the
              <br className="sm:hidden"/> boundaries
              <br className="sm:hidden"/> of NFTs
            </h1>
            <div className="-mt-150 -mb-100">
              <Image
                src="/assets/images/landing-page/multi-polygon-light.png"
                layout="intrinsic"
                width={450}
                height={450}
                alt="Multi Polygon"
              />
            </div>
            <p className="text-white sm:max-w-420 mb-50">
              What comes to mind when you hear NFTs? Is it hundred different
              variations of an ape, An avatar or do you think of an art? Are
              they digital game cards? Did your imagination transcend the
              cryptoverse?
            </p>
            <p className="text-white sm:max-w-420 text-right">
              NFTs are just at the beginning of their spring. PFPs and avatars
              are the early sprouts. There’s so much more that can be acheived,
              we at brainchildNFT aim to bring that potential to fruition.
            </p>
          </section>

          <section className={isTop ? '' : 'hidden'}>
            <div
              className={
                'absolute bottom-0 lg:h-50 w-full bg-danger flex flex-col lg:flex-row items-center justify-between px-20 sm:px-40 py-10 sm:py-0 ' +
                stateBarBackground
              }
              role="img"
              aria-label="Gradient background Image"
            >
              {raffleState === RaffleState.Waiting && (
                <p className="font-medium text-center">
                  {projectSchedule.stateStr} begins
                  on {projectSchedule.wDay + ' ' + monthNames[projectSchedule.wMonth - 1] + ', ' + projectSchedule.wYear} at
                  00:00 AM UTC
                </p>
              )}
              {raffleState === RaffleState.Live && (
                <p className="font-medium text-center">
                  {projectSchedule.stateStr} Results{' '}
                  <span className="text-30 font-bold">LIVE NOW!</span> end on
                  {projectSchedule.endDay + ' ' + monthNames[projectSchedule.endMonth - 1] + ', ' + projectSchedule.endYear} at
                  00:00 AM UTC
                </p>
              )}
              {raffleState === RaffleState.Ended && (
                <p className="font-medium text-center">
                  Raffle Results{' '}
                  <span className="text-30 font-bold">LIVE NOW!</span>
                </p>
              )}

              {raffleState === RaffleState.Waiting && (
                <p className="font-medium text-center">
                  <span className="text-30 font-bold">
                      {`${
                        raffleStartTimeLeft.days < 10
                          ? '0' + raffleStartTimeLeft.days
                          : raffleStartTimeLeft.days
                      }:${
                        raffleStartTimeLeft.hours < 10
                          ? '0' + raffleStartTimeLeft.hours
                          : raffleStartTimeLeft.hours
                      }:${
                        raffleStartTimeLeft.minutes < 10
                          ? '0' + raffleStartTimeLeft.minutes
                          : raffleStartTimeLeft.minutes
                      }:${
                        raffleStartTimeLeft.seconds < 10
                          ? '0' + raffleStartTimeLeft.seconds
                          : raffleStartTimeLeft.seconds
                      }`}
                  </span>{' '}
                  Left
                </p>
              )}

              {raffleState === RaffleState.Live && (
                <p className="font-medium text-center">
                  <span className="text-30 font-bold">
                      {`${
                        raffleEndTimeLeft.days < 10
                          ? '0' + raffleEndTimeLeft.days
                          : raffleEndTimeLeft.days
                      }:${
                        raffleEndTimeLeft.hours < 10
                          ? '0' + raffleEndTimeLeft.hours
                          : raffleEndTimeLeft.hours
                      }:${
                        raffleEndTimeLeft.minutes < 10
                          ? '0' + raffleEndTimeLeft.minutes
                          : raffleEndTimeLeft.minutes
                      }:${
                        raffleEndTimeLeft.seconds < 10
                          ? '0' + raffleEndTimeLeft.seconds
                          : raffleEndTimeLeft.seconds
                      }`}{' '}
                  </span>
                  Left
                </p>
              )}
              {raffleState === RaffleState.Ended && (
                <p className="font-medium text-center">
                  Connect wallet to check if you’re whitelisted
                </p>
              )}
            </div>
          </section>

          {/*RoadMap for New Year*/}
          <section className="container mx-auto py-150">
            <RoadMap/>
          </section>

          <section className="relative about-us-members-background" role="img" aria-label="Gradient background Image">
            <div className="px-40 lg:px-100 xl:px-300 pb-100 lg:pb-120 xl:pb-150">
              <h1
                className="font-Future text-50 lg:text-90 xl:text-100 text-white opacity-90 mt-30 lg:mt-100 xl:mt-300 text-center">
                Meet <span className="text-60">the</span> Team
              </h1>

              <p className="font-Future text-50 lg:text-90 xl:text-100 text-white opacity-90 mt-30 lg:mt-150 xl:mt-300">
                KENSAN
              </p>
              <p className="text-white opacity-60">
                Confused kid in a confusing world
              </p>
              <p className="flex items-center font-Subjectivity text-white opacity-90">
                <Icon className="mr-10" name="mail" color="white" size={20}/>
                kensan42069@gmail.com
              </p>
              <p className="flex items-center font-Subjectivity text-white opacity-90">
                <Icon
                  className="mr-10"
                  name="twitterOutline"
                  color="white"
                  size={20}
                />
                @kensan42069
              </p>

              <p
                className="font-Future text-50 lg:text-90 xl:text-100 text-white text-right opacity-90 mt-30 lg:mt-150 xl:mt-300">
                PIGUBAOZA
              </p>
              <div className="flex flex-col items-end">
                <p className="text-white text-right opacity-60 max-w-550">
                  Stringing up the brainchildren
                </p>
                <p className="flex items-center font-Subjectivity text-white tet-right opacity-90">
                  <Icon
                    className="mr-10"
                    name="twitterOutline"
                    color="white"
                    size={20}
                  />
                  @pigubaoza
                </p>
              </div>

              <p className="font-Future text-50 lg:text-90 xl:text-100 text-white opacity-90 mt-30 lg:mt-100 xl:mt-300">
                GARDEBO
              </p>
              <p className="text-white opacity-60">
                Dwelling in the chaos, Addicted to complexity.
              </p>
              <p className="text-white opacity-60">Also, pushing p i x e l s</p>

              <p
                className="font-Future text-50 lg:text-90 xl:text-100 text-white text-right opacity-90 mt-30 lg:mt-150 xl:mt-300">
                and more...
              </p>
              <div className="flex justify-end">
                <p className="text-white text-right opacity-60 max-w-550">
                  Team of developer with experience spanning across 12 projects.
                  Marketing aficionados who flips pancakes and sushi. Selfless
                  contributors. Owners. You.
                </p>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
