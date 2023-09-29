import React, { useState } from 'react';
import s from './Menu.module.scss';
import clsx from 'clsx';

type MenuItemType = {
  label: string;
  value: string;
};

type MenuProps = {
  menu: MenuItemType[];
  value?: string;
  onChange?: (value: string) => void;
};

const Menu: React.FC<MenuProps> = ({ menu, value: valueProp, onChange }) => {
  const [value, setValue] = useState(valueProp);

  return (
    <ul className={s.buttonsList}>
      {menu.map((item) => (
        <li key={item.value}>
          <button
            className={clsx(value === item.value && s.active)}
            onClick={() => {
              setValue(item.value);
              onChange?.(item.value);
            }}>
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
