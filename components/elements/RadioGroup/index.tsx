import React, { useState } from 'react';
import s from './RadioGroup.module.scss';

type Option = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  options: Option[];
  value: string;
  name?: string;
  onChange?: (value: string) => void;
};

const RadioGroup = ({
  value: valueProp,
  onChange: onChangeProp,
  name,
  options,
}: RadioGroupProps) => {
  const [value, setValue] = useState(valueProp);

  const onChange = (value: string) => {
    setValue(value);
    onChangeProp?.(value);
  };

  return (
    <>
      {options.map((option) => (
        <label key={option.value} className={s.container}>
          <input
            type={'radio'}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            name={name}
          />
          <span className={s.checkmark}></span>
          <span className={s.label}>{option.label}</span>
        </label>
      ))}
    </>
  );
};

export default RadioGroup;
