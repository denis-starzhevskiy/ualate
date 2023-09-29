import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import s from './Settings.module.scss';
import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';
import PasswordInput from '@/components/elements/PasswordInput';
import { saveDataIcon } from '@/components/modules/icons';
import ColorPicker from '@/components/elements/ColorPicker';
import CheckBox from '@/components/elements/CheckBox/CheckBox';
import Slider from '@/components/elements/Slider';
import { useMutation, useQuery } from '@tanstack/react-query';
import { changeSettings, getSettings, SettingProps } from '@/api/settingsAPI';
import Loader from '@/components/elements/Loader/Loader';
import FetchError from '@/components/elements/FetchError/FetchError';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, ref, string } from 'yup';
import { setPassword } from '@/api/authAPI';
import ErrorLabel from '@/components/elements/ErrorLabel/ErrorLabel';
import NoticeDialog from '@/components/elements/NoticeDialog';

const settingOptions = [
  {
    title: 'Оповіщення',
    name: 'notifications',
  },
  {
    title: 'Важливі новини сайту',
    name: 'site_news',
  },
  {
    title: 'Отримувати приватні повідомлення',
    name: 'private_messages',
  },
  {
    title: 'Коментарі у ваших постах та відповіді на ваші коментарі',
    name: 'comments',
  },
  {
    title: 'Прибрати 18+',
    name: 'is_adult',
  },
  {
    title: 'Вимкнути блок "Інші роботи автора" у своїх книгах',
    name: 'turn_off_another_books',
  },
  {
    title: 'Зміна статусу перекладу',
    name: 'change_translation',
  },
  {
    title: 'Зняття розділу з передплати',
    name: 'subscription_off',
  },
  {
    title:
      'Я підтверджую, що мені виповнилося 18 років, і я можу переглядати контент, призначений для дорослих',
    name: 'is_adult',
  },
];

function ChangePasswordForm({
  setOpenDialog,
  setResultText,
}: {
  setOpenDialog: (value: boolean) => void;
  setResultText: (value: string) => void;
}) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<{
    current_password: string;
    new_password: string;
    repeat_password: string;
  }>({
    resolver: yupResolver(
      object({
        current_password: string().required("Обов'зкове поле"),
        new_password: string().min(8, 'Мінімальна довжина 8 символів').required("Обов'зкове поле"),
        repeat_password: string()
          .required("Обов'зкове поле")
          .oneOf([ref('new_password')], 'Паролі не співпадіють'),
      })
    ),
  });

  const mutation = useMutation(
    ['setPassword'],
    (request: { new_password: string; current_password: string }) => setPassword(request),
    {
      onSuccess: () => {
        reset();
        setOpenDialog(true);
        setResultText('Ваші налаштування були успішно збережені.');
      },
      onError: (error) => {
        setOpenDialog(true);
        let errorMessage = error?.response?.data?.current_password
          ? 'Не вірний пароль.'
          : error?.response?.data?.new_password?.[0] ||
            'Виникла проблема при збереженні даних. Спробуйте пізніше.';
        setResultText(errorMessage);
      },
    }
  );

  const onSubmit = ({
    current_password,
    new_password,
  }: {
    current_password: string;
    new_password: string;
    repeat_password: string;
  }) => {
    mutation.mutate({ new_password, current_password });
  };

  return (
    <div>
      <h4 className={s.sectionTitle}>Змінити пароль</h4>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput
          label={'Старий пароль'}
          className={s.adaptiveInout}
          register={register('current_password')}
        />
        {errors?.current_password && <ErrorLabel text={errors.current_password.message} />}
        <PasswordInput
          label={'Новий пароль'}
          className={s.adaptiveInout}
          register={register('new_password')}
        />
        {errors?.new_password && <ErrorLabel text={errors.new_password.message} />}
        <PasswordInput
          label={'Підтвердити пароль'}
          className={s.adaptiveInout}
          register={register('repeat_password')}
        />
        {errors?.repeat_password && <ErrorLabel text={errors.repeat_password.message} />}
        <button className={clsx('button', s.submitButton)} type={'submit'}>
          {mutation.isLoading ? <Loader size={20} /> : saveDataIcon()}Зберегти
        </button>
      </form>
    </div>
  );
}

const SettingsView = () => {
  const [openResultDialog, setOpenDialog] = useState<boolean>(false);
  const [resultText, setResultText] = useState<string>();
  const { isLoading, data, isError } = useQuery(['settings'], () => getSettings());
  const mutation = useMutation((request: SettingProps) => changeSettings(request), {
    onSuccess: () => {
      setOpenDialog(true);
      setResultText('Ваші налаштування були успішно збережені.');
    },
    onError: () => {
      setOpenDialog(true);
      setResultText('Виникла проблема при збереженні даних. Спробуйте пізніше.');
    },
  });

  const { getValues, setValue, reset, watch } = useForm<SettingProps>();

  useEffect(() => {
    reset({ ...data });
  }, [data]);

  const changeThemeSettings = (data: SettingProps) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    console.log(getValues());
  }, [watch()]);

  return (
    <section className={clsx(s.section)}>
      <div className="container">
        <BreadCrumbs
          path={[
            { title: 'Головна', link: '/' },
            { title: 'Профіль', link: '/profile' },
            { title: 'Налаштування', link: '' },
          ]}
        />
        <h2 className={s.title}>НАЛАШТУВАННЯ</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isError ? (
              <FetchError />
            ) : (
              <>
                <div className={s.settingsContainer}>
                  <ChangePasswordForm setOpenDialog={setOpenDialog} setResultText={setResultText} />
                  <div>
                    <h4 className={s.sectionTitle}>Налаштування</h4>
                    <div className={s.checkBoxOptionsContainer}>
                      {settingOptions.map((item, idx) => {
                        return (
                          <CheckBox
                            key={idx}
                            label={item.title}
                            checked={getValues(item.name)}
                            onChange={() => {
                              setValue(item.name, !getValues(item.name));
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h4 className={s.sectionTitle}>Змінити пароль</h4>
                    <h5 className={s.subSectionText}>Розмір тексту</h5>
                    <div className={s.sliderContainer}>
                      <Slider
                        initFontSize={data?.font_size}
                        setNewFontSize={(fontSize) => setValue('font_size', fontSize)}
                      />
                    </div>
                    <div></div>
                    <div className={s.colorPickersContainer}>
                      <h5 className={s.subSectionText}>Колір тексту</h5>
                      <h5 className={s.subSectionText}>Колір тла</h5>
                      <ColorPicker
                        currentFontColor={data?.font_color}
                        setColor={(value) => setValue('font_color', value)}
                      />
                      <ColorPicker
                        currentFontColor={data?.background_color}
                        setColor={(value) => setValue('background_color', value)}
                      />
                    </div>
                  </div>
                </div>
                <button
                  className={clsx('button', s.submitButton)}
                  onClick={() => changeThemeSettings(getValues())}
                  disabled={mutation.isLoading}>
                  {mutation.isLoading ? <Loader size={20} /> : saveDataIcon()}Зберегти
                </button>
              </>
            )}
          </>
        )}
      </div>
      <NoticeDialog
        open={openResultDialog}
        onClose={() => setOpenDialog(false)}
        text={resultText}
      />
    </section>
  );
};

export default SettingsView;
