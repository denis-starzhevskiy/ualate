import React from 'react';
import s from './ShowMoreButton.module.scss';
import { searchIcon } from '@/components/modules/icons';

type ShowMoreButtonProps = {
  onClick?: () => void;
};

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({ onClick }) => {
  return (
    <button className={s.showMoreButton} onClick={onClick}>
      {searchIcon()}
      <div>Показати ще</div>
    </button>
  );
};
export default ShowMoreButton;
