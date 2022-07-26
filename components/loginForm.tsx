import React from 'react';
import { Button, Form, FormInstance, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { AsyncType } from '../common/asyncType';

interface LoginFormParam {
  form: FormInstance;
  onFinish: (values: any) => void;
  handleGoSignUp: Function;
  loading: AsyncType;
}

function LoginForm({
  form,
  onFinish,
  handleGoSignUp,
  loading,
}: LoginFormParam) {
  return (
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
  );
}

export default LoginForm;
