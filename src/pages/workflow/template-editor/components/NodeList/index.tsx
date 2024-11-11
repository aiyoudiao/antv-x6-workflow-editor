// 文件路径: src/components/NodeList.tsx

import React from 'react';
import { Card } from 'antd';

import { useGraphContext } from '../../context/graph.context';
import { nodeList, ports } from './components';

const NodeList: React.FC = () => {
  const { graph, graphDnd } = useGraphContext();

  const getStartDrag = (item: any) => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      // 该 node 为拖拽的节点，默认也是放置到画布上的节点，可以自定义任何属性
      const node = graph.createNode({
        id: `${Math.random().toString(36).slice(2)}-${Date.now()}`,
        ...item,
        ports,
        // ports: {
        //   items: [
        //     {
        //       group: 'in',
        //       id: 'in1',
        //       attrs: {
        //         circle: {
        //           r: 5,
        //           magnet: true,
        //           fill: '#fff',
        //           stroke: '#31d0c6',
        //           strokeWidth: 2,
        //           style: {
        //             visibility: 'hidden'
        //           }
        //         }
        //       }
        //     },
        //     {
        //       group: 'out',
        //       id: 'out1',
        //       attrs: {
        //         circle: {
        //           r: 5,
        //           magnet: true,
        //           fill: '#fff',
        //           stroke: '#31d0c6',
        //           strokeWidth: 2,
        //           style: {
        //             visibility: 'hidden'
        //           }
        //         }
        //       }
        //     }
        //   ],
        //   groups: {
        //     in: {
        //       position: { name: 'top' },
        //       attrs: {
        //         fo: {
        //           width: 12,
        //           height: 12,
        //           x: -6,
        //           y: -6,
        //           magnet: 'true'
        //         }
        //       },
        //       zIndex: 1
        //     },
        //     out: {
        //       position: { name: 'bottom' },
        //       attrs: {
        //         fo: {
        //           width: 12,
        //           height: 12,
        //           x: -6,
        //           y: -6,
        //           magnet: 'true'
        //         }
        //       },
        //       zIndex: 1
        //     }
        //   }
        // },

        // portMarkup: [Markup.getForeignObjectMarkup()],

        tools: ['button-remove']
      });

      graphDnd.start(node, e.nativeEvent);
    };
  };

  return (
    <Card
      title="节点列表"
      id="dnd-container"
      className="cursor-pointer text-center"
    >
      {nodeList.map(item => (
        <Card.Grid
          key={item.label}
          className="text-center font-semibold !w-[50%] !rounded-lg !pl-0 !pr-0"
          onMouseDown={getStartDrag(item)}
        >
          {item.label}
        </Card.Grid>
      ))}
      {/* <List
        id="dnd-container"
        className="cursor-pointer text-center"
        dataSource={nodeList}
        renderItem={item => <List.Item onMouseDown={getStartDrag(item)}>{item.name}</List.Item>}
      /> */}
    </Card>
  );
};

export default NodeList;
