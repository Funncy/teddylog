import { Button, Checkbox, Form, Input } from 'antd';
import { ContentWrapper, LayoutWrappper, Title } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { fetchLoginRequest } from '../../features/user/userSlice';
import { LoginRequestParams } from '../../params/loginRequestParams';

const Login = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const onFinish = (data: any) => {
    const loginRequestParams = new LoginRequestParams(
      data.email,
      data.password
    );

    // @ts-ignore
    dispatch(fetchLoginRequest(loginRequestParams));
  };

  const onFinishFailed = () => {};

  return (
    <LayoutWrappper>
      <ContentWrapper>
        <Title>TeddyLog</Title>
        <div>{user.loading}</div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: '이메일을 입력해주세요.',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={user.loading === 'pending'}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ContentWrapper>
    </LayoutWrappper>
  );
};

export default Login;
