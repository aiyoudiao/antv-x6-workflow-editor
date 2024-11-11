import React from 'react';
import type { Node } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import { Card, ConfigProvider } from 'antd';

import {
  ArrowRightOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';

import { useDataContext } from '../../../../context/data.context';

export const ApproverNode = ({ node }: { node: Node }) => {
  const { loading } = useDataContext();

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            /* 这里是你的组件 token */
            headerBg: '#f78f5f',
            extraColor: '#fff'
          }
        }
      }}
    >
      <Card
        size="small"
        loading={loading}
        actions={[<EditOutlined key="edit" />, <SettingOutlined key="setting" />, <EllipsisOutlined key="ellipsis" />]}
        title={
          <span className="text-white">
            <TeamOutlined /> 审批人
          </span>
        }
        extra={<ArrowRightOutlined className="font-semibold" />}
      >
        <Card.Meta
          description={
            <>
              <p>请指定审批人</p>
            </>
          }
        />
      </Card>
    </ConfigProvider>
  );
};

const normalConfig = {
  shape: 'ApproverNode',
  width: 300,
  height: 125,
  component: ApproverNode,
  effect: ['data']
};

const registerApproverNode = () => register(normalConfig);

ApproverNode.getNodeConfig = () => {
  registerApproverNode();
  const config = {
    ...normalConfig,
    label: '审批人',
    ports: {
      items: [
        {
          group: 'in',
          id: 'in1',
          attrs: {
            circle: {
              r: 5,
              magnet: true,
              stroke: '#000',
              strokeWidth: 2,
              fill: 'transparent'
            }
          }
        },
        {
          group: 'in',
          id: 'in2',
          attrs: {
            circle: {
              r: 5,
              magnet: true,
              stroke: '#000',
              strokeWidth: 2,
              fill: 'transparent'
            }
          }
        },
        {
          group: 'out',
          id: 'out1',
          attrs: {
            circle: {
              r: 5,
              magnet: true,
              stroke: '#000',
              strokeWidth: 2,
              fill: 'transparent'
            }
          }
        },
        {
          group: 'out',
          id: 'out2',
          attrs: {
            circle: {
              r: 5,
              magnet: true,
              stroke: '#000',
              strokeWidth: 2,
              fill: 'transparent'
            }
          }
        }
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
    },
    data: {
      color: '#333232',
      progress: 30
    },
    tools: ['button-remove']
  };

  return config;
};
