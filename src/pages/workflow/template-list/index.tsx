import React, { useState } from 'react';
import { Button, Modal, Popconfirm, Space, Table, message } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ApprovalFlow } from './context/ApprovalFlowContext';
import { ApprovalFlowProvider, useApprovalFlowContext } from './context/ApprovalFlowContext';

const { confirm } = Modal;

export const ApprovalFlowManage: React.FC = () => {
  const { approvalFlows, addApprovalFlow, updateApprovalFlow, deleteApprovalFlow, toggleEnableApprovalFlow } =
    useApprovalFlowContext();
  const [editingFlow, setEditingFlow] = useState<ApprovalFlow | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const nav = useNavigate();

  const handleAdd = () => {
    setEditingFlow(null);
    nav(`/workflow/instance`);
  };

  const handleEdit = (record: ApprovalFlow) => {
    setEditingFlow(record);
  };

  const handleDelete = (id: number) => {
    confirm({
      title: '确认删除该审批流程模型吗？',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteApprovalFlow(id);
        message.success('删除成功');
      }
    });
  };

  const handleToggleEnable = (record: ApprovalFlow) => {
    toggleEnableApprovalFlow(record.id);
    message.success(record.enabled ? '禁用成功' : '启用成功');
  };

  const handleSave = (values: ApprovalFlow) => {
    if (editingFlow) {
      updateApprovalFlow({ ...editingFlow, ...values });
    } else {
      addApprovalFlow({
        ...values,
        id: Date.now(),
        creator: 'Admin',
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString()
      });
    }
    setFormVisible(false);
    message.success('保存成功');
  };

  const columns = [
    { title: '审批流程编号', dataIndex: 'id', key: 'id' },
    { title: '审批流程名称', dataIndex: 'name', key: 'name' },
    { title: '流程类型', dataIndex: 'type', key: 'type' },
    { title: '创建人', dataIndex: 'creator', key: 'creator' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
    { title: '是否启用', dataIndex: 'enabled', key: 'enabled', render: (enabled: boolean) => (enabled ? '是' : '否') },
    {
      title: '操作',
      key: 'action',
      render: (text, record: ApprovalFlow) => (
        <Space size={4}>
          <Button
            type="link"
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            placement="top"
            title="确认删除该行数据吗？"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              type="link"
              danger
            >
              删除
            </Button>
          </Popconfirm>
          <Button
            type="link"
            onClick={() => handleToggleEnable(record)}
          >
            {record.enabled ? '禁用' : '启用'}
          </Button>
        </Space>
      )
    }
  ];

  return (
    <ApprovalFlowProvider>
      <ProCard className="h-full">
        <section style={{ display: 'flex', justifyContent: 'end', marginBottom: 16 }}>
          <Space size={8}>
            <Button
              type="primary"
              onClick={handleAdd}
            >
              新增审批流程
            </Button>
          </Space>
        </section>
        <Table
          columns={columns}
          dataSource={approvalFlows}
          pagination={{ pageSize: 10 }}
        />
      </ProCard>
    </ApprovalFlowProvider>
  );
};

export const Component: React.FC = () => {
  return (
    <ApprovalFlowProvider>
      <ApprovalFlowManage />
    </ApprovalFlowProvider>
  );
};
