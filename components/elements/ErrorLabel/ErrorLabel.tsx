import React from 'react';

const ErrorLabel = ({ text }: { text: string | undefined }) => {
  return <label style={{ color: 'red', fontSize: '12px' }}>{text}</label>;
};

export default ErrorLabel;
