// 文件路径: src/components/Canvas.tsx

import React, { useEffect, useRef } from 'react';
import { Dnd } from '@antv/x6-plugin-dnd';
import { Export } from '@antv/x6-plugin-export';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { Selection } from '@antv/x6-plugin-selection';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { History } from '@antv/x6-plugin-history';
import { Scroller } from '@antv/x6-plugin-scroller';
import { MiniMap } from '@antv/x6-plugin-minimap';
import { Transform } from '@antv/x6-plugin-transform';

import { Graph, Shape } from '@antv/x6';

export const useGraph = () => {
  const [isReady, setIsReady] = useState(false);
  const containerParentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const miniMapRef = useRef<HTMLDivElement>(null);
  const [graphEntity, setGraphEntity] = useState<Graph | null>(null);
  const [dndEntity, setDndEntity] = useState<Dnd | null>(null);

  const getGraphAreaInfo = useCallback(() => {
    const graphWidth = (containerParentRef.current?.parentElement?.offsetWidth || 1000) - 200;
    const graphHeight = containerParentRef.current?.parentElement?.offsetHeight || 600;
    return { graphWidth, graphHeight };
  }, [containerParentRef]);

  useEffect(() => {
    if (!containerRef.current || !miniMapRef.current) {
      return;
    }

    const { graphWidth, graphHeight } = getGraphAreaInfo();
    const graph: Graph = new Graph({
      container: containerRef.current,
      width: graphWidth,
      height: graphHeight,
      // 网格
      grid: {
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#eee', // 主网格线颜色
            thickness: 1 // 主网格线宽度
          },
          {
            color: '#ddd', // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4 // 主次网格线间隔
          }
        ]
      },
      // 背景颜色
      background: {
        color: '#FFF'
      },
      // 画布缩放
      mousewheel: {
        enabled: true,
        global: false, // 画布范围
        modifiers: [], // 快捷键
        minScale: 0.2,
        maxScale: 4
      },
      // scaling: { // 视口变换
      //   min: 0.05, // 默认值为 0.01
      //   max: 12, // 默认值为 16
      // },
      // 画布平移, 画布平移和 Scroller 滚动画布 不能同时开启
      // panning: {
      //   enabled: true,
      //   modifiers: [], // 快捷键
      //   eventTypes: ['leftMouseDown'],
      // },
      highlighting: {
        // 连接桩可以被连接时在连接桩外围围渲染一个包围框
        magnetAvailable: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#A4DEB1',
              strokeWidth: 4
            }
          }
        },
        // 连接桩吸附连线时在连接桩外围围渲染一个包围框
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#31d0c6',
              strokeWidth: 4
            }
          }
        }
      },
      embedding: {
        enabled: true,
        findParent({ node }) {
          // 获取移动节点的包围盒
          const bbox = node.getBBox();
          // 找到 data 中配置 { parent: true } 的节点，并且移动节点和找到的节点包围盒相交时，返回 true
          return this.getNodes().filter(node => {
            const data = node.getData<{ parent: boolean }>();
            if (data && data.parent) {
              const targetBBox = node.getBBox();
              return bbox.isIntersectWithRect(targetBBox);
            }
            return false;
          });
        }
      },
      connecting: {
        router: 'manhattan',
        connector: {
          name: 'rounded',
          args: {
            radius: 8
          }
        },
        anchor: 'center',
        connectionPoint: 'anchor',

        allowNode: false,
        allowBlank: false,
        highlight: true,
        snap: {
          radius: 20
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#5F95FF',
                strokeWidth: 2,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8
                }
              }
            },
            zIndex: 0
          });
        },
        validateConnection({ targetMagnet }) {
          return Boolean(targetMagnet);
        }
      },

      interacting: true // 是否支持交互
    });
    window.__graphEntity = graph;

    // 插件 导出
    graph.use(new Export());
    // 插件 对齐线
    graph.use(
      new Snapline({
        enabled: true
      })
    );
    // 插件 剪切板
    graph.use(
      new Clipboard({
        enabled: true,
        useLocalStorage: true
      })
    );
    // 插件 选择区域
    graph.use(
      new Selection({
        enabled: true,
        showNodeSelectionBox: true
      })
    );
    // 插件 快捷键
    graph.use(
      new Keyboard({
        enabled: true,
        global: false
      })
    );
    // 插件 历史记录
    graph.use(
      new History({
        enabled: true
      })
    );

    // 插件 滚动画布
    graph.use(
      new Scroller({
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        autoResize: true,
        pannable: true
      })
    );
    // 插件 缩略图
    graph.use(
      new MiniMap({
        container: miniMapRef.current,
        width: 200,
        height: 160,
        padding: 10,
        minScale: 0.2,
        maxScale: 4,
        scalable: true
      })
    );

    // 插件 图形变换
    graph.use(
      new Transform({
        // resizing: true,
        rotating: true
      })
    );
    // graph.use(
    //   new Transform({
    //     rotating: {
    //       enabled: true,
    //       grid: 15
    //     },
    //     resizing: {
    //       enabled: true,
    //       minWidth: 1,
    //       maxWidth: 200,
    //       minHeight: 1,
    //       maxHeight: 150,
    //       orthogonal: false,
    //       restrict: false,
    //       preserveAspectRatio: false
    //     }
    //   })
    // );

    // 插件 拖拽功能
    const dnd: Dnd = new Dnd({
      target: graph,
      dndContainer: document.getElementById('dnd-container')!,
      getDragNode: node => node.clone({ keepId: true }), // 确保id一致
      getDropNode: node => node.clone({ keepId: true })
    });

    setGraphEntity(graph);
    setDndEntity(dnd);
    setIsReady(true);

    // eslint-disable-next-line consistent-return
    return () => {
      graph.dispose();
    };
  }, []);

  return { containerParentRef, containerRef, miniMapRef, graphEntity, dndEntity, getGraphAreaInfo, isReady };
};
