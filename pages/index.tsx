import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import styled from 'styled-components';
import {
  CalendarOutlined,
  OrderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import BottomNavItem from '../components/bottomNavItem';
import HomeBody from '../components/HomeBody';

const Home: NextPage = () => {
  const [selectedNav, setSelectedNav] = useState(1);
  const { uid, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const BodyWrapper = styled.div`
    margin: auto;
    max-width: 400px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    //background-color: green;
  `;

  const BottomNav = styled.div`
    box-shadow: 0 0 5px #ebeff6;
    background-color: white;
    height: 40px;
    max-width: 400px;
    width: 100%;
    margin: auto;
    display: flex;
    font-size: 10px;
  `;

  const ContentWrapper = styled.div`
    flex: 1;
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
        <ContentWrapper>
          <HomeBody />
        </ContentWrapper>
        <BottomNav>
          <BottomNavItem
            active={selectedNav === 1}
            onClick={(e) => setSelectedNav(1)}
          >
            <OrderedListOutlined style={{ fontSize: '15px' }} />
            <span style={{ fontSize: '4px', fontWeight: 'bold' }}>홈</span>
          </BottomNavItem>
          <BottomNavItem
            active={selectedNav === 2}
            onClick={(e) => setSelectedNav(2)}
          >
            <CalendarOutlined style={{ fontSize: '15px' }} />
            <span>캘린더</span>
          </BottomNavItem>
          <BottomNavItem
            active={selectedNav === 3}
            onClick={(e) => setSelectedNav(3)}
          >
            <UserOutlined style={{ fontSize: '15px' }} />
            <span>프로필</span>
          </BottomNavItem>
        </BottomNav>
      </BodyWrapper>
    </div>
  );
};

export default Home;
