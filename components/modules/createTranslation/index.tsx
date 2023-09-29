import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import s from '@/components/modules/createTranslation/CreateTranslation.module.scss';
import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';
import GeneralInformation from '@/components/modules/createTranslation/general-information';
import Abonement from '@/components/modules/createTranslation/abonement';
import Advertisement from '@/components/modules/createTranslation/advertisement';
import AccessRights from '@/components/modules/createTranslation/access-rights';
import { successIcon } from '@/components/modules/icons';
import { abonements, advertisements } from '@/utils/createTranslation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createTranslations } from '@/api/translationsAPI';
import Loader from '@/components/elements/Loader/Loader';
import { yupResolver } from "@hookform/resolvers/yup";
import { array, mixed, object, string } from "yup";

const createTranslationSteps = [
  {
    step: 0,
    label: 'ЗАГАЛЬНІ НАЛАШТУВАННЯ',
    phoneLabel: 'ЗАГАЛЬНЕ',
    name: 'general'
  },
  {
    step: 1,
    label: 'АБОНЕМЕНТ',
    phoneLabel: 'АБОНЕМЕНТ',
    name: 'abonement'
  },
  {
    step: 2,
    label: 'РЕКЛАМА НА САЙТІ',
    phoneLabel: 'РЕКЛАМА',
    name: 'advertisement'
  },
  {
    step: 3,
    label: 'ПРАВА ДОСТУПУ',
    phoneLabel: 'ПРАВА',
    name: 'access_rights'
  },
];


const validationSchema = object({
  general: object({
    original_language: string().required("Вкажіть значення"),
    original_title: string().required("Вкажіть значення"),
    title: string().required("Вкажіть значення"),
    author: string().required("Вкажіть значення"),
    type_book: string().required("Вкажіть значення"),
    status: string().required("Вкажіть значення"),
    genres: array().min(1, "Виберіть принаймні один варіант зі списку"),
    tags: array().min(1, "Виберіть принаймні один варіант зі списку"),
    fund: string().required("Вкажіть значення"),
    main_image: mixed().test('file', 'Завантажте файл', value => {
      return value?.length > 0
    }),
  }),
  abonement: object({
    price: string().required("Вкажіть ціну"),
    discount: string().required("Вкажіть знижку"),
  })
})

const CreateTranslation = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const isMobile = useMediaQuery('991.98');
  const mutation = useMutation({
    mutationFn: (requestData: object) => createTranslations(requestData),
  });

  const methods = useForm<{
    general: object;
    abonement: object;
    advertisement: object;
    access: object;
  }>({
    defaultValues: {
      general: {
        genres: [],
        tags: [],
      },
    },
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    console.log(methods.getValues());
  }, [methods.watch()]);

  const onSubmit = (data: object) => {
    mutation.mutate({ ...data });
  };

  return (
    <section className={clsx(s.section)}>
      <div className={clsx('container')}>
        <div className={s.container}>
          <div id={'header'} className={s.header}>
            <BreadCrumbs
              path={[
                { title: 'Головна', link: '/' },
                { title: 'Створення перекладу', link: '' },
              ]}
            />
            <h2 className={s.title}>СТВОРЕННЯ ПЕРЕКЛАДУ</h2>
            <div id="navigation-block" className={s.navContainer}>
              <div className={s.navigation}>
                <nav aria-label="Navigation">
                  <ul>
                    {createTranslationSteps.map((item, index) => (
                      <li key={index}>
                        <div onClick={() => setCurrentStep(item.step)}>
                          <h4 className={clsx(currentStep === item.step && s.currentStep, (currentStep !== item.step && methods?.formState?.errors?.[item.name]) && s.errorStep)}>
                            {isMobile ? item.phoneLabel : item.label}
                          </h4>
                        </div>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          {mutation.isLoading ? (
            <div className={s.loadingContainer}>
              <Loader size={80} />
            </div>
          ) : (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div>
                  {currentStep === 0 && <GeneralInformation />}
                  {currentStep === 1 && <Abonement abonements={abonements} />}
                  {currentStep === 2 && <Advertisement advertisements={advertisements} />}
                  {currentStep === 3 && <AccessRights />}
                </div>
                <div className={s.actionFooter}>
                  <button type={'submit'} className={clsx('button', s.customButton)}>
                    {successIcon()}Опублікувати переклад
                  </button>
                </div>
              </form>
            </FormProvider>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreateTranslation;
