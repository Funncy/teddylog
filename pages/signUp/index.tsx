import React from 'react';
import {
  ContentWrapper,
  LayoutWrappper,
  Title,
} from '../../components/layoutStyle';
import { Button, Checkbox, Form, Input } from 'antd';

function SignUp() {
  const [form] = Form.useForm();

  const onFinish = (data: any) => {};

  return (
    <LayoutWrappper>
      <ContentWrapper>
        <Title>TeddyLog</Title>
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
            rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: '비밀번호 확인을 입력해주세요' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 20 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 40 }}>
            <Button
              style={{ marginLeft: '20px' }}
              type="primary"
              // onClick={handleGoSignUp}
              // loading={user.loading === 'pending'}
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
