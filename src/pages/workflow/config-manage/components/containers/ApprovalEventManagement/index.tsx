import React, { useState } from 'react';
import { Button, Drawer, Popconfirm, Space, Table } from 'antd';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';

import { useApprovalFlowContext } from '../../../context/ApprovalFlowContext';

const ApprovalEventManagement: React.FC = () => {
  const { approvalEvents, addApprovalEvent, updateApprovalEvent, deleteApprovalEvent } = useApprovalFlowContext();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const formRef = useRef<ProFormInstance>();

  const handleAdd = () => {
    setEditingEvent(null);
    setDrawerVisible(true);
  };

  const handleEdit = record => {
    setEditingEvent(record);
    setDrawerVisible(true);
  };

  const handleDelete = eventId => {
    deleteApprovalEvent(eventId);
  };

  const handleSave = values => {
    if (editingEvent) {
      updateApprovalEvent({ ...editingEvent, ...values });
    } else {
      addApprovalEvent({ eventId: Date.now(), ...values });
    }
    formRef.current?.resetFields();
    setDrawerVisible(false);
  };

  const columns = [
    { align: 'center', title: '事件id', dataIndex: 'eventId', key: 'eventId' },
    { align: 'center', title: '事件名称', dataIndex: 'eventName', key: 'eventName' },
    {
      align: 'center',
      title: '操作',
      key: 'action',
      render: (text, record) => (
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
        </Space>
      )
    }
  ];

  return (
    <div>
      <section style={{ display: 'flex', justifyContent: 'end', marginBottom: 16 }}>
        <Space size={8}>
          <Button
            type="primary"
            onClick={handleAdd}
          >
            新增
          </Button>
        </Space>
      </section>
      <Table
        columns={columns}
        dataSource={approvalEvents}
        pagination={{ pageSize: 10 }}
      />
      <Drawer
        title={editingEvent ? '编辑审批流事件' : '新增审批流事件'}
        visible={drawerVisible}
        destroyOnClose
        onClose={() => setDrawerVisible(false)}
        width={400}
      >
        <ProForm
          formRef={formRef}
          initialValues={editingEvent}
          onFinish={handleSave}
        >
          <ProFormText
            name="eventId"
            label="事件id"
          />
          <ProFormText
            name="eventName"
            label="事件名称"
          />
        </ProForm>
      </Drawer>
    </div>
  );
};

export default ApprovalEventManagement;
