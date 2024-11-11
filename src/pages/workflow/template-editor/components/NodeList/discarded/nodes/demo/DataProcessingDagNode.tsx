import React from 'react';
import type { Graph, Node } from '@antv/x6';
import { Edge, Path, Platform, StringExt } from '@antv/x6';
import { Selection } from '@antv/x6-plugin-selection';
import classnames from 'classnames';
import insertCss from 'insert-css';
import { register } from '@antv/x6-react-shape';
import { Dropdown, Tooltip } from 'antd';

// 节点类型
enum NodeType {
  INPUT = 'INPUT', // 数据输入
  FILTER = 'FILTER', // 数据过滤
  JOIN = 'JOIN', // 数据连接
  UNION = 'UNION', // 数据合并
  AGG = 'AGG', // 数据聚合
  OUTPUT = 'OUTPUT' // 数据输出
}

// 元素校验状态
enum CellStatus {
  DEFAULT = 'default',
  SUCCESS = 'success',
  ERROR = 'error'
}

// 节点位置信息
interface Position {
  x: number;
  y: number;
}

// 加工类型列表
const PROCESSING_TYPE_LIST = [
  {
    type: 'FILTER',
    name: '数据筛选'
  },
  {
    type: 'JOIN',
    name: '数据连接'
  },
  {
    type: 'UNION',
    name: '数据合并'
  },
  {
    type: 'AGG',
    name: '数据聚合'
  },

  {
    type: 'OUTPUT',
    name: '数据输出'
  }
];

// 不同节点类型的icon
const NODE_TYPE_LOGO = {
  INPUT: 'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*RXnuTpQ22xkAAAAAAAAAAAAADtOHAQ/original', // 数据输入
  FILTER: 'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*ZJ6qToit8P4AAAAAAAAAAAAADtOHAQ/original', // 数据筛选
  JOIN: 'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*EHqyQoDeBvIAAAAAAAAAAAAADtOHAQ/original', // 数据连接
  UNION: 'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*k4eyRaXv8gsAAAAAAAAAAAAADtOHAQ/original', // 数据合并
  AGG: 'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*TKG8R6nfYiAAAAAAAAAAAAAADtOHAQ/original', // 数据聚合
  OUTPUT: 'https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*zUgORbGg1HIAAAAAAAAAAAAADtOHAQ/original' // 数据输出
};

/**
 * 根据起点初始下游节点的位置信息
 *
 * @param node 起始节点
 * @param graph
 * @returns
 */
const getDownstreamNodePosition = (node: Node, graph: Graph, dx = 250, dy = 100) => {
  // 找出画布中以该起始节点为起点的相关边的终点id集合
  const downstreamNodeIdList: string[] = [];
  graph.getEdges().forEach(edge => {
    const originEdge = edge.toJSON()?.data;
    if (originEdge.source === node.id) {
      downstreamNodeIdList.push(originEdge.target);
    }
  });
  // 获取起点的位置信息
  const position = node.getPosition();
  let minX = Infinity;
  let maxY = -Infinity;
  graph.getNodes().forEach(graphNode => {
    if (downstreamNodeIdList.includes(graphNode.id)) {
      const nodePosition = graphNode.getPosition();
      // 找到所有节点中最左侧的节点的x坐标
      if (nodePosition.x < minX) {
        minX = nodePosition.x;
      }
      // 找到所有节点中最x下方的节点的y坐标
      if (nodePosition.y > maxY) {
        maxY = nodePosition.y;
      }
    }
  });

  return {
    x: minX !== Infinity ? minX : position.x + dx,
    y: maxY !== -Infinity ? maxY + dy : position.y
  };
};

// 根据节点的类型获取ports
const getPortsByType = (type: NodeType, nodeId: string) => {
  let ports = [];
  switch (type) {
    case NodeType.INPUT:
      ports = [
        {
          id: `${nodeId}-out`,
          group: 'out'
        }
      ];
      break;
    case NodeType.OUTPUT:
      ports = [
        {
          id: `${nodeId}-in`,
          group: 'in'
        }
      ];
      break;
    default:
      ports = [
        {
          id: `${nodeId}-in`,
          group: 'in'
        },
        {
          id: `${nodeId}-out`,
          group: 'out'
        }
      ];
      break;
  }
  return ports;
};

/**
 * 创建节点并添加到画布
 *
 * @param type 节点类型
 * @param graph
 * @param position 节点位置
 * @returns
 */
export const createNode = (type: NodeType, graph: Graph, position?: Position) => {
  if (!graph) {
    return {};
  }
  let newNode = {};
  const sameTypeNodes = graph.getNodes().filter(item => item.getData()?.type === type);
  const typeName = PROCESSING_TYPE_LIST?.find(item => item.type === type)?.name;
  const id = StringExt.uuid();
  const node = {
    id,
    shape: 'data-processing-dag-node',
    x: position?.x,
    y: position?.y,
    ports: getPortsByType(type, id),
    data: {
      name: `${typeName}_${sameTypeNodes.length + 1}`,
      type
    }
  };
  newNode = graph.addNode(node);
  return newNode;
};

