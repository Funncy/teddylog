import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import { store } from '../store/configureStore';
import { Provider } from 'react-redux';
import { init } from '../firebase/.firebase';

init();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
