import React, { useEffect } from 'react';
import Modal from '@/components/elements/Modal';
import s from './SendMailModal.module.scss';
import clsx from 'clsx';
import PageTitle from '@/components/elements/PageTitle';
import Button from '@/components/elements/Button';
import Image from 'next/image';
import closeIcon from '@/public/images/closeIcon.svg';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorLabel from '@/components/elements/ErrorLabel/ErrorLabel';
import { useMutation, useQuery } from '@tanstack/react-query';
import { sendMail } from '@/api/mailAPI';
import { toast, ToastContainer } from 'react-toastify';
import { AxiosError } from 'axios';
import { getMessageUsers } from '@/api/profileAPI';

type SendMailModalProps = {
  open: boolean;
  onClose: () => void;
  replyId?: number | null;
};

const validationSchema = object({
  message: string().required("Обов'зкове поле"),
  recipient: string()
    .email('Зазначте правильний електронний адрес')
    .required('Зазначте отримувача'),
});

const SendMailModal: React.FC<SendMailModalProps> = ({ open, onClose, replyId }) => {
  const { data: messageUsers } = useQuery(['message-users'], () => getMessageUsers());
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<{
    message: string;
    recipient: string;
  }>({
    defaultValues: {},
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (messageUsers && Array.isArray(messageUsers)) {
      reset({
        recipient: messageUsers.find((item) => item.id == replyId)?.email || '',
      });
    }
  }, [messageUsers]);

  const mutation = useMutation({
    mutationFn: (request: { message: string; recipient: number }) =>
      sendMail(request.message, request.recipient),
    onSuccess: (response) => {
      onClose();
      reset();
    },
    onError: (e: AxiosError) => {
      toast.error(
        e?.response?.data?.recipient
          ? 'Вибраний користувач не доступний.'
          : 'Не вдалося відправити повідомлення',
        {
          position: 'bottom-left',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          rtl: false,
          theme: 'light',
        }
      );
    },
  });

  const onSubmit = ({ message, recipient }: { message: string; recipient: string }) => {
    const recipientUser = messageUsers?.find((item) => item.email === recipient);
    if (recipientUser) {
      mutation.mutate({ message, recipient: recipientUser.id });
    } else {
      toast.error('Користувача з даною електронною адресою не знайдено.', {
        position: 'bottom-left',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        rtl: false,
        theme: 'light',
      });
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          reset();
          clearErrors();
          if (onClose) {
            onClose();
          }
        }}>
        <form className={s.modalContainer} onSubmit={handleSubmit(onSubmit)}>
          <Image className={s.closeIcon} src={closeIcon} alt={'close modal'} onClick={onClose} />
          <PageTitle title={'Надіслати листа'} />
          <label className={s.label}>Повідомлення *</label>
          <input type="text" className={clsx('input')} {...register('message')} />
          {errors?.message && <ErrorLabel text={errors.message.message} />}
          {!replyId && (
            <>
              <label className={s.label}>Отримувач *</label>
              <input className={clsx('input')} {...register('recipient')} />
              {errors?.recipient && <ErrorLabel text={errors.recipient.message} />}
            </>
          )}
          <div className={s.submitBtnContainer}>
            <Button type={'submit'}>Надіслати</Button>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default SendMailModal;
