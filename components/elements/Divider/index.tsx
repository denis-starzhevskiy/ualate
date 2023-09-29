import React from 'react';
import s from './Divider.module.scss';
import clsx from 'clsx';

type DividerProps = {
  style?: React.CSSProperties;
  className?: string;
};

const Divider: React.FC<DividerProps> = ({ style, className }) => {
  return <div className={clsx(s.divider, className)} style={style}></div>;
};

export default Divider;
