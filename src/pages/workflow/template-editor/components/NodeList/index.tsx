// 文件路径: src/components/NodeList.tsx

import React from 'react';
import { Card, List } from 'antd';

import { Color, Markup } from '@antv/x6';
import { useGraphContext } from '../../context/graph.context';
import registerCustomHTMLNode from './nodes/HTMLNode';
import { registerCustomPortalReactNode } from './nodes/CardNode';

registerCustomHTMLNode();
registerCustomPortalReactNode();

const nodeList = [
  { name: '开始节点', shape: 'rect', width: 140, height: 80, type: 'start' },
  { name: 'HTML节点', shape: 'custom-html', width: 60, height: 100, type: 'start' },
  { name: 'Antd 进度节点', shape: 'custom-portal-react-node', width: 100, height: 100, type: 'start' },
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
        id: `${Math.random().toString(36).slice(2)}-${Date.now()}`,
        label: item.name,
        shape: item.shape || 'rect',
        width: item.width || 100,
        height: item.height || 40,
        data: {
          color: '#333232',
          progress: 30
        },
        ports: {
          items: [
            { group: 'in', id: 'in1' },
            { group: 'in', id: 'in2' },
            { group: 'out', id: 'out1' },
            { group: 'out', id: 'out2' }
          ],
          groups: {
            in: {
              position: { name: 'top' },
              attrs: {
                fo: {
                  width: 12,
                  height: 12,
                  x: -6,
                  y: -6,
                  magnet: 'true'
                }
              },
              zIndex: 1
            },
            out: {
              position: { name: 'bottom' },
              attrs: {
                fo: {
                  width: 12,
                  height: 12,
                  x: -6,
                  y: -6,
                  magnet: 'true'
                }
              },
              zIndex: 1
            }
          }
        }
        // portMarkup: [Markup.getForeignObjectMarkup()]

        // tools: ['button-remove']
      });

      graphDnd.start(node, e.nativeEvent);
    };
  };

  return (
    <Card title="节点列表">
      <List
        id="dnd-container"
        className="cursor-pointer text-center"
        dataSource={nodeList}
        renderItem={item => <List.Item onMouseDown={getStartDrag(item)}>{item.name}</List.Item>}
      />
    </Card>
  );
};

export default NodeList;
