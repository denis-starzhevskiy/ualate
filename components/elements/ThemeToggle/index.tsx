import React, { useEffect } from 'react';

import s from './ThemeToggle.module.scss';

type Props = {};

const ThemeToggle = () => {
  const [currentTheme, SetCurrentTheme] = React.useState('dark');

  useEffect(() => {
    if (window) {
      const theme = localStorage.getItem('theme');
      if (theme) {
        if (theme === 'light') {
          SetCurrentTheme('light');
        } else {
          SetCurrentTheme('dark');
        }
      } else {
        SetCurrentTheme('dark');
      }
    }
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetCurrentTheme(e.currentTarget.checked ? 'dark' : 'light');
    if (window) {
      const theme = localStorage.getItem('theme');
      if (theme) {
        if (theme === 'light') {
          localStorage.setItem('theme', 'dark');
        } else {
          localStorage.setItem('theme', 'light');
        }
      } else {
        localStorage.setItem('theme', 'dark');
      }

      window.location.reload();
    }
  };

  return (
    <label className={s.switch}>
      <input type="checkbox" checked={currentTheme === 'dark'} onChange={handleOnChange} />
      <span className={s.slider}></span>
    </label>
  );
};

export default ThemeToggle;
