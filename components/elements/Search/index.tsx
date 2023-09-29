import GlobalSvgSelector from '@/components/GlobalSvgSelector';
import React, { ChangeEvent } from 'react';

import s from './Search.module.scss';
import clsx from 'clsx';

type Props = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  icon?: string;
  className?: string;
  disabled?: boolean;
  value?: string;
  onChangeValue?: (value: string) => void;
  onSubmitClick?: (value: string) => void;
};

const Search = ({
  label,
  placeholder,
  required,
  icon,
  className,
  disabled,
  value,
  onChangeValue,
  onSubmitClick,
}: Props) => {
  // const [value, setValue] = React.useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  // const debouncedOnChange = useCallback(
  //   debounce((str: string) => setValue(str), 200),
  //   []
  // );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    // setValue(event.target.value);
    if (onChangeValue) {
      onChangeValue(event.target.value);
    }
    // debouncedOnChange(event.target.value);
  };

  const onKeyClick = (event) => {
    if (event.key === 'Enter') {
      // setValue('');
      if (onSubmitClick) {
        onSubmitClick(event.target.value);
      }
    }
  };

  return (
    <label className={clsx(s.search, className)}>
      {label && <span className={s.label}>{label}</span>}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          if (!disabled) {
            onChange(e);
          }
        }}
        placeholder={placeholder}
        required={required}
        onKeyDown={onKeyClick}
      />
      {icon && (
        <div className={s.icon}>
          <GlobalSvgSelector id={icon} />
        </div>
      )}
    </label>
  );
};

export default Search;
