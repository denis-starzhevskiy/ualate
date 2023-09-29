import React from 'react';

import s from './Coins.module.scss';

const CoinsLabel = ({ coins }: { coins: number }) => {
  return (
    <div className={s.coinsContainer}>
      <div className={s.mainText}>ПОДЯКУВАТИ</div>
      <div className={s.priceLabel}>
        <p>(</p>
        <div className={s.coinsNumberLabel}>{coins}</div>
        <div className={s.labelColor}>UAcoins</div>
        <p>)</p>
      </div>
    </div>
  );
};

export default CoinsLabel;
