import React from 'react';
import { Button, Form, FormInstance, Input } from 'antd';
import { AsyncType } from '../common/asyncType';

interface SignUpInfoFormParam {
  form: FormInstance;
  onFinish: (values: any) => void;
  loading: AsyncType;
}

function SignUpInfoForm({ form, onFinish, loading }: SignUpInfoFormParam) {
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 32 }}
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
          loading={loading === 'pending'}
        >
          회원가입
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUpInfoForm;
