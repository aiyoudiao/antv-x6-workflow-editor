import React from 'react';
import type { Node } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import { Card, Typography } from 'antd';

import { ArrowRightOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

import { useDataContext } from '../../../../context/data.context';

const { Title } = Typography;

const CardNodeComponent = ({ node }: { node: Node }) => {
  const { loading } = useDataContext();

  return (
    <Card
      loading={loading}
      actions={[<EditOutlined key="edit" />, <SettingOutlined key="setting" />, <EllipsisOutlined key="ellipsis" />]}
      style={{ minWidth: 300 }}
      title={<Title level={5}>发起人</Title>}
      extra={<ArrowRightOutlined />}
    >
      <Card.Meta
        avatar={<UserOutlined />}
        description={
          <>
            <p>所有人</p>
          </>
        }
      />
    </Card>
  );
};

const normalConfig = {
  shape: 'custom-portal-react-node',
  width: 300,
  height: 150,
  component: CardNodeComponent,
  effect: ['data']
};

export const registerCardNodeComponent = () => register(normalConfig);

export const getConfig = () => {
  const config = {
    ...normalConfig,
    name: '开始节点',
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
  };
};
