import React, { useState } from 'react';
import { Button, Drawer, Popconfirm, Space, Table } from 'antd';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';

import { useApprovalFlowContext } from '../../../context/ApprovalFlowContext';

const ApprovalConditionManagement: React.FC = () => {
  const { approvalConditions, addApprovalCondition, updateApprovalCondition, deleteApprovalCondition } =
    useApprovalFlowContext();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingCondition, setEditingCondition] = useState<any>(null);
  const formRef = useRef<ProFormInstance>();

  const handleAdd = () => {
    setEditingCondition(null);
    setDrawerVisible(true);
  };

  const handleEdit = record => {
    setEditingCondition(record);
    setDrawerVisible(true);
  };

  const handleDelete = typeId => {
    deleteApprovalCondition(typeId);
  };

  const handleSave = values => {
    if (editingCondition) {
      updateApprovalCondition({ ...editingCondition, ...values });
    } else {
      addApprovalCondition({ typeId: Date.now(), ...values });
    }
    formRef.current?.resetFields();
    setDrawerVisible(false);
  };

  const columns = [
    { align: 'center', title: '类型id', dataIndex: 'typeId', key: 'typeId' },
    { align: 'center', title: '条件字段名', dataIndex: 'fieldName', key: 'fieldName' },
    { align: 'center', title: '运算符', dataIndex: 'operator', key: 'operator' },
    { align: 'center', title: '值', dataIndex: 'value', key: 'value' },
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
        dataSource={approvalConditions}
        pagination={{ pageSize: 10 }}
      />
      <Drawer
        title={editingCondition ? '编辑审批流条件' : '新增审批流条件'}
        visible={drawerVisible}
        destroyOnClose
        onClose={() => setDrawerVisible(false)}
        width={400}
      >
        <ProForm
          formRef={formRef}
          initialValues={editingCondition}
          onFinish={handleSave}
        >
          <ProFormText
            name="typeId"
            label="类型id"
          />
          <ProFormText
            name="fieldName"
            label="条件字段名"
          />
          <ProFormText
            name="operator"
            label="运算符"
          />
          <ProFormText
            name="value"
            label="值"
          />
        </ProForm>
      </Drawer>
    </div>
  );
};

export default ApprovalConditionManagement;
