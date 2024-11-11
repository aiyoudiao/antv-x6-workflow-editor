import { Graph } from '@antv/x6';
import { SponsorNode } from './SponsorNode';
import { ApproverNode } from './ApproverNode';
import { HandlerNode } from './HandlerNode';
import { CCPeopleNode } from './CCPeopleNode';
import { ConditionalBranchNode } from './ConditionalBranchNode';
import { ParallelBranchNode } from './ParallelBranchNode';
import { InclusiveBranchNode } from './InclusiveBranchNode';
import { SubprocessNode } from './SubprocessNode';
import { DelayWaitNode } from './DelayWaitNode';
import { TriggerNode } from './TriggerNode';

export const nodeList = [
  SponsorNode.getNodeConfig(),
  ApproverNode.getNodeConfig(),
  HandlerNode.getNodeConfig(),
  CCPeopleNode.getNodeConfig(),
  ConditionalBranchNode.getNodeConfig(),
  ParallelBranchNode.getNodeConfig(),
  InclusiveBranchNode.getNodeConfig(),
  SubprocessNode.getNodeConfig(),
  DelayWaitNode.getNodeConfig(),
  TriggerNode.getNodeConfig()
];

export const ports = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 5,
          magnet: true,
          stroke: '#31d0c6',
          strokeWidth: 2,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 5,
          magnet: true,
          stroke: '#31d0c6',
          strokeWidth: 2,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 5,
          magnet: true,
          stroke: '#31d0c6',
          strokeWidth: 2,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 5,
          magnet: true,
          stroke: '#31d0c6',
          strokeWidth: 2,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    }
  },
  items: [
    {
      group: 'top'
    },
    {
      group: 'right'
    },
    {
      group: 'bottom'
    },
    {
      group: 'left'
    }
  ]
};
