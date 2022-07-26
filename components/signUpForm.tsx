import React from 'react';
import { Button, Form, FormInstance, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { AsyncType } from '../common/asyncType';

interface SignUpFormParam {
  form: FormInstance;
  onFinish: (values: any) => void;
  loading: AsyncType;
}

function SignUpForm({ form, onFinish, loading }: SignUpFormParam) {
  return (
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
        rules={[{ required: true, message: '비밀번호 확인을 입력해주세요' }]}
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
          loading={loading === 'pending'}
        >
          회원가입
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUpForm;
