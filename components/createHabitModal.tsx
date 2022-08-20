import React from 'react';
import { Form, Input, Modal } from 'antd';
import { IHabitModal } from '../features/habit/habitType';

interface ICreateHabitModal {
  isModalVisible: boolean;
  onOk: (data: IHabitModal) => void;
  onCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

function CreateHabitModal({
  isModalVisible,
  onOk,
  onCancel,
}: ICreateHabitModal) {
  const [form] = Form.useForm();

  const onSubmit = () => {
    onOk({
      name: form.getFieldValue('name'),
      goalCount: parseInt(form.getFieldValue('goalCount')),
    });

    form.resetFields(['name', 'goalCount']);
  };

  return (
    <Modal
      title="습관 추가하기"
      visible={isModalVisible}
      onOk={(e) => onSubmit()}
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
          name="name"
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
          name="goalCount"
          rules={[{ required: true, message: '목표 갯수를 입력해주세요' }]}
        >
          <Input placeholder="목표 갯수" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateHabitModal;
