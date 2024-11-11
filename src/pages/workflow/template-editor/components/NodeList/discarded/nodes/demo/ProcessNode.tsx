import React, { useState } from 'react';
import type { Node } from '@antv/x6';
import { Graph } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import { Card, Progress } from 'antd';
import { useDataContext } from '../../../../context/data.context';

const NodeComponent = ({ node }: { node: Node }) => {
  // const { progress } = node.getData();

  const { progress } = useDataContext();

  return (
    <div className="perspective-600 rounded-xl bg-white shadow-black/25 shadow-lg">
      <Progress
        type="circle"
        percent={progress}
        size={100}
      />
    </div>
  );
};

export const registerCustomPortalReactNode = () => {
  register({
    shape: 'custom-portal-react-node',
    width: 100,
    height: 100,
    component: NodeComponent,
    effect: ['data'],
    ports: {
      items: [
        {
          id: 'port_1',
          group: 'top'
        },
        {
          id: 'port_2',
          group: 'top'
        },
        {
          id: 'port_3',
          group: 'bottom'
        },
        {
          id: 'port_4',
          group: 'bottom'
        }
      ]
    }
  });
};
