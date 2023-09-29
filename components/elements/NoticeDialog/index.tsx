import React from 'react';
import Modal from '@/components/elements/Modal';
import s from './NoticeDialog.module.scss';
import clsx from 'clsx';
import PageTitle from '@/components/elements/PageTitle';
import Button from '@/components/elements/Button';
import Image from 'next/image';
import closeIcon from '@/public/images/closeIcon.svg';

type NoticeDialogProps = {
  open?: boolean;
  onClose?: () => void;
  text?: string;
};

const NoticeDialog: React.FC<NoticeDialogProps> = ({ open, onClose, text }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={s.modalContainer}>
        <Image className={s.closeIcon} src={closeIcon} alt={'close modal'} onClick={onClose} />
        <PageTitle title={'Увага'} />
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>
          {text || 'Ваш запит було виконанно.'}
        </p>
        <div className={s.btnContainer}>
          <Button className={clsx(s.submitBtn)} onClick={onClose}>
            Окей
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NoticeDialog;
