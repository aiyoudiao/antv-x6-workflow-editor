import React from 'react';
import { Button, Form, Steps } from 'antd';
import { ProCard, ProForm, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';

const { Step } = Steps;

interface ApprovalFlowFormProps {
  visible: boolean;
  onSave: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
}

const ApprovalFlowInstance: React.FC<ApprovalFlowFormProps> = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [form] = Form.useForm();

  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <ProCard className="h-full">
      <Steps current={currentStep}>
        <Step title="基础信息" />
        <Step title="审批流程设计" />
        <Step title="扩展设置" />
      </Steps>
      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: 24 }}
      >
        {currentStep === 0 && (
          <>
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
          </>
        )}
        {currentStep === 1 && (
          <div>
            {/* 审批流程设计内容 */}
            <p>审批流程设计内容</p>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            {/* 扩展设置内容 */}
            <p>扩展设置内容</p>
          </div>
        )}
        <div style={{ marginTop: 24 }}>
          {currentStep > 0 && (
            <Button
              onClick={handlePrev}
              style={{ marginRight: 8 }}
            >
              上一步
            </Button>
          )}
          {currentStep < 2 && (
            <Button
              type="primary"
              onClick={handleNext}
            >
              下一步
            </Button>
          )}
          {currentStep === 2 && (
            <Button
              type="primary"
              onClick={handleFinish}
            >
              保存
            </Button>
          )}
        </div>
      </Form>
    </ProCard>
  );
};

export const Component: React.FC = () => {
  return <ApprovalFlowInstance />;
};
