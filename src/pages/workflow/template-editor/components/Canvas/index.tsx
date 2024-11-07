// 文件路径: src/components/Canvas.tsx

import React, { useEffect, useRef } from 'react';

import { useGraphContext } from '../../context/graph.context';
import { useGraph } from '../../hooks/useGraph';

interface CanvasProps {
  onNodeSelect: (node: any) => void;
}

const Canvas: React.FC<CanvasProps> = ({ onNodeSelect }) => {
  const { containerRef, miniMapRef, graphEntity: graph, dndEntity: dnd, getGraphAreaInfo, isReady } = useGraph();
  const { setGraph, setGraphDnd, setHistory } = useGraphContext()


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
      onNodeSelect(node);
    });

  }, [isReady, onNodeSelect])

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
