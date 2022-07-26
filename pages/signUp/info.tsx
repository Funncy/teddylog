import React, { useEffect } from 'react';
import {
  ContentWrapper,
  LayoutWrappper,
  Title,
} from '../../components/layoutStyle';
import { Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { useRouter } from 'next/router';
import { updateUserInfo } from '../../features/user/userSlice';

function UserInfo() {
  const { updateError, updateLoading } = useSelector(
    (state: RootState) => state.user
  );
  const { uid } = useSelector((state: RootState) => state.auth);
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
        uid: uid,
      })
    ).unwrap();

    router.push('/');
  };

  return (
    <LayoutWrappper>
      <ContentWrapper>
        <Title>TeddyLog - 유저 정보 입력</Title>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="닉네임"
            name="nickname"
            rules={[
              {
                required: true,
                message: '닉네임을 입력해주세요.',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={'introduce'}
            label="한줄 각오"
            rules={[
              {
                required: true,
                message: '닉네임을 입력해주세요.',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ width: '100%', marginBottom: '8px' }}
              type="primary"
              htmlType="submit"
              loading={updateLoading === 'pending'}
            >
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </ContentWrapper>
    </LayoutWrappper>
  );
}

export default UserInfo;
