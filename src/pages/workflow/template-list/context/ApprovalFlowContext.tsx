// ApprovalFlowContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ApprovalFlow {
  id: number;
  name: string;
  type: string;
  creator: string;
  createTime: string;
  updateTime: string;
  enabled: boolean;
}

interface ApprovalFlowContextProps {
  approvalFlows: ApprovalFlow[];
  addApprovalFlow: (flow: ApprovalFlow) => void;
  updateApprovalFlow: (flow: ApprovalFlow) => void;
  deleteApprovalFlow: (id: number) => void;
  toggleEnableApprovalFlow: (id: number) => void;
}

const ApprovalFlowContext = createContext<ApprovalFlowContextProps | undefined>(undefined);

export const ApprovalFlowProvider: React.FC = ({ children }) => {
  const [approvalFlows, setApprovalFlows] = useState<ApprovalFlow[]>([]);

  useEffect(() => {
    const storedFlows = localStorage.getItem('approvalFlows');
    if (storedFlows) {
      setApprovalFlows(JSON.parse(storedFlows));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('approvalFlows', JSON.stringify(approvalFlows));
  }, [approvalFlows]);

  const addApprovalFlow = (flow: ApprovalFlow) => {
    setApprovalFlows([...approvalFlows, flow]);
  };

  const updateApprovalFlow = (flow: ApprovalFlow) => {
    setApprovalFlows(approvalFlows.map(f => (f.id === flow.id ? flow : f)));
  };

  const deleteApprovalFlow = (id: number) => {
    setApprovalFlows(approvalFlows.filter(f => f.id !== id));
  };

  const toggleEnableApprovalFlow = (id: number) => {
    setApprovalFlows(approvalFlows.map(f => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
  };

  return (
    <ApprovalFlowContext.Provider
      value={{
        approvalFlows,
        addApprovalFlow,
        updateApprovalFlow,
        deleteApprovalFlow,
        toggleEnableApprovalFlow
      }}
    >
      {children}
    </ApprovalFlowContext.Provider>
  );
};

export const useApprovalFlowContext = () => {
  const context = useContext(ApprovalFlowContext);
  if (!context) {
    throw new Error('useApprovalFlowContext must be used within an ApprovalFlowProvider');
  }
  return context;
};
