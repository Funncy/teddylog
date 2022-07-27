import React from 'react';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';

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

function HomeBody() {
  return (
    <BackgroundDiv>
      Body
      <FabButton>
        <PlusOutlined
          style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}
        />
      </FabButton>
    </BackgroundDiv>
  );
}

export default HomeBody;
