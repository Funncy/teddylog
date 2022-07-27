import React from 'react';
import styled from 'styled-components';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const Habbit = styled.div`
  box-shadow: 0 0 5px #ebeff6;
  height: 60px;
  width: 100%;
  margin: auto;
  margin-top: 20px;
  border-radius: 10px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  position: relative;
`;

const IconWrapper = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  align-self: center;
`;

const ProgressBackground = styled.div<{ progress: number }>`
  position: absolute;
  left: 0;
  border-radius: 10px;
  right: ${(props) => `${100 - props.progress}%`};
  bottom: 0;
  top: 0;
  background-color: #6787ff;
  z-index: -1;
  transition-duration: 1s;
`;

interface IHbait {
  title: string;
  total: number;
  current: number;
  decrease: React.MouseEventHandler<HTMLDivElement>;
  increase: React.MouseEventHandler<HTMLDivElement>;
}

function Habit({ title, total, current, decrease, increase }: IHbait) {
  return (
    <Habbit>
      <IconWrapper onClick={decrease}>
        <MinusOutlined />
      </IconWrapper>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '15px', fontWeight: 'bold' }}>Title</div>
        <div>1/3</div>
      </div>
      <IconWrapper onClick={increase}>
        <PlusOutlined />
      </IconWrapper>
      <ProgressBackground progress={100} />
    </Habbit>
  );
}

export default Habit;
