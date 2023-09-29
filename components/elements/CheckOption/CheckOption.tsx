import React, { useState } from 'react';

import s from './CheckOption.module.scss';
import { checkedFilledIcon } from '@/components/modules/icons';
import clsx from 'clsx';

const CheckOption = ({
  checked,
  title,
  setValue,
}: {
  title: string;
  setValue: (checked: boolean) => void;
  checked?: boolean;
}) => {
  const [localChecked, setLocalChecked] = useState<boolean>(checked || false);

  return (
    <div
      className={s.optionContainer}
      onClick={() => {
        setLocalChecked((prev) => {
          setValue(!prev);
          return !prev;
        });
      }}>
      <h4 className={clsx(s.label, localChecked && s.checkedColor)}>
        {localChecked && checkedFilledIcon()}
        {title}
      </h4>
    </div>
  );
};

export default CheckOption;
