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

    graph.bindKey('ctrl+c', () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.copy(cells);
      }
      return false;
    });

    graph.bindKey('ctrl+v', () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 });
        graph.cleanSelection();
        graph.select(cells);
      }
      return false;
    });

    graph.bindKey('delete', () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }

      return false;
    });

    window.__x6_instances__ = [];
    setGraph(graph);
    setGraphDnd(dnd);
    window.__x6_instances__.push(graph);

    // 事件：节点选择
    graph.on('node:click', ({ node }) => {
      setSelectedNode(node);
    });

    // graph.on('cell:mouseenter', ({ cell }) => {
    //   if (cell.isNode()) {
    //     cell.addTools([
    //       {
    //         name: 'boundary',
    //         args: {
    //           attrs: {
    //             fill: '#7c68fc',
    //             stroke: '#333',
    //             'stroke-width': 1,
    //             'fill-opacity': 0.2,
    //           },
    //         },
    //       },
    //       {
    //         name: 'button-remove',
    //         args: {
    //           x: 0,
    //           y: 0,
    //           offset: { x: 10, y: 10 },
    //         },
    //       },
    //     ])
    //   } else {
    //     cell.addTools(['vertices', 'segments'])
    //   }
    // })

    // graph.on('cell:mouseleave', ({ cell }) => {
    //   cell.removeTools()
    // })

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
