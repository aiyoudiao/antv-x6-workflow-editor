// 文件路径: src/components/PropertyEditor.tsx

import React, { useEffect, useState } from 'react';
import { Card, Form, Input, InputNumber } from 'antd';

interface PropertyEditorProps {
  selectedNode: any;
}

const PropertyEditor: React.FC<PropertyEditorProps> = ({ selectedNode }) => {
  const [form] = Form.useForm();
  const [nodeAttributes, setNodeAttributes] = useState({});

  useEffect(() => {
    if (selectedNode && selectedNode.getLabel) {
      // 将节点的初始属性加载到表单
      const initialAttributes = {
        label: selectedNode.getLabel(),
        color: selectedNode.attr('body/stroke') || '#000',
        width: selectedNode.size().width,
        height: selectedNode.size().height
      };
      setNodeAttributes(initialAttributes);
      form.setFieldsValue(initialAttributes);
    }
  }, [selectedNode, form]);

  const handleFormChange = (changedValues: any) => {
    if (selectedNode) {
      const { color, width, height, label } = changedValues;
      if (label) selectedNode.setLabel(label);
      if (color) selectedNode.attr('body/stroke', color);
      if (width && height) selectedNode.resize(width, height);
    }
  };

  if (!selectedNode) {
    return (
      <Card title="属性编辑器">
        <p>请选中一个节点或连线以编辑属性。</p>
      </Card>
    );
  }

  return (
    <Card title="属性编辑器">
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleFormChange}
      >
        <Form.Item
          name="label"
          label="节点名称"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="color"
          label="边框颜色"
        >
          <Input type="color" />
        </Form.Item>
        <Form.Item
          name="width"
          label="宽度"
        >
          <InputNumber
            min={40}
            max={200}
          />
        </Form.Item>
        <Form.Item
          name="height"
          label="高度"
        >
          <InputNumber
            min={20}
            max={100}
          />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PropertyEditor;
