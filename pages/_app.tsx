import type { AppProps } from 'next/app'

import '../styles/globals.css'
import '../styles/layout.css'

import ErrorPage from '../components/error-page';

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    return <ErrorPage statusCode={pageProps.error.statusCode} message={pageProps.error.message} />
  }

  return <Component {...pageProps} />
}

export default MyApp
