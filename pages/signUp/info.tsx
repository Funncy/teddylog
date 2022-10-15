import React, { useEffect } from 'react';
import {
  ContentWrapper,
  LayoutWrappper,
  Title,
} from '../../components/layoutStyle';
import { Form, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { useRouter } from 'next/router';
import { updateUserInfo } from '../../features/user/user.slice';
import SignUpInfoForm from '../../components/SignUpInfoForm';

function UserInfo() {
  const { updateError, updateLoading } = useSelector(
    (state: RootState) => state.user
  );
  const { uid, email } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (updateError !== null) {
      message.error(updateError);
    }
  }, [updateError]);

  const onFinish = async (data: any) => {
    const result = await dispatch(
      // @ts-ignore
      updateUserInfo({
        nickname: data.nickname,
        introduce: data.introduce,
        email: email ?? '',
        uid: uid ?? '',
      })
    ).unwrap();

    router.push('/');
  };

  return (
    <LayoutWrappper>
      <ContentWrapper>
        <Title>TeddyLog - 유저 정보 입력</Title>
        <SignUpInfoForm
          form={form}
          onFinish={onFinish}
          loading={updateLoading}
        />
      </ContentWrapper>
    </LayoutWrappper>
  );
}

export default UserInfo;
