import Head from 'next/head';
import { Layout } from '../layout/layout';
import Icon from '../ui-kit/icon';

export default function Error404() {
  return (<>
    <Head>
      <title>Brainchild: Error404</title>
      <meta name="description" content=""/>
    </Head>
    <Layout>
      <section className="w-screen h-screen-without-navbar">
        <div className="container mx-auto flex flex-col justify-center items-center h-full">
          <Icon name="error404" size={500} color="white"/>
        </div>
      </section>
    </Layout>
  </>);
}
