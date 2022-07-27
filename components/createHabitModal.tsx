import React from 'react';
import { Form, Input, Modal } from 'antd';

interface ICreateHabitModal {
  isModalVisible: boolean;
  onOk: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

function CreateHabitModal({
  isModalVisible,
  onOk,
  onCancel,
}: ICreateHabitModal) {
  const [form] = Form.useForm();

  return (
    <Modal
      title="습관 추가하기"
      visible={isModalVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 0 }}
        initialValues={{ remember: true }}
        onFinish={onOk}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: '이름을 입력해주세요.',
            },
          ]}
        >
          <Input placeholder="습관 이름" />
        </Form.Item>

        <Form.Item
          name="total"
          rules={[{ required: true, message: '목표 갯수를 입력해주세요' }]}
        >
          <Input placeholder="목표 갯수" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateHabitModal;
