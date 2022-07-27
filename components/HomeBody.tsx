import React from 'react';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import Habit from './habit';

const BackgroundDiv = styled.div`
  //background-color: red;
  width: 100%;
  height: 100%;
  position: relative;
`;

const FabButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #6787ff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.div`
  box-shadow: 0 0 5px #ebeff6;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

function HomeBody() {
  return (
    <BackgroundDiv>
      <Title>
        <span style={{ alignSelf: 'center' }}>TeddyLog</span>
      </Title>
      <div>
        <Habit></Habit>
      </div>
      <FabButton>
        <PlusOutlined
          style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}
        />
      </FabButton>
    </BackgroundDiv>
  );
}

export default HomeBody;