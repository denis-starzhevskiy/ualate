import React, { useEffect, useState } from 'react';
import s from './TagCheckbox.module.scss';
import clsx from 'clsx';

type TagCheckBoxProps = {
  label?: React.ReactNode;
  name?: string;
  customClass?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TagCheckbox = ({
  label,
  customClass,
  checked: checkedProp,
  onChange: onChangeProp,
  name,
}: TagCheckBoxProps) => {
  const [checked, setChecked] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChangeProp?.(event);
  };

  useEffect(() => {
    if (checkedProp === undefined) return;
    setChecked(checkedProp);
  }, [checkedProp]);

  return (
    <label className={clsx(s.container, checked && s.checkedContainer, customClass)}>
      <input type={'checkbox'} checked={checked} onChange={onChange} name={name} /># {label}
    </label>
  );
};

export default TagCheckbox;
