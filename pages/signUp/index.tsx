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
import { fetchSignUpRequest } from '../../features/auth/auth.slice';
import SignUpForm from '../../components/signUpForm';

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
        <SignUpForm form={form} onFinish={onFinish} loading={signUpLoading} />
      </ContentWrapper>
    </LayoutWrappper>
  );
}

export default SignUp;
