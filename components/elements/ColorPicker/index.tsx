import React, { useEffect, useState } from 'react';

import s from './ColorPicker.module.scss';

type ColorPickerProps = {
  currentFontColor: string;
  setColor: (value: string) => void;
};

const ColorPicker = ({ currentFontColor, setColor }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(currentFontColor);

  useEffect(() => {
    setColor(selectedColor);
  }, [selectedColor]);

  return (
    <div className={s.container}>
      <span className={s.textValue}>{selectedColor}</span>
      <input
        className={s.iconContainer}
        type={'color'}
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      />
    </div>
  );
};

export default ColorPicker;
