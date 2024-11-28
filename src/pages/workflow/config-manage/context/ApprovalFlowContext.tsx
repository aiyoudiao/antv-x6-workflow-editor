// ApprovalFlowContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ApprovalType {
  id: number;
  name: string;
  parentId: number;
  categoryParentId: number;
  flowParentId: number;
}

interface ApprovalCondition {
  typeId: number;
  fieldName: string;
  operator: string;
  value: string;
}

interface ApprovalEvent {
  eventId: number;
  eventName: string;
}

interface ApprovalFlowContextProps {
  approvalTypes: ApprovalType[];
  approvalConditions: ApprovalCondition[];
  approvalEvents: ApprovalEvent[];
  addApprovalType: (type: ApprovalType) => void;
  updateApprovalType: (type: ApprovalType) => void;
  deleteApprovalType: (id: number) => void;
  addApprovalCondition: (condition: ApprovalCondition) => void;
  updateApprovalCondition: (condition: ApprovalCondition) => void;
  deleteApprovalCondition: (typeId: number) => void;
  addApprovalEvent: (event: ApprovalEvent) => void;
  updateApprovalEvent: (event: ApprovalEvent) => void;
  deleteApprovalEvent: (eventId: number) => void;
}

const ApprovalFlowContext = createContext<ApprovalFlowContextProps | undefined>(undefined);

export const ApprovalFlowProvider: React.FC = ({ children }) => {
  const [approvalTypes, setApprovalTypes] = useState<ApprovalType[]>([]);
  const [approvalConditions, setApprovalConditions] = useState<ApprovalCondition[]>([]);
  const [approvalEvents, setApprovalEvents] = useState<ApprovalEvent[]>([]);

  useEffect(() => {
    const storedTypes = localStorage.getItem('approvalTypes');
    const storedConditions = localStorage.getItem('approvalConditions');
    const storedEvents = localStorage.getItem('approvalEvents');
    if (storedTypes) setApprovalTypes(JSON.parse(storedTypes));
    if (storedConditions) setApprovalConditions(JSON.parse(storedConditions));
    if (storedEvents) setApprovalEvents(JSON.parse(storedEvents));
  }, []);

  useEffect(() => {
    localStorage.setItem('approvalTypes', JSON.stringify(approvalTypes));
  }, [approvalTypes]);

  useEffect(() => {
    localStorage.setItem('approvalConditions', JSON.stringify(approvalConditions));
  }, [approvalConditions]);

  useEffect(() => {
    localStorage.setItem('approvalEvents', JSON.stringify(approvalEvents));
  }, [approvalEvents]);

  const addApprovalType = (type: ApprovalType) => {
    setApprovalTypes([...approvalTypes, type]);
  };

  const updateApprovalType = (type: ApprovalType) => {
    setApprovalTypes(approvalTypes.map(t => (t.id === type.id ? type : t)));
  };

  const deleteApprovalType = (id: number) => {
    setApprovalTypes(approvalTypes.filter(t => t.id !== id));
  };

  const addApprovalCondition = (condition: ApprovalCondition) => {
    setApprovalConditions([...approvalConditions, condition]);
  };

  const updateApprovalCondition = (condition: ApprovalCondition) => {
    setApprovalConditions(approvalConditions.map(c => (c.typeId === condition.typeId ? condition : c)));
  };

  const deleteApprovalCondition = (typeId: number) => {
    setApprovalConditions(approvalConditions.filter(c => c.typeId !== typeId));
  };

  const addApprovalEvent = (event: ApprovalEvent) => {
    setApprovalEvents([...approvalEvents, event]);
  };

  const updateApprovalEvent = (event: ApprovalEvent) => {
    setApprovalEvents(approvalEvents.map(e => (e.eventId === event.eventId ? event : e)));
  };

  const deleteApprovalEvent = (eventId: number) => {
    setApprovalEvents(approvalEvents.filter(e => e.eventId !== eventId));
  };

  return (
    <ApprovalFlowContext.Provider
      value={{
        approvalTypes,
        approvalConditions,
        approvalEvents,
        addApprovalType,
        updateApprovalType,
        deleteApprovalType,
        addApprovalCondition,
        updateApprovalCondition,
        deleteApprovalCondition,
        addApprovalEvent,
        updateApprovalEvent,
        deleteApprovalEvent
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
