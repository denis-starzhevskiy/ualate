import React from 'react';
import s from './NotificationsLayout.module.scss';

type NotificationsLayoutProps = {
  leftSide: React.ReactNode;
  rightSide: React.ReactNode;
};

const NotificationsLayout: React.FC<NotificationsLayoutProps> = ({ leftSide, rightSide }) => {
  return (
    <div className={s.container}>
      <div>{leftSide}</div>
      <div>{rightSide}</div>
    </div>
  );
};

export default NotificationsLayout;
