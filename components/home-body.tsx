import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import Habit from './habit';
import { Form } from 'antd';
import CreateHabitModal from './create-habit-modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  createHabitRequest,
  fetchHabitsRequest,
  updateHabitRequest,
} from '../features/habit/habit.slice';
import { RootState } from '../store/configureStore';
import { IHabitModel } from '../features/habit/habit.interface';

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
  const [form] = Form.useForm();
  const [count, setCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { uid } = useSelector((state: RootState) => state.auth);
  const { habits } = useSelector((state: RootState) => state.habit);
  const createHabit = ({ name, goalCount }: IHabitModel) => {
    // @ts-ignore
    dispatch(createHabitRequest({ uid, name, goalCount }));
    setIsModalVisible(false);
  };

  useEffect(() => {
    console.log('습관 가져오기 요청');
    console.log(uid);
    console.log(habits);
    // @ts-ignore
    dispatch(fetchHabitsRequest({ uid }));
  }, []);

  const updateCount = (hid: string, count: number) => {
    // @ts-ignore
    dispatch(updateHabitRequest({ uid, hid, count }));
  };

  const increaseCount = (hid: string, currentCount: number) => {
    const count = currentCount + 1;
    // @ts-ignore
    dispatch(updateHabitRequest({ uid, hid, count }));
  };

  const decreaseCount = (hid: string, currentCount: number) => {
    if (currentCount === 0) return;
    const count = currentCount === 0 ? 0 : currentCount - 1;
    // @ts-ignore
    dispatch(updateHabitRequest({ uid, hid, count }));
  };

  return (
    <BackgroundDiv>
      <Title>
        <span style={{ alignSelf: 'center' }}>TeddyLog</span>
      </Title>
      <div>
        {habits.map((e) => {
          return (
            <Habit
              key={e.id}
              title={e.name}
              total={e.goalCount}
              current={e.currentCount ?? 0}
              decrease={(_) => {
                decreaseCount(e.id, e.currentCount ?? 0);
              }}
              increase={(_) => {
                increaseCount(e.id, e.currentCount ?? 0);
              }}
            ></Habit>
          );
        })}
      </div>
      <FabButton
        onClick={(e) => {
          if (!isModalVisible) setIsModalVisible(true);
        }}
      >
        <PlusOutlined
          style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}
        />
      </FabButton>
      <CreateHabitModal
        isModalVisible={isModalVisible}
        onOk={createHabit}
        onCancel={(e) => setIsModalVisible(false)}
      />
    </BackgroundDiv>
  );
}

export default HomeBody;
