import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ClickAwayListener from '@/components/elements/ClickAwayListener';
import s from './Modal.module.scss';
import clsx from 'clsx';

type ModalProps = {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({ open, onClose, children, className }) => {
  const portalRef = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    portalRef.current = document.querySelector<HTMLElement>('#portal');
    setMounted(true);
  }, []);

  if (!(mounted && portalRef.current && open)) return null;

  return ReactDOM.createPortal(
    <ClickAwayListener onClickAway={onClose}>
      <div className={clsx(s.modal, className)}>{children}</div>
    </ClickAwayListener>,
    portalRef.current
  );
};

export default Modal;
