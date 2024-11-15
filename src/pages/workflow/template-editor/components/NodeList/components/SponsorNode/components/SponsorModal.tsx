import { useOverlayRef } from 'overlay-hook';
import React, { useMemo, useState } from 'react';
import { Form, Modal, Upload, message } from 'antd';

export const SponsorModal = (props = {}) => {
  const overlayRef = useOverlayRef<boolean>();
  const [open, setOpen] = useState(true);

  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
        setTimeout(() => {
          overlayRef.close();
        }, 3000);
      }}
      {...props}
    />
  );
};
