import React, { useState } from 'react';
import { Button, Drawer, Popconfirm, Space, Table } from 'antd';

import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';

import { useApprovalFlowContext } from '../../../context/ApprovalFlowContext';

const ApprovalTypeManagement: React.FC = () => {
  const { approvalTypes, addApprovalType, updateApprovalType, deleteApprovalType } = useApprovalFlowContext();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingType, setEditingType] = useState<any>(null);
  const formRef = useRef<ProFormInstance>();

  const handleAdd = () => {
    setEditingType(null);
    setDrawerVisible(true);
  };

  const handleEdit = record => {
    setEditingType(record);
    setDrawerVisible(true);
  };

  const handleDelete = id => {
    deleteApprovalType(id);
  };

  const handleSave = values => {
    if (editingType) {
      updateApprovalType({ ...editingType, ...values });
    } else {
      addApprovalType({ id: Date.now(), ...values });
    }
    formRef.current?.resetFields();
    setDrawerVisible(false);
  };

  const columns = [
    { title: '自增id', align: 'center', dataIndex: 'id', key: 'id' },
    { title: '类型名称', align: 'center', dataIndex: 'name', key: 'name' },
    { title: '父级id', align: 'center', dataIndex: 'parentId', key: 'parentId' },
    { title: '大类父级id', align: 'center', dataIndex: 'categoryParentId', key: 'categoryParentId' },
    { title: '流程父级id', align: 'center', dataIndex: 'flowParentId', key: 'flowParentId' },
    {
      title: '操作',
      align: 'center',
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
        dataSource={approvalTypes}
        pagination={{ pageSize: 10 }}
      />
      <Drawer
        title={editingType ? '编辑审批类型' : '新增审批类型'}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        destroyOnClose
        width={400}
      >
        <ProForm
          formRef={formRef}
          initialValues={editingType}
          onFinish={handleSave}
        >
          <ProFormText
            name="name"
            label="类型名称"
          />
          <ProFormText
            name="parentId"
            label="父级id"
          />
          <ProFormText
            name="categoryParentId"
            label="大类父级id"
            initialValue={0}
          />
          <ProFormText
            name="flowParentId"
            label="流程父级id"
          />
        </ProForm>
      </Drawer>
    </div>
  );
};

export default ApprovalTypeManagement;
