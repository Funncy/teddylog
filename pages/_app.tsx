import type {AppProps} from 'next/app';
import 'antd/dist/antd.css';
import {store} from '../store/configureStore';
import {Provider} from 'react-redux';
import Head from 'next/head';

// export const db = init();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>TeddyLog - 나의 습관 일지</title>
        <meta name="TeddyLog" content="당신의 습관을 기록해보세요" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
