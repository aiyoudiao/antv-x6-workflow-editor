/** 帮我写一个表单组件 */
import React from 'react';

import { Button, Form, Steps } from 'antd';
import { ProCard, ProForm, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';

const BaseForm: React.FC = forwardRef((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => form);

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ marginTop: 24 }}
    >
      <ProFormText
        name="name"
        label="审批流程名称"
        rules={[{ required: true, message: '请输入审批流程名称' }]}
      />
      <ProFormText
        name="type"
        label="审批流程类型"
        rules={[{ required: true, message: '请输入审批流程类型' }]}
      />
      <ProFormTextArea
        name="description"
        label="审批流程描述"
      />
      <ProFormSwitch
        name="enabled"
        label="是否启用"
      />
    </Form>
  );
});

export default BaseForm;
