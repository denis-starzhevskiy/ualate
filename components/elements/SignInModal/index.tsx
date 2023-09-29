import React, { useEffect, useState } from 'react';
import Modal from '@/components/elements/Modal';
import PasswordInput from '@/components/elements/PasswordInput';
import Checkbox from '@/components/elements/CheckBox/CheckBox';
import s from './SignInModal.module.scss';
import clsx from 'clsx';
import PageTitle from '@/components/elements/PageTitle';
import Divider from '@/components/elements/Divider';
import Button from '@/components/elements/Button';
import Image from 'next/image';
import facebookIcon from '@/public/images/facebookIcon.svg';
import googleIcon from '@/public/images/googleIcon.svg';
import closeIcon from '@/public/images/closeIcon.svg';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorLabel from '@/components/elements/ErrorLabel/ErrorLabel';
import { useAuthStore } from '@/store/authStore';
import { googleAuth, loginUser, me } from '@/api/authAPI';
import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';

type SignInModalProps = {
  open?: boolean;
  onClose?: () => void;
};

const validationSchema = object({
  email: string().email('Введіть валідну електронну адресу').required("Обов'зкове поле"),
  password: string().required("Обов'зкове поле"),
});

const SignInModal: React.FC<SignInModalProps> = ({ open, onClose }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [loginData, setLoginData] = useState<{ email: string; password: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);
  const mutation = useMutation({
    mutationFn: (request: { email: string; password: string }) => loginUser(request),
    onSuccess: (resultWithToken) => {
      setCookie('access-token', resultWithToken.auth_token);
      if (rememberMe) {
        if (window) {
          window.localStorage.setItem(
            'authData',
            JSON.stringify({ email: loginData?.email, password: loginData?.password })
          );
        }
      }
      me()
        .then((result) => {
          login(
            {
              id: result.id,
              email: result.email,
              first_name: result.first_name,
              last_name: result.last_name,
            },
            `Token ${resultWithToken.auth_token}`
          );
        })
        .finally(onClose);
    },
    onError: () => {
      setError('Невірний пароль');
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
    password: string;
  }>({
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (window) {
      const authData = window.localStorage.getItem('authData');
      if (authData) {
        const login = JSON.parse(authData);
        reset({ email: login.email, password: login.password });
        setRememberMe(true);
      }
    }
  }, []);

  const onSubmit = ({ email, password }: { email: string; password: string }) => {
    if (rememberMe) {
      setLoginData({ email, password });
    }

    mutation.mutate({ email, password });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      googleAuth(tokenResponse).then((resultWithToken) => {
        setCookie('access-token', resultWithToken.auth_token);
        if (rememberMe) {
          if (window) {
            window.localStorage.setItem(
              'authData',
              JSON.stringify({ email: loginData?.email, password: loginData?.password })
            );
          }
        }
        me()
          .then((result) => {
            login(
              {
                id: result.id,
                email: result.email,
                first_name: result.first_name,
                last_name: result.last_name,
              },
              `Token ${resultWithToken.auth_token}`
            );
          })
          .finally(onClose);
      }),
  });

  return (
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
        <PageTitle title={'Вхід'} />
        <label className={s.label}>Email *</label>
        <input type="text" className={clsx('input')} {...register('email')} />
        {errors?.email && <ErrorLabel text={errors.email.message} />}
        <PasswordInput label={'Пароль'} register={register('password')} />
        {errors?.password && <ErrorLabel text={errors.password.message} />}
        <div className={s.forgetPasswordText}>Забули пароль?</div>
        <Checkbox
          label={'Запам’ятати мене'}
          checked={rememberMe}
          onChange={() => setRememberMe((prev) => !prev)}
        />
        <div className={s.submitBtnContainer}>
          <Button type={'submit'}>Увійти</Button>
          {error && <ErrorLabel text={error} />}
        </div>
        <div className={s.orDividerContainer}>
          <Divider />
          <div>або</div>
          <Divider />
        </div>
        <div className={s.buttonsContainer}>
          <FacebookLogin
            appId="774297494307014"
            onSuccess={(response) => {
              console.log('Login Success!', response);
            }}
            render={({ onClick, logout }) => {
              return (
                <Button onClick={onClick}>
                  <Image src={facebookIcon} alt={'Facebook icon'} />
                  Facebook
                </Button>
              );
            }}
          />
          <Button onClick={() => googleLogin()}>
            <Image src={googleIcon} alt={'Google icon'} />
            Google
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SignInModal;
