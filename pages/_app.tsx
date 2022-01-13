import type { AppProps } from 'next/app'

import '../styles/globals.css'
import '../styles/layout.css'

import ErrorPage from '../components/error-page'
import GoogleAds from '../components/3rd-party/google-ads'
import useGAService from '../core/app-services/ga-service'

function MyApp({ Component, pageProps }: AppProps) {
  const gaService = useGAService()
  gaService.initialize()
  if (pageProps.error) {
    return (
      <ErrorPage
        statusCode={pageProps.error.statusCode}
        message={pageProps.error.message}
      />
    )
  }

  return (
    <>
      <Component {...pageProps} />
      <GoogleAds />
    </>
  )
}

export default MyApp
