import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';

const Home: NextPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    console.log('auth?... ');
    console.log(auth);
    if (auth.uid === null) {
      router.push('/login');
    }
  }, [auth]);

  return (
    <div>
      <Head>
        <title>TeddyLog - 나의 습관 일지</title>
        <meta name="TeddyLog" content="당신의 습관을 기록해보세요" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>??</div>
      <div>??</div>
      <div>{auth.uid}</div>
      <div>{auth.token}</div>
    </div>
  );
};

export default Home;
