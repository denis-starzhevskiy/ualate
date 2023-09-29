import React from 'react';
import s from './CheckBox.module.scss';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

type CheckBoxProps = {
  label?: React.ReactNode;
  name?: string;
  customClass?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegisterReturn;
};

const Checkbox = ({ label, customClass, checked, onChange, register }: CheckBoxProps) => {
  return (
    <label className={clsx(s.container, customClass)}>
      {register ? (
        <input type={'checkbox'} {...register} />
      ) : (
        <input type={'checkbox'} checked={checked} onChange={onChange} />
      )}
      <div className={clsx(s.checkmark)}></div>
      {label && <span className={s.label}>{label}</span>}
    </label>
  );
};

export default Checkbox;
