import { Button, Form, Input, message } from 'antd';
import {
  ContentWrapper,
  LayoutWrappper,
  Title,
} from '../../components/layoutStyle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { fetchLoginRequest } from '../../features/user/userSlice';
import { LoginRequestParams } from '../../params/loginRequestParams';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';

const Login = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(user);
    console.log(user.error);
    if (user.error !== null) {
      showErrorMessage(user.error);
    }
  }, [user]);

  const onFinish = (data: any) => {
    form.resetFields(['password']);

    const loginRequestParams = new LoginRequestParams(
      data.email,
      data.password
    );

    // @ts-ignore
    dispatch(fetchLoginRequest(loginRequestParams));
  };

  const showErrorMessage = (err: string) => {
    message.error(err);
  };

  const handleGoSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/signUp');
  };

  return (
    <LayoutWrappper>
      <ContentWrapper>
        <Title>TeddyLog</Title>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 0 }}
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
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ width: '100%', marginBottom: '8px' }}
              type="primary"
              htmlType="submit"
              loading={user.loading === 'pending'}
              className="login-form-button"
            >
              로그인
            </Button>
            혹은 <Link href={'/signUp'}>회원가입</Link>하기
          </Form.Item>
        </Form>
      </ContentWrapper>
    </LayoutWrappper>
  );
};

export default Login;
