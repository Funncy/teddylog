import { Button, Form, Input, message } from 'antd';
import {
  ContentWrapper,
  LayoutWrappper,
  Title,
} from '../../components/layoutStyle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { fetchLoginRequest } from '../../features/auth/authSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { fetchUserInfoRequest } from '../../features/user/userSlice';

const Login = () => {
  const { error, loading, token } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (error !== null) {
      showErrorMessage(error);
    }
  }, [error]);

  const onFinish = async (data: any) => {
    form.resetFields(['password']);
    try {
      const user = await dispatch(
        // @ts-ignore
        fetchLoginRequest({ email: data.email, password: data.password })
      ).unwrap();

      const userInfo = await dispatch(
        // @ts-ignore
        fetchUserInfoRequest({ uid: user.uid, email: user.email })
      ).unwrap();

      //유저 정보 입력 화면 이동
      if (userInfo.nickname === null) {
        router.push('/signUp/info');
      } else {
        //홈 화면 이동
        router.push('/');
      }
    } catch (err) {
      showErrorMessage('로그인 요청에 실패하였습니다.');
    }
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
              loading={loading === 'pending'}
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
