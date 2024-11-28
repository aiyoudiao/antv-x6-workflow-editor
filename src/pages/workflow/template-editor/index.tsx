// 文件路径: src/pages/FlowEditor.tsx

import React from 'react';
import { Layout } from 'antd';
import { OverlayProvider } from 'overlay-hook';
import { ProCard } from '@ant-design/pro-components';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import NodeList from './components/NodeList';
import { GraphProvider } from './context/graph.context';
import { DataProvider } from './context/data.context';

const { Header, Sider } = Layout;

export const Component: React.FC = () => {
  return (
    <ProCard className="h-full">
      <OverlayProvider>
        <DataProvider>
          <GraphProvider>
            <Layout style={{ height: '100%' }}>
              {/* 左侧节点列表 */}

              <Header className="relative left-0 top-0 bg-white">
                <Toolbar />
              </Header>
              <Layout style={{ height: '100%' }}>
                <Sider
                  width={200}
                  theme="light"
                >
                  <NodeList />
                </Sider>
                <Canvas />
                {/* 右侧属性编辑器 */}
                {/* <Sider
              width={300}
              theme="light"
            >
              <PropertyEditor />
            </Sider> */}
              </Layout>
            </Layout>
          </GraphProvider>
        </DataProvider>
      </OverlayProvider>
    </ProCard>
  );
};
