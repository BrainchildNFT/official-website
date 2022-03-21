import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content="Brainchild"/>
          <link rel="apple-touch-icon" href="/icons/icon-512.png"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Brainchild"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="msapplication-TileColor" content="white"/>
          <meta name="msapplication-tap-highlight" content="no"/>
          <meta name="theme-color" content="#07A39D"/>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
          {/*Facebook Meta Tags*/}
          <meta property="og:url" content="https://www.brainchildnft.com/"/>
          <meta property="og:type" content="website"/>
          <meta property="og:title" content="BrainchildNFT - EthClock"/>
          <meta property="og:description"
                content="A tribute to Ethereum. Redeem, upgrade, enhance NFTs traversing the digital & real world. Unlock innovative ownership experinces with Web3."/>
          <meta property="og:image" content="https://i.ibb.co/C1bXMkp/home-env-8.jpg"/>

          {/*Twitter Meta Tags*/}
          <meta name="twitter:card" content="summary_large_image"/>
          <meta property="twitter:domain" content="brainchildnft.com"/>
          <meta property="twitter:url" content="https://www.brainchildnft.com/"/>
          <meta name="twitter:title" content="BrainchildNFT - EthClock"/>
          <meta name="twitter:description"
                content="A tribute to Ethereum. Redeem, upgrade, enhance NFTs traversing the digital & real world. Unlock innovative ownership experinces with Web3."/>
          <meta name="twitter:image" content="https://i.ibb.co/C1bXMkp/home-env-8.jpg"/>
          {/*Meta Tags Generated via https://www.opengraph.xyz*/}
          <link rel="manifest" href="/manifest.json"/>
          <link rel="shortcut icon" href="/favicon.ico"/>
          <link
            rel="apple-touch-startup-image"
            href="/splash/splash-320.png"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          />
          <link
            rel="apple-touch-startup-image"
            href="/splash/splash-512.png"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&amp;display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
