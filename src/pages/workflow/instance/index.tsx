import React from 'react';
import { Button, Form, Steps, Tooltip } from 'antd';
import { ProCard, ProForm, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

import { Component as TemplateEditor } from '../template-editor';
import BaseForm from './components/BaseForm';

const { Step } = Steps;

interface ApprovalFlowFormProps {
  visible: boolean;
  onSave: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
}

const ApprovalFlowInstance: React.FC<ApprovalFlowFormProps> = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [fullScreen, setFullScreen] = React.useState(false);
  const baseFormRef = useRef(null);

  const handleNext = async () => {
    try {
      await baseFormRef?.current?.validateFields?.();
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
      const values = await baseFormRef?.current?.validateFields?.();
      console.log(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <ProCard
      className="h-full"
      extra={
        <Tooltip
          title={fullScreen ? '退出专注' : '专注模式'}
          className="relative z-[99999]"
        >
          <Button
            type="text"
            icon={fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            onClick={() => {
              setFullScreen(!fullScreen);
            }}
          />
        </Tooltip>
      }
    >
      {!fullScreen && (
        <Steps
          current={currentStep}
          onChange={async index => {
            await baseFormRef?.current?.validateFields?.();
            setCurrentStep(index);
          }}
        >
          <Step title="基础信息" />
          <Step title="审批流程设计" />
          <Step title="扩展设置" />
        </Steps>
      )}
      <section className={fullScreen ? '-mt-12 h-78vh' : 'h-full'}>
        {currentStep === 0 && <BaseForm ref={baseFormRef} />}
        {currentStep === 1 && <TemplateEditor>{/* 审批流程设计内容 */}</TemplateEditor>}
        {currentStep === 2 && (
          <div>
            {/* 扩展设置内容 */}
            <p>扩展设置内容</p>
          </div>
        )}
        {!fullScreen && (
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
        )}
      </section>
    </ProCard>
  );
};

export const Component: React.FC = () => {
  return <ApprovalFlowInstance />;
};
