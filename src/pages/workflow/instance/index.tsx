// src/pages/FlowEditor.tsx
import React, { useEffect, useState } from 'react';
import { XFlow, XFlowGraph } from '@antv/xflow';
import { Button, Divider, Form, Input, List, Select, Slider } from 'antd';
import type { Graph, Node } from '@antv/x6';
import './index.css';

export const Component: React.FC = () => {
  const [graph, setGraph] = useState<Graph | null>(null);
  const [selectedElement, setSelectedElement] = useState<Node | Edge | null>(null);
  const [form] = Form.useForm();

  const nodes = [
    { id: 'start', label: '开始节点', type: 'start' },
    { id: 'end', label: '结束节点', type: 'end' },
    { id: 'approve', label: '审批节点', type: 'approve' },
    { id: 'condition', label: '条件节点', type: 'condition' }
  ];

  const initGraph = (graph: Graph) => {
    setGraph(graph);
    graph.on('node:selected', ({ node }) => setSelectedElement(node));
    graph.on('edge:selected', ({ edge }) => setSelectedElement(edge));
    graph.on('blank:click', () => setSelectedElement(null));

    graph.enableSelection();
    graph.enablePanning();
    graph.zoomTo(1);
  };

  const handleSave = () => {
    if (graph) {
      const data = graph.toJSON();
      console.log('画布数据:', data);
      // TODO: 实现保存到文件
    }
  };

  const handleExportSVG = () => {
    if (graph) {
      graph.toSVG(svg => {
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'flow-diagram.svg';
        link.click();
      });
    }
  };

  const handleExportJSON = () => {
    if (graph) {
      const jsonData = graph.toJSON();
      const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'flow-diagram.json';
      link.click();
    }
  };

  const updateNodeProperties = (values: any) => {
    if (selectedElement && selectedElement.isNode()) {
      selectedElement.setData(values);
      selectedElement.attr('label/text', values.label);
    }
  };

  const updateEdgeProperties = (values: any) => {
    if (selectedElement && selectedElement.isEdge()) {
      selectedElement.setLabels([{ attrs: { label: { text: values.label } } }]);
      selectedElement.setAttrs({
        line: {
          stroke: values.color,
          strokeWidth: values.width,
          targetMarker: {
            name: values.arrow ? 'block' : null
          }
        }
      });
    }
  };

  const handleDeleteElement = () => {
    if (selectedElement) {
      graph?.removeCell(selectedElement);
      setSelectedElement(null);
    }
  };

  return (
    <div className="flow-editor">
      <div className="toolbar">
        <Button onClick={handleSave}>保存</Button>
        <Button onClick={() => graph?.undo()}>撤销</Button>
        <Button onClick={() => graph?.redo()}>重做</Button>
        <Button onClick={handleExportJSON}>导出 JSON</Button>
        <Button onClick={handleExportSVG}>导出 SVG</Button>
      </div>

      <div className="flow-editor__body">
        <div className="node-list">
          <List
            header={<div>节点列表</div>}
            bordered
            dataSource={nodes}
            renderItem={node => (
              <List.Item
                draggable
                onDragStart={e => {
                  e.dataTransfer.setData('node/type', node.type);
                  e.dataTransfer.setData('node/label', node.label);
                }}
              >
                {node.label}
              </List.Item>
            )}
          />
        </div>

        <XFlow onLoad={initGraph}>
          <XFlowGraph />
        </XFlow>

        <div className="properties-panel">
          {selectedElement && selectedElement.isNode() && (
            <Form
              form={form}
              layout="vertical"
              onFinish={updateNodeProperties}
              initialValues={selectedElement.getData()}
            >
              <Form.Item
                label="标签"
                name="label"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="类型"
                name="type"
              >
                <Select>
                  <Select.Option value="start">开始节点</Select.Option>
                  <Select.Option value="end">结束节点</Select.Option>
                  <Select.Option value="approve">审批节点</Select.Option>
                  <Select.Option value="condition">条件节点</Select.Option>
                </Select>
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                更新属性
              </Button>
              <Divider />
              <Button
                danger
                onClick={handleDeleteElement}
              >
                删除节点
              </Button>
            </Form>
          )}

          {selectedElement && selectedElement.isEdge() && (
            <Form
              form={form}
              layout="vertical"
              onFinish={updateEdgeProperties}
              initialValues={{
                label: selectedElement.getLabels()[0]?.attrs?.label?.text,
                color: selectedElement.attr('line/stroke'),
                width: selectedElement.attr('line/strokeWidth'),
                arrow: selectedElement.attr('line/targetMarker/name') === 'block'
              }}
            >
              <Form.Item
                label="标签"
                name="label"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="颜色"
                name="color"
              >
                <Input type="color" />
              </Form.Item>
              <Form.Item
                label="宽度"
                name="width"
              >
                <Slider
                  min={1}
                  max={5}
                />
              </Form.Item>
              <Form.Item
                name="arrow"
                valuePropName="checked"
              >
                <Select>
                  <Select.Option value="true">有箭头</Select.Option>
                  <Select.Option value="false">无箭头</Select.Option>
                </Select>
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                更新连线属性
              </Button>
              <Divider />
              <Button
                danger
                onClick={handleDeleteElement}
              >
                删除连线
              </Button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};
