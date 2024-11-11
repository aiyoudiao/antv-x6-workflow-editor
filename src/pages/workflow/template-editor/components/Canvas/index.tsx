// 文件路径: src/components/Canvas.tsx

import React, { useEffect, useRef } from 'react';

import { useGraphContext } from '../../context/graph.context';
import { useGraph } from '../../hooks/useGraph';
import { useDataContext } from '../../context/data.context';

interface CanvasProps {
}

const Canvas: React.FC<CanvasProps> = () => {
  const { containerRef, miniMapRef, graphEntity: graph, dndEntity: dnd, getGraphAreaInfo, isReady } = useGraph();
  const { setGraph, setGraphDnd, setHistory } = useGraphContext()
  const { setSelectedNode } = useDataContext()


  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!containerRef.current || !miniMapRef.current || !graph || !dnd) {
      return;
    }
    // 监听画布大小变化
    containerRef.current.parentElement!.addEventListener('resize', () => {
      const { graphWidth, graphHeight } = getGraphAreaInfo();
      graph.resize(graphWidth, graphHeight);
    });

    graph.on('history:change', () => {
      setHistory({
        canRedo: graph.canRedo(),
        canUndo: graph.canUndo()
      });
    });

    graph.bindKey(['meta+c', 'ctrl+c'], () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.copy(cells)
      }
      return false
    })
    graph.bindKey(['meta+x', 'ctrl+x'], () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.cut(cells)
      }
      return false
    })
    graph.bindKey(['meta+v', 'ctrl+v'], () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 })
        graph.cleanSelection()
        graph.select(cells)
      }
      return false
    })

    // undo redo
    graph.bindKey(['meta+z', 'ctrl+z'], () => {
      if (graph.canUndo()) {
        graph.undo()
      }
      return false
    })
    graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
      if (graph.canRedo()) {
        graph.redo()
      }
      return false
    })

    // select all
    graph.bindKey(['meta+a', 'ctrl+a'], () => {
      const nodes = graph.getNodes()
      if (nodes) {
        graph.select(nodes)
      }
    })

    // delete
    graph.bindKey(['backspace', 'delete'], () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.removeCells(cells)
      }
    })

    // zoom
    graph.bindKey(['ctrl+1', 'meta+1'], () => {
      const zoom = graph.zoom()
      if (zoom < 1.5) {
        graph.zoom(0.1)
      }
    })
    graph.bindKey(['ctrl+2', 'meta+2'], () => {
      const zoom = graph.zoom()
      if (zoom > 0.5) {
        graph.zoom(-0.1)
      }
    })

    // 控制连接桩显示/隐藏
    const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
      for (let i = 0, len = ports.length; i < len; i += 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    }
    graph.on('node:mouseenter', () => {
      const container = containerRef.current!
      const ports = container.querySelectorAll(
        '.x6-port-body',
      ) as NodeListOf<SVGElement>
      showPorts(ports, true)
    })
    graph.on('node:mouseleave', () => {
      const container = containerRef.current!
      const ports = container.querySelectorAll(
        '.x6-port-body',
      ) as NodeListOf<SVGElement>
      showPorts(ports, false)
    })



    window.__x6_instances__ = [];
    setGraph(graph);
    setGraphDnd(dnd);
    window.__x6_instances__.push(graph);

    // 事件：节点选择
    graph.on('node:click', ({ node }) => {
      setSelectedNode(node);
    });



    graph.on('cell:mouseenter', ({ cell }) => {
      // if (cell.isNode()) {
      //   cell.addTools([
      //     {
      //       name: 'boundary',
      //       args: {
      //         attrs: {
      //           fill: '#7c68fc',
      //           stroke: '#333',
      //           'stroke-width': 1,
      //           'fill-opacity': 0.2,
      //         },
      //       },
      //     },
      //     {
      //       name: 'button-remove',
      //       args: {
      //         x: 0,
      //         y: 0,
      //         offset: { x: 10, y: 10 },
      //       },
      //     },
      //   ])
      // } else {
      if (cell.isEdge())
        cell.addTools(['vertices', 'segments'])
      // }
    })

    graph.on('cell:mouseleave', ({ cell }) => {
      if (cell.isEdge()) {
        cell.removeTools()
      }
    })


  }, [isReady])

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="absolute w-full h-full top-0 left-0"
      />
      <div ref={miniMapRef} className="absolute right-3 bottom-3" />
    </div>
  );
};

export default Canvas;
