import React, { useEffect, useState } from 'react';

const fontSizePaddings = {
  14: 42,
  15: 83,
  16: 125,
  17: 167,
  18: 208,
};

const getLeftPaddingByFontSize = (value: number) => {
  switch (value) {
    case 14:
      return 42;
    case 15:
      return 83;
    case 16:
      return 125;
    case 17:
      return 167;
    case 18:
      return 208;

    default:
      return 42;
  }
};

const Slider = ({
  initFontSize,
  setNewFontSize,
}: {
  initFontSize: number;
  setNewFontSize: (fontSize: number) => void;
}) => {
  const [fontSize, setFontSize] = useState<number>(initFontSize);

  useEffect(() => {
    setNewFontSize(fontSize);
  }, [fontSize]);

  return (
    <>
      <div
        id={'background-range'}
        style={{
          height: 1,
          position: 'relative',
          width: 250,
          background: `linear-gradient( to right, #00eafd ${getLeftPaddingByFontSize(
            fontSize
          )}px, #5e626c ${getLeftPaddingByFontSize(fontSize)}px )`,
          margin: '60px 0 20px 0',
        }}>
        <div
          style={{
            background: '#00eafd',
            width: 10,
            height: 10,
            borderRadius: '50%',
            top: -5,
            position: 'absolute',
            left: getLeftPaddingByFontSize(fontSize) - 5,
          }}></div>
        {Object.keys(fontSizePaddings).map((item) => {
          return (
            <>
              <label
                style={{
                  position: 'absolute',
                  left: getLeftPaddingByFontSize(Number.parseInt(item)) - 10,
                  top: -40,
                }}>
                {item}
              </label>
              <div
                onClick={() => {
                  setFontSize(Number.parseInt(item));
                }}
                style={{
                  position: 'absolute',
                  left: getLeftPaddingByFontSize(Number.parseInt(item)) - 10,
                  top: -15,
                  height: 30,
                  width: 20,
                  backgroundColor: 'transparent',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <div
                  key={item}
                  style={{
                    top: -10,
                    height: 20,
                    width: 1,
                    backgroundColor: Number.parseInt(item) > fontSize ? '#5e626c' : '#00eafd',
                  }}></div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default Slider;
