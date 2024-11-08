import React, { createContext, useState } from 'react';
import { Portal } from '@antv/x6-react-shape';

export interface DataContextType {
  cardList: any[];
  setCardList: React.Dispatch<React.SetStateAction<any[]>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  selectedNode: any;
  setSelectedNode: React.Dispatch<React.SetStateAction<any>>;
}

const DataPortalProvider = Portal.getProvider();
const DataContext = createContext<DataContextType | undefined>({});

/**
 * ## 数据设计
 *
 * 数据设计：通过 createContext 创建一个数据上下文，然后通过 useContext 来使用这个数据
 *
 * 目的有两个，一是为了使用 react state 来管理数据，另一个是为了 图数据和最终表单的数据隔离
 */
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState<any>({});
  const [cardList, setCardList] = useState<any[]>([]);
  const [progress, setProgress] = useState<number>(0);

  return (
    <DataContext.Provider value={{ cardList, setCardList, progress, setProgress, selectedNode, setSelectedNode }}>
      <DataPortalProvider></DataPortalProvider>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext) as DataContextType;
  if (!context) {
    throw new Error('useDataContext must be used within a GraphProvider');
  }
  return context;
};
