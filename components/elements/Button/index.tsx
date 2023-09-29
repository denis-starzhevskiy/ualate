import GlobalSvgSelector from '@/components/GlobalSvgSelector';
import clsx from 'clsx';
import React from 'react';
import s from './Button.module.scss';

type Props = {
  className?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  onClick?: () => void;
  icon?: string;
  variant?: 'white' | 'transparent';
};

const Button = ({ className, children, type, disabled, onClick, icon, variant }: Props) => {
  return (
    <button
      className={clsx(s.button, variant === 'white' && s.white, className)}
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}>
      {icon && (
        <div className={s.icon}>
          <GlobalSvgSelector id={icon} />
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
