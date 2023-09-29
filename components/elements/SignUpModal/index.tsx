import React, { useState } from 'react';
import Modal from '@/components/elements/Modal';
import PasswordInput from '@/components/elements/PasswordInput';
import Checkbox from '@/components/elements/CheckBox/CheckBox';
import s from './SignUpModal.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import PageTitle from '@/components/elements/PageTitle';
import Divider from '@/components/elements/Divider';
import Button from '@/components/elements/Button';
import Image from 'next/image';
import facebookIcon from '@/public/images/facebookIcon.svg';
import googleIcon from '@/public/images/googleIcon.svg';
import closeIcon from '@/public/images/closeIcon.svg';
import { useForm } from 'react-hook-form';
import ErrorLabel from '@/components/elements/ErrorLabel/ErrorLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import { bool, object, ref, string } from 'yup';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/api/authAPI';
import Loader from '@/components/elements/Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';

type SignUpModalProps = {
  open?: boolean;
  onClose?: () => void;
};

const validationSchema = object({
  email: string().email('Введіть валідну електронну адресу').required("Обов'зкове поле"),
  name: string().required("Обов'зкове поле"),
  lastname: string().required("Обов'зкове поле"),
  password: string().min(8, 'Мінімальна довжина 8 символів').required("Обов'зкове поле"),
  confirm_password: string()
    .required("Обов'зкове поле")
    .oneOf([ref('password')], 'Паролі не співпадіють'),
  agree_confirm: bool().oneOf([true], 'Погодьтеся на умови використання'),
});

const SignUpModal: React.FC<SignUpModalProps> = ({ open, onClose }) => {
  const [stage, setStage] = useState<number>(1);
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const mutation = useMutation({
    mutationFn: (requestData: object) => registerUser(requestData),
    onSuccess: () => setStage(2),
    onError: (e: AxiosError) => {
      setError(true);
      toast.error(
        e?.response?.data?.email
          ? e?.response?.data?.email[0]
          : e?.response?.data?.password
          ? e?.response?.data?.password[0]
          : 'Виникла помилка під час створення облікового запису.',
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

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<{
    email: string;
    name: string;
    lastname: string;
    password: string;
    confirm_password: string;
    agree_confirm: boolean;
  }>({
    defaultValues: {
      agree_confirm: false,
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onCloseModal = () => {
    reset();
    clearErrors();
    if (onClose) {
      onClose();
    }
  };

  const onSubmit = (data: {
    email: string;
    name: string;
    lastname: string;
    password: string;
    confirm_password: string;
    agree_confirm: boolean;
  }) => {
    const userData = {
      first_name: data.name,
      last_name: data.lastname,
      email: data.email,
      password: data.password,
      re_password: data.confirm_password,
    };
    mutation.mutate(userData);
  };

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className={s.modalContainer}>
          <Image
            className={s.closeIcon}
            src={closeIcon}
            alt={'close modal'}
            onClick={onCloseModal}
          />
          <PageTitle title={'Реєстрація'} />
          {stage === 1 ? (
            <form onSubmit={handleSubmit(onSubmit)} className={s.formContainer}>
              <label className={s.label}>Email *</label>
              <input type="text" className={clsx('input')} {...register('email')} />
              {errors?.email && <ErrorLabel text={errors.email.message} />}
              <label className={s.label}>Ім’я *</label>
              <input type="text" className={clsx('input')} {...register('name')} />
              {errors?.name && <ErrorLabel text={errors.name.message} />}
              <label className={s.label}>Прізвище *</label>
              <input type="text" className={clsx('input')} {...register('lastname')} />
              {errors?.lastname && <ErrorLabel text={errors.lastname.message} />}
              <PasswordInput label={'Пароль'} register={register('password')} />
              {errors?.password && <ErrorLabel text={errors.password.message} />}
              <PasswordInput label={'Підтвердити пароль'} register={register('confirm_password')} />
              {errors?.confirm_password && <ErrorLabel text={errors.confirm_password.message} />}
              <Checkbox
                label={
                  <span>
                    Приймаю{' '}
                    <Link href={''} className={'link'}>
                      Умови
                    </Link>
                  </span>
                }
                register={register('agree_confirm')}
              />
              {errors?.agree_confirm && <ErrorLabel text={errors.agree_confirm.message} />}
              <div className={s.btnContainer}>
                <Button
                  type={'submit'}
                  className={clsx(s.submitBtn, mutation.isLoading && s.loadingSubmitBtn)}>
                  {mutation.isLoading ? <Loader size={20} /> : 'Зареєструватися'}
                </Button>
              </div>
              <div className={s.orDividerContainer}>
                <Divider />
                <div>або</div>
                <Divider />
              </div>
              <div className={s.buttonsContainer}>
                <Button>
                  <Image src={facebookIcon} alt={'Facebook icon'} />
                  Facebook
                </Button>
                <Button>
                  <Image src={googleIcon} alt={'Google icon'} />
                  Google
                </Button>
              </div>
            </form>
          ) : (
            <>
              <p style={{ textAlign: 'center', fontSize: '20px' }}>
                Вітаємо, Вас зареєстровано у системі.
              </p>
              <p style={{ textAlign: 'center', margin: '20px 0px' }}>
                На Вашу пошту надійшов лист за допомогою якого Ви можете завершити реєстрацію в
                нашому сервісі.
              </p>
              <div className={s.btnContainer}>
                <Button
                  className={clsx(s.submitBtn, mutation.isLoading && s.loadingSubmitBtn)}
                  onClick={onCloseModal}>
                  Окей
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default SignUpModal;