/**
 * 创建边并添加到画布
 *
 * @param source
 * @param target
 * @param graph
 */
const createEdge = (source: string, target: string, graph: Graph) => {
  const edge = {
    id: StringExt.uuid(),
    shape: 'data-processing-curve',
    source: {
      cell: source,
      port: `${source}-out`
    },
    target: {
      cell: target,
      port: `${target}-in`
    },
    zIndex: -1,
    data: {
      source,
      target
    }
  };
  if (graph) {
    graph.addEdge(edge);
  }
};

class DataProcessingDagNode extends React.Component<{
  node: Node;
}> {
  state = {
    plusActionSelected: false
  };

  // 创建下游的节点和边
  createDownstream = (type: NodeType) => {
    const { node } = this.props;
    const { graph } = node.model || {};
    if (graph) {
      // 获取下游节点的初始位置信息
      const position = getDownstreamNodePosition(node, graph);
      // 创建下游节点
      const newNode = createNode(type, graph, position);
      const source = node.id;
      const target = newNode.id;
      // 创建该节点出发到下游节点的边
      createEdge(source, target, graph);
    }
  };

  // 点击添加下游+号
  clickPlusDragMenu = (type: NodeType) => {
    this.createDownstream(type);
    this.setState({
      plusActionSelected: false
    });
  };

  //  获取+号下拉菜单
  getPlusDagMenu = () => {
    return (
      <ul>
        {PROCESSING_TYPE_LIST.map(item => {
          const content = (
            // eslint-disable-next-line
            <a onClick={() => this.clickPlusDragMenu(item.type)}>
              <i
                className="node-mini-logo"
                style={{ backgroundImage: `url(${NODE_TYPE_LOGO[item.type]})` }}
              />

              <span>{item.name}</span>
            </a>
          );
          return (
            <li
              className="each-sub-menu"
              key={item.type}
            >
              {content}
            </li>
          );
        })}
      </ul>
    );
  };

  // 添加下游菜单的打开状态变化
  onPlusDropdownOpenChange = (value: boolean) => {
    this.setState({
      plusActionSelected: value
    });
  };

  // 鼠标进入矩形主区域的时候显示连接桩
  onMainMouseEnter = () => {
    const { node } = this.props;
    // 获取该节点下的所有连接桩
    const ports = node.getPorts() || [];
    ports.forEach(port => {
      node.setPortProp(port.id, 'attrs/circle', {
        fill: '#fff',
        stroke: '#85A5FF'
      });
    });
  };

  // 鼠标离开矩形主区域的时候隐藏连接桩
  onMainMouseLeave = () => {
    const { node } = this.props;
    // 获取该节点下的所有连接桩
    const ports = node.getPorts() || [];
    ports.forEach(port => {
      node.setPortProp(port.id, 'attrs/circle', {
        fill: 'transparent',
        stroke: 'transparent'
      });
    });
  };

  render() {
    const { plusActionSelected } = this.state;
    const { node } = this.props;
    const data = node?.getData();
    const { name, type, status, statusMsg } = data;

    return (
      <div className="data-processing-dag-node">
        <div
          className="main-area"
          onMouseEnter={this.onMainMouseEnter}
          onMouseLeave={this.onMainMouseLeave}
        >
          <div className="main-info">
            {/* 节点类型icon */}
            <i
              className="node-logo"
              style={{ backgroundImage: `url(${NODE_TYPE_LOGO[type]})` }}
            />
            <Tooltip
              title={name}
              mouseEnterDelay={0.8}
            >
              <div className="ellipsis-row node-name">{name}</div>
            </Tooltip>
          </div>

          {/* 节点状态信息 */}
          <div className="status-action">
            {status === CellStatus.ERROR && (
              <Tooltip title={statusMsg}>
                <i className="status-icon status-icon-error" />
              </Tooltip>
            )}
            {status === CellStatus.SUCCESS && <i className="status-icon status-icon-success" />}

            {/* 节点操作菜单 */}
            <div className="more-action-container">
              <i className="more-action" />
            </div>
          </div>
        </div>

        {/* 添加下游节点 */}
        {type !== NodeType.OUTPUT && (
          <div className="plus-dag">
            <Dropdown
              dropdownRender={this.getPlusDagMenu}
              overlayClassName="processing-node-menu"
              trigger={['click']}
              placement="bottom"
              open={plusActionSelected}
              onOpenChange={this.onPlusDropdownOpenChange}
            >
              <i
                className={classnames('plus-action', {
                  'plus-action-selected': plusActionSelected
                })}
              />
            </Dropdown>
          </div>
        )}
      </div>
    );
  }
}
