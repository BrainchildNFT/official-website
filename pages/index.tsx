import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {Layout} from '../components/layout/layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Brainchild: HomePage</title>
        <meta name="description" content=""/>
      </Head>
      <Layout>
        <div className="bg-light h-500">
          Here is the body of our project
        </div>
      </Layout>
    </>
  );
}
