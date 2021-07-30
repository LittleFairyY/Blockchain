import * as React from 'react';
import { Modal, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { IUserStore } from '../../stores';

const FormItem = Form.Item;

interface IFields {
  usr: string;
  pwd: string;
  areaCode?: string;
  mobile?: string;
}

interface IProps extends FormComponentProps<IFields> {
  user: IUserStore;
  successCallback: () => void;
  onClose: () => void;
  onSubmit: (pwd: string) => void;
  visible: boolean;
}

const ResetPwdModal = ({ user, form, visible, onClose, onSubmit }: IProps) => {
  const { getFieldDecorator, validateFields } = form;

  const closeModal = () => {
    onClose();
    form.resetFields();
  };

  const handleSubmit = () => {
    validateFields(async (err, values) => {
      if (!err) {
        onSubmit(values.pwd);
      }
    });
    closeModal();
  };

  return (
    <Modal
      title="重置密码"
      visible={visible}
      onCancel={closeModal}
      onOk={handleSubmit}
      confirmLoading={user.loading}
      okText="确定"
      cancelText="取消"
    >
      <Form>
        <FormItem label="设置新密码">
          {getFieldDecorator('pwd', {
            rules: [
              {
                required: true,
                message: '请填写密码',
              },
              {
                max: 30,
                message: '密码不能超过30个字符',
              },
            ],
          })(<Input.Password placeholder="请填写密码" />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Form.create<IProps>()(ResetPwdModal);
