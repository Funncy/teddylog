import { Form, message } from 'antd';
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
import LoginForm from '../../components/loginForm';

const Login = () => {
  const { loginError, loginLoading, token } = useSelector(
    (state: RootState) => state.auth
  );
  const { nickname, fetchLoading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (loginError !== null) {
      showErrorMessage(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    if (nickname === null && fetchLoading === 'succeeded') {
      router.push('/signUp/info');
    } else if (fetchLoading === 'succeeded') {
      router.push('/');
    }
  }, [nickname, fetchLoading]);

  const onFinish = async (data: any) => {
    form.resetFields(['password']);
    dispatch(
      // @ts-ignore
      fetchLoginRequest({ email: data.email, password: data.password })
    );
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
        <LoginForm
          form={form}
          onFinish={onFinish}
          handleGoSignUp={handleGoSignUp}
          loading={loginLoading}
        />
      </ContentWrapper>
    </LayoutWrappper>
  );
};

export default Login;
