import { useOverlayRef } from 'overlay-hook';
import React, { useMemo, useState } from 'react';
import type { DrawerProps, ModalProps } from 'antd';
import { Drawer, Form, Modal, Upload, message } from 'antd';

interface MyModalProps extends Omit<ModalProps, 'onCancel' | 'onOk'> {
  closeDelay?: number;
  manualClose?: boolean;
  onCancel?: (closeModal?: () => void) => void;
  onOk?: (closeModal?: () => void) => void;
}

export const MyModal: React.FC<MyModalProps> = props => {
  const overlayRef = useOverlayRef<boolean>();
  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => {
      overlayRef.close();
    }, props.closeDelay || 3000);
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        if (props.manualClose) {
          props?.onCancel?.(closeModal);
          return;
        }

        props?.onCancel?.();
        closeModal();
      }}
      onOk={() => {
        if (props.manualClose) {
          props?.onOk?.(closeModal);
          return;
        }

        props?.onOk?.();
        closeModal();
      }}
      {...props}
    />
  );
};

interface MyDrawerProps extends Omit<DrawerProps, 'onClose'> {
  closeDelay?: number;
  manualClose?: boolean;
  onClose?: (closeDrawer?: () => void) => void;
}

export const MyDrawer: React.FC<MyDrawerProps> = props => {
  const overlayRef = useOverlayRef<boolean>();
  const [open, setOpen] = useState(true);

  const closeDrawer = () => {
    setOpen(false);
    setTimeout(() => {
      overlayRef.close();
    }, props.closeDelay || 3000);
  };

  return (
    <Drawer
      open={open}
      onClose={() => {
        if (props.manualClose) {
          props?.onClose?.(closeDrawer);
          return;
        }

        props?.onClose?.();
        closeDrawer();
      }}
      {...props}
    />
  );
};

export const useMyDrawer = () => [MyDrawer];
export const useMyModal = () => [MyModal];
