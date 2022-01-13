import type { AppProps } from 'next/app'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import '../styles/globals.css'
import '../styles/layout.css'

import ErrorPage from '../components/error-page'
import GoogleAds from '../components/3rd-party/google-ads'
import useGAService from '../core/app-services/ga-service'
import reducers from '../core/reducers';

function MyApp({ Component, pageProps }: AppProps) {

  const store = createStore(
    reducers,
    (typeof window === 'undefined' ? false : (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
  );

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
      <Provider store={store}>
        <Component {...pageProps} />
        <GoogleAds />
      </Provider>
    </>
  )
}

export default MyApp
