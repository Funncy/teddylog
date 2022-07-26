import React, { useEffect } from 'react';
import {
  ContentWrapper,
  LayoutWrappper,
  Title,
} from '../../components/layoutStyle';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { useRouter } from 'next/router';
import { fetchSignUpRequest } from '../../features/auth/authSlice';

function SignUp() {
  const { uid, signUpLoading, signUpError } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = (data: any) => {
    dispatch(
      // @ts-ignore
      fetchSignUpRequest({
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (uid !== null) {
      router.push('/signUp/info');
    }
  }, [uid]);

  useEffect(() => {
    if (signUpError !== null) {
      message.error(signUpError);
    }
  }, [signUpError]);

  return (
    <LayoutWrappper>
      <ContentWrapper>
        <Title>TeddyLog - 회원가입</Title>
        <Form
          form={form}
          name="basic"
          wrapperCol={{ span: 32 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: '이메일을 입력해주세요.',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="이메일"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="비밀번호"
            />
          </Form.Item>

          <Form.Item
            name="re-password"
            rules={[
              { required: true, message: '비밀번호 확인을 입력해주세요' },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="비밀번호 확인"
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ width: '100%' }}
              type="primary"
              htmlType="submit"
              loading={signUpLoading === 'pending'}
            >
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </ContentWrapper>
    </LayoutWrappper>
  );
}

export default SignUp;
