import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import styled from 'styled-components';

const Home: NextPage = () => {
  const { uid, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const BodyWrapper = styled.div`
    margin: auto;
    max-width: 600px;
    height: 100vh;
    background-color: green;
  `;

  const BottomNav = styled.div`
    background-color: red;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    max-width: 600px;
    margin: auto;
    display: flex;
  `;

  const BottomNavItem = styled.div`
    flex: 1;
    padding-right: 20px;
    padding-left: 20px;
    margin-right: 20px;
    margin-left: 20px;
    background-color: aquamarine;
  `;

  useEffect(() => {
    // if (uid === null) {
    //   router.push('/login');
    // }
  }, [uid]);

  if (uid !== null) return <div></div>;

  return (
    <div>
      <BodyWrapper>
        <BottomNav>
          <BottomNavItem></BottomNavItem>
          <BottomNavItem></BottomNavItem>
          <BottomNavItem></BottomNavItem>
        </BottomNav>
      </BodyWrapper>
    </div>
  );
};

export default Home;
