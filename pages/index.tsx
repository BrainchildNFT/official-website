import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import EthClock from '../components/landing-page/EthClock';
import {Layout} from '../components/layout/layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Brainchild: HomePage</title>
        <meta name="description" content=""/>
      </Head>
      <Layout>
        <EthClock />
      </Layout>
    </>
  );
}
