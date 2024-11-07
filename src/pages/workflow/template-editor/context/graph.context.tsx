import type { Graph } from '@antv/x6';
import type { Dnd } from '@antv/x6-plugin-dnd';
import React, { createContext, useContext, useState } from 'react';

export interface GraphContextType {
  graph: Graph;
  setGraph: React.Dispatch<React.SetStateAction<Graph>>;
  graphDnd: Dnd;
  setGraphDnd: React.Dispatch<React.SetStateAction<Dnd>>;
  history: {
    canRedo: boolean;
    canUndo: boolean;
  };
  setHistory: React.Dispatch<
    React.SetStateAction<{
      canRedo: boolean;
      canUndo: boolean;
    }>
  >;
}

const GraphContext = createContext<GraphContextType | undefined>({});

export const GraphProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [graph, setGraph] = useState<any>();
  const [graphDnd, setGraphDnd] = useState<any>();
  const [history, setHistory] = useState<any>({ canRedo: false, canUndo: false });

  return (
    <GraphContext.Provider value={{ graph, setGraph, graphDnd, setGraphDnd, history, setHistory }}>
      {children}
    </GraphContext.Provider>
  );
};

export const useGraphContext = () => {
  const context = useContext(GraphContext) as GraphContextType;
  if (!context) {
    throw new Error('useGraphContext must be used within a GraphProvider');
  }
  return context;
};
