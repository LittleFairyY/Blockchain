import * as React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import countries from '../../utils/countries';
import { FormComponentProps } from 'antd/lib/form';
import { IUserStore } from '../../stores';

const Option = Select.Option;
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
  visible: boolean;
}

const AddAdminModal = ({
  user,
  form,
  visible,
  onClose,
  successCallback,
}: IProps) => {
  const { getFieldDecorator, validateFields } = form;

  const closeModal = () => {
    onClose();
    form.resetFields();
  };

  const handleSubmit = () => {
    validateFields(async (err, values) => {
      if (!err) {
        await user.addAdmin({
          ...values,
          areaCode: getAreaCode(values.areaCode),
        });
        closeModal();
        successCallback();
      }
    });
  };

  const onAreaCodeChange = (val: string) => {
    if (!val) {
      form.setFieldsValue({ mobile: undefined });
    }
  };

  const getAreaCode = (selectVal?: string) =>
    selectVal
      ? countries.find(c => `${c.id}${c.zhCn}` === selectVal)!.code
      : undefined;

  const validateMobile = (_: any, val: string, callback: any) => {
    const reg = /^\d{5,18}$/;
    if (val && !reg.test(val)) {
      return callback('请填写有效的手机号');
    }
    callback();
  };

  return (
    <Modal
      title="添加管理员"
      visible={visible}
      onCancel={closeModal}
      onOk={handleSubmit}
      confirmLoading={user.loading}
      okText="确定"
      cancelText="取消"
    >
      <Form>
        <FormItem label="用户名">
          {getFieldDecorator('usr', {
            rules: [
              {
                required: true,
                message: '请填写用户名',
              },
              {
                max: 30,
                message: '用户名不能超过30个字符',
              },
            ],
          })(<Input placeholder="请填写用户名" />)}
        </FormItem>
        <FormItem label="密码">
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
        <FormItem label="区号">
          {getFieldDecorator('areaCode', {
            rules: [
              {
                required: true,
                message: '请选择区号',
              },
            ],
          })(
            <Select
              placeholder="请选择区号"
              allowClear
              onChange={onAreaCodeChange}
              showSearch
            >
              {countries.map(c => (
                <Option key={c.id} value={`${c.id}${c.zhCn}`}>
                  {`+${c.code} ${c.zhCn}`}
                </Option>
              ))}
            </Select>,
          )}
        </FormItem>
        <FormItem label="手机号">
          {getFieldDecorator('mobile', {
            rules: [
              {
                required: true,
                message: '请填写手机号',
              },
              {
                validator: validateMobile,
              },
            ],
          })(<Input placeholder="请填写手机号" />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Form.create<IProps>()(AddAdminModal);
