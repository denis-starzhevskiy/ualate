import React from 'react';
import Modal from '@/components/elements/Modal';
import s from './ConfirmModal.module.scss';
import PageTitle from '@/components/elements/PageTitle';
import Button from '@/components/elements/Button';
import Image from 'next/image';
import closeIcon from '@/public/images/closeIcon.svg';
import { useMutation } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { AxiosError } from 'axios';

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  text: string;
  onConfirmAction: () => Promise<{}> | void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  text,
  errorText,
  onConfirmAction,
}) => {
  const mutation = useMutation({
    mutationFn: onConfirmAction,
    onSuccess: () => {
      onClose();
    },
    onError: (e: AxiosError) => {
      toast.error(errorText || 'Не вдалося виконати дію', {
        position: 'bottom-left',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        rtl: false,
        theme: 'light',
      });
    },
  });

  const onCancel = () => {
    onClose();
  };

  const onSubmit = () => {
    mutation.mutate();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          if (onClose) {
            onClose();
          }
        }}>
        <div className={s.modalContainer}>
          <Image className={s.closeIcon} src={closeIcon} alt={'close modal'} onClick={onClose} />
          <PageTitle title={'Підтвердження дії'} />
          <p>{text || 'Ви точно впевнені у своїх діях?'}</p>
          <div className={s.submitBtnContainer}>
            <Button onClick={onCancel}>Скасувати</Button>
            <Button onClick={onSubmit}>Продовжити</Button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ConfirmModal;
