import React, {useState} from 'react';
import styled from 'styled-components';
import {PlusOutlined} from '@ant-design/icons';
import Habit from './habit';
import {Form} from 'antd';
import CreateHabitModal from './createHabitModal';
import {useDispatch, useSelector} from "react-redux";
import {createHabitRequest} from "../features/habit/habitSlice";
import {RootState} from "../store/configureStore";
import {IHabitModal} from "../features/habit/habitType";

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
    const {uid} = useSelector(
        (state: RootState) => state.auth
    );
    const createHabit = ({name, goalCount}: IHabitModal) => {
        // @ts-ignore
        dispatch(createHabitRequest({uid, name, goalCount}));
        setIsModalVisible(false);
    };

    return (
        <BackgroundDiv>
            <Title>
                <span style={{alignSelf: 'center'}}>TeddyLog</span>
            </Title>
            <div>
                <Habit
                    title={'테스트'}
                    total={10}
                    current={count}
                    decrease={(e) => {
                        setCount(count - 1);
                    }}
                    increase={(e) => {
                        setCount(count + 1);
                    }}
                ></Habit>
            </div>
            <FabButton
                onClick={(e) => {
                    if (!isModalVisible) setIsModalVisible(true);
                }}
            >
                <PlusOutlined
                    style={{fontSize: '20px', fontWeight: 'bold', color: 'white'}}
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
