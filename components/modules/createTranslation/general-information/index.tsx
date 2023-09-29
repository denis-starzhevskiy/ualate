import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import s from './GeneralInformation.module.scss';
import { downloadCloudIcon, pictureDownloadIcon } from '@/components/modules/icons';
import CheckOption from '@/components/elements/CheckOption/CheckOption';
import Select from '@/components/elements/Select';
import CheckBox from '@/components/elements/CheckBox/CheckBox';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useFormContext } from 'react-hook-form';

const GeneralInformation = () => {
  const [ageLimit, setAgeLimit] = useState<boolean>();
  const [file, setFile] = useState<File>();
  const [files, setFiles] = useState<object>();
  const isMobile = useMediaQuery('900');

  const {
    register,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const setFileByIdx = ({ idx, inputFile }: { idx: number; inputFile: any }) => {
    const file = inputFile;
    if (file) {
      setFiles((prev) => {
        return { ...prev, [idx]: file };
      });
    }
  };

  useEffect(() => {
    setValue('general.additional_images', files);
  }, [files]);

  const availableTags = [
    { label: 'переклад' },
    { label: 'гарри поттер' },
    { label: 'переклад' },
    { label: 'переклад' },
    { label: 'переклад' },
    { label: 'переклад' },
    { label: 'переклад' },
  ];

  return (
    <table className={s.table}>
      <tbody>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'} style={errors?.general?.original_language && {color: 'red'}}>
            Мова оригіналу
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            <Select
              value={getValues('general.original_language')}
              onChange={(e) => {
                setValue('general.original_language', e)
                clearErrors('general.original_language')
              }}
              options={[
                { value: 'en', label: 'Англійська' },
                { value: 'ua', label: 'Українська' },
                { value: 'fr', label: 'Французька' },
              ].map((value) => ({
                label: value.label,
                value: value.value,
              }))}
              customClass={s.customSelect}
            />
            {errors?.general?.original_language && <label className={s.errorLabel}>{errors.general.original_language.message}</label>}
          </td>
        </tr>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'} style={errors?.general?.original_title && {color: 'red'}}>
            Назва мовою оригіналу
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            <input
              type={'text'}
              className={clsx('input', s.customInput)}
              {...register('general.original_title')}
            />
            {errors?.general?.original_title && <label className={s.errorLabel}>{errors.general.original_title.message}</label>}
          </td>
        </tr>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'} style={errors?.general?.title && {color: 'red'}}>
            Назва мовою перекладу
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            <input
              type={'text'}
              className={clsx('input', s.customInput)}
              {...register('general.title')}
            />
            {errors?.general?.title && <label className={s.errorLabel}>{errors.general.title.message}</label>}
          </td>
        </tr>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'} style={errors?.general?.author && {color: 'red'}}>
            Автор твору
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            <input
              type={'text'}
              className={clsx('input', s.customInput)}
              {...register('general.author')}
            />
            {errors?.general?.author && <label className={s.errorLabel}>{errors.general.author.message}</label>}
          </td>
        </tr>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'} style={errors?.general?.type_book && {color: 'red'}}>
            Статус випуску
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            <Select
              value={getValues('general.type_book')}
              onChange={(e) => {
                setValue('general.type_book', e)
                clearErrors('general.type_book')
              }}
              options={[
                { label: 'Переведено', value: 'translate' },
                { label: 'Оригінал', value: 'original' },
              ].map((value) => ({ label: value.label, value: value.value }))}
              customClass={s.customSelect}
            />
            {errors?.general?.type_book && <label className={s.errorLabel}>{errors.general.type_book.message}</label>}
          </td>
        </tr>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'} style={errors?.general?.status && {color: 'red'}}>
            Статус перекладу
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            <Select
              value={getValues('general.status')}
              onChange={(e) => {
                setValue('general.status', e)
                clearErrors('general.status')
              }}
              options={[
                { label: 'Перекладено', value: 'translate' },
                { label: 'В роботі', value: 'translate' },
              ].map((value) => ({ label: value.label, value: value.value }))}
              customClass={s.customSelect}
            />
            {errors?.general?.status && <label className={s.errorLabel}>{errors.general.status.message}</label>}
          </td>
        </tr>
        <tr className={s.bottomBorder}>
          <th className={clsx(s.th, s.commonTdTh, s.verticalAlign)} scope={'row'}>
            Опис/рецензія
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            <textarea
              className={clsx('textArea', s.textarea)}
              {...register('general.description')}></textarea>
          </td>
        </tr>
        <tr className={s.bottomBorder}>
          <th className={clsx(s.th, s.commonTdTh, s.verticalAlign)} scope={'row'} style={errors?.general?.genres && {color: 'red'}}>
            Жанр
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            {availableTags && (
              <div className={s.tagsContainer}>
                <ul className={s.tagsList}>
                  {availableTags.map((tag, index) => (
                    <li key={index}>
                      <CheckOption
                        checked={getValues('general.tags').includes(tag.label)}
                        title={tag.label}
                        setValue={(checked) => {
                          if (checked) {
                            const values = getValues('general.genres');
                            values.push(tag.label);
                            setValue('general.genres', values);
                            clearErrors('general.genres')
                          } else {
                            setValue(
                              'general.genres',
                              getValues('general.genres').filter(
                                (item: string) => item === tag.label
                              )
                            );
                          }
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {errors?.general?.genres && <label className={s.errorLabel}>{errors.general.genres.message}</label>}
          </td>
        </tr>
        <tr className={s.bottomBorder}>
          <th className={clsx(s.th, s.commonTdTh, s.verticalAlign)} scope={'row'} style={errors?.general?.tags && {color: 'red'}}>
            Теги
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            {availableTags && (
              <div className={s.tagsContainer}>
                <ul className={s.tagsList}>
                  {availableTags.map((tag, index) => (
                    <li key={index}>
                      <CheckOption
                        checked={getValues('general.tags').includes(tag.label)}
                        title={tag.label}
                        setValue={(checked) => {
                          if (checked) {
                            const values = getValues('general.tags');
                            values.push(tag.label);
                            setValue('general.tags', values);
                            clearErrors('general.tags')
                          } else {
                            setValue(
                              'general.tags',
                              getValues('general.tags').filter((item: string) => item === tag.label)
                            );
                          }
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {errors?.general?.tags && <label className={s.errorLabel}>{errors.general.tags.message}</label>}
          </td>
        </tr>
        <tr className={s.bottomBorder}>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'} style={errors?.general?.fund && {color: 'red'}}>
            Фендом
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            <input
              type={'text'}
              className={clsx('input', s.customInput)}
              {...register('general.fund')}
            />
            {errors?.general?.fund && <label className={s.errorLabel}>{errors.general.fund.message}</label>}
          </td>
        </tr>
        <tr className={s.bottomBorder}>
          <th className={clsx(s.th, s.commonTdTh, s.verticalAlign)} scope={'row'}>
            Обмеження за віком 18+
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            <div className={s.checkBoxesContainer}>
              <CheckBox
                label={'Так'}
                checked={!!getValues('general.age_restrictions')}
                onChange={() => setValue('general.age_restrictions', true)}
              />
              <CheckBox
                label={'Ні'}
                checked={!getValues('general.age_restrictions')}
                onChange={() => setValue('general.age_restrictions', false)}
              />
            </div>
          </td>
        </tr>
        <tr className={s.bottomBorder}>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'} style={errors?.general?.main_image && {color: 'red'}}>
            Основне зображення
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            <div className={s.actionContainer}>
              <div style={{ cursor: 'pointer' }}>
                <label className={s.labelSaveImg}>
                  <h3 className={clsx('button', s.uploadFileText)}>
                    {downloadCloudIcon()}Вибрати зображення
                  </h3>
                  <input
                    accept=".svg, .png, .bmp, .gif, .jpg, .gif, .jpeg"
                    type="file"
                    id="file1"
                    {...register('general.main_image')}
                  />
                </label>
              </div>
              {getValues('general.main_image') && (
                <div className={s.wrapperImgName}>
                  <h4 style={{ fontWeight: '600' }}>
                    {getValues('general.main_image')?.[0]?.name?.slice(0, 25)}
                  </h4>
                </div>
              )}
            </div>
            {errors?.general?.main_image && <label className={s.errorLabel}>{errors.general.main_image.message}</label>}
          </td>
        </tr>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'}>
            Додаткові зображення
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            <div className={s.actionContainer}>
              <div style={{ cursor: 'pointer' }}>
                <label className={s.labelSaveImg}>
                  <h3
                    className={clsx('button', files?.[1] ? s.uploadedFileText : s.uploadFileText)}>
                    {pictureDownloadIcon()}
                  </h3>
                  <input
                    accept=".svg, .png, .bmp, .gif, .jpg, .gif, .jpeg"
                    type="file"
                    id="file1"
                    onChange={(e) => {
                      // @ts-ignore
                      setFileByIdx({ idx: 1, inputFile: e?.target?.files[0] });
                    }}
                  />
                </label>
              </div>
              <div style={{ cursor: 'pointer' }}>
                <label className={s.labelSaveImg}>
                  <h3
                    className={clsx('button', files?.[2] ? s.uploadedFileText : s.uploadFileText)}>
                    {pictureDownloadIcon()}
                  </h3>
                  <input
                    accept=".svg, .png, .bmp, .gif, .jpg, .gif, .jpeg"
                    type="file"
                    id="file1"
                    onChange={(e) => {
                      // @ts-ignore
                      setFileByIdx({ idx: 2, inputFile: e?.target?.files[0] });
                    }}
                  />
                </label>
              </div>
              <div style={{ cursor: 'pointer' }}>
                <label className={s.labelSaveImg}>
                  <h3
                    className={clsx('button', files?.[3] ? s.uploadedFileText : s.uploadFileText)}>
                    {pictureDownloadIcon()}
                  </h3>
                  <input
                    accept=".svg, .png, .bmp, .gif, .jpg, .gif, .jpeg"
                    type="file"
                    id="file1"
                    onChange={(e) => {
                      // @ts-ignore
                      setFileByIdx({ idx: 3, inputFile: e?.target?.files[0] });
                    }}
                  />
                </label>
              </div>
              <div style={{ cursor: 'pointer' }}>
                <label className={s.labelSaveImg}>
                  <h3
                    className={clsx('button', files?.[4] ? s.uploadedFileText : s.uploadFileText)}>
                    {pictureDownloadIcon()}
                  </h3>
                  <input
                    accept=".svg, .png, .bmp, .gif, .jpg, .gif, .jpeg"
                    type="file"
                    id="file1"
                    onChange={(e) => {
                      // @ts-ignore
                      setFileByIdx({ idx: 4, inputFile: e?.target?.files[0] });
                    }}
                  />
                </label>
              </div>
              {!isMobile && (
                <div style={{ cursor: 'pointer' }}>
                  <label className={s.labelSaveImg}>
                    <h3
                      className={clsx(
                        'button',
                        files?.[5] ? s.uploadedFileText : s.uploadFileText
                      )}>
                      {pictureDownloadIcon()}
                    </h3>
                    <input
                      accept=".svg, .png, .bmp, .gif, .jpg, .gif, .jpeg"
                      type="file"
                      id="file1"
                      onChange={(e) => {
                        // @ts-ignore
                        setFileByIdx({ idx: 5, inputFile: e?.target?.files[0] });
                      }}
                    />
                  </label>
                </div>
              )}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default GeneralInformation;
