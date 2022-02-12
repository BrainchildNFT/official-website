import type { AppProps } from 'next/app'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import '../styles/globals.css'
import '../styles/layout.css'

import ErrorPage from '../components/error-page'
import GoogleAds from '../components/3rd-party/google-ads'
import useGAService from '../core/app-services/ga-service'
import reducers from '../core/reducers';
import { AppProvider } from '../components/context/app-context';
import { DialogProvider } from '../components/dialog/dialog-context';

function MyApp({ Component, pageProps }: AppProps) {

  const store = createStore(
    reducers,
    (typeof window === 'undefined' ? false : ((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()))
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
      <DialogProvider>
        <AppProvider>
          <Provider store={store}>
            <Component {...pageProps} />
            <GoogleAds />
          </Provider>
        </AppProvider>
      </DialogProvider>
    </>
  )
}

export default MyApp
