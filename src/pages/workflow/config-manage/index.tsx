import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import ApprovalTypeManagement from './components/containers/ApprovalTypeManagement';
import ApprovalConditionManagement from './components/containers/ApprovalConditionManagement';
import ApprovalEventManagement from './components/containers/ApprovalEventManagement';
import { ApprovalFlowProvider } from './context/ApprovalFlowContext';

const { TabPane } = Tabs;

export const Component: React.FC = () => {
  return (
    <ApprovalFlowProvider>
      <ProCard
        direction="column"
        gutter={[0, 16]}
        className="h-full"
      >
        <Tabs defaultActiveKey="1">
          <TabPane
            tab="审批类型管理"
            key="1"
          >
            <ApprovalTypeManagement />
          </TabPane>
          <TabPane
            tab="审批流条件管理"
            key="2"
          >
            <ApprovalConditionManagement />
          </TabPane>
          <TabPane
            tab="审批流事件管理"
            key="3"
          >
            <ApprovalEventManagement />
          </TabPane>
        </Tabs>
      </ProCard>
    </ApprovalFlowProvider>
  );
};
