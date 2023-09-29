import React, { useState } from 'react';

import s from './PasswordInput.module.scss';
import { viewHidden, viewOpened } from '@/components/modules/icons';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

type PasswordInputProps = {
  label?: string;
  className?: string;
  register?: UseFormRegisterReturn;
};

const PasswordInput = ({ label, className, register }: PasswordInputProps) => {
  const idx = Math.random().toString();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={clsx(s.container, className)}>
      {label && (
        <label htmlFor={`password-input-${idx}`} className={s.label}>
          {label}
        </label>
      )}
      <div className={s.inputContainer}>
        <input
          id={`password-input-${idx}`}
          type={isOpen ? 'text' : 'password'}
          className={s.input}
          {...register}
        />
        <span className={s.iconContainer} onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? viewOpened() : viewHidden()}
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;
