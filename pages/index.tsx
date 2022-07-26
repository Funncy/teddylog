import type { NextPage } from 'next';
import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';

const Home: NextPage = () => {
  const { uid, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (uid === null) {
      router.push('/login');
    }
  }, [uid]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div>{uid}</div>
        <div>{token}</div>
      </Suspense>
    </div>
  );
};

export default Home;
