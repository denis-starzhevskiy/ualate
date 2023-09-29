import React from 'react';
import s from './CatalogLayout.module.scss';

type CatalogLayoutProps = {
  leftSide: React.ReactNode;
  rightSide: React.ReactNode;
};

const CatalogLayout: React.FC<CatalogLayoutProps> = ({ leftSide, rightSide }) => {
  return (
    <div className={s.container}>
      <div>{leftSide}</div>
      <div>{rightSide}</div>
    </div>
  );
};

export default CatalogLayout;
