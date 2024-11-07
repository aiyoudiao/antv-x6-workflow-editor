// 文件路径: src/components/NodeList.tsx

import React from 'react';
import { Card, List } from 'antd';

import './nodes/HTMLNode';
import { Color } from '@antv/x6';
import { useGraphContext } from '../../context/graph.context';

const nodeList = [
  { name: '开始节点', shape: 'rect', width: 140, height: 80, type: 'start' },
  { name: 'HTML节点', shape: 'custom-html', width: 60, height: 100, type: 'start' },
  { name: '结束节点', type: 'end' },
  { name: '审批节点', type: 'approval' },
  { name: '条件节点', type: 'condition' }
];

const NodeList: React.FC = () => {
  const { graph, graphDnd } = useGraphContext();
  const getStartDrag = (item: any) => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      // 该 node 为拖拽的节点，默认也是放置到画布上的节点，可以自定义任何属性
      const node = graph.createNode({
        label: item.name,
        shape: item.shape || 'rect',
        width: item.width || 100,
        height: item.height || 40,
        data: {
          color: '#333232'
        }
      });

      setInterval(() => {
        node.setData({
          color: Color.random().toHex()
        });
      }, 2000);

      graphDnd.start(node, e.nativeEvent);
    };
  };

  return (
    <Card title="节点列表">
      <List
        className="cursor-pointer text-center"
        dataSource={nodeList}
        renderItem={item => <List.Item onMouseDown={getStartDrag(item)}>{item.name}</List.Item>}
      />
    </Card>
  );
};

export default NodeList;
