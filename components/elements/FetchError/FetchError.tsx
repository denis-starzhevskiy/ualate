import React from 'react';

const FetchError = ({}: {}) => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '50px' }}>
      <p>Не вдалося завантажити дані</p>
    </div>
  );
};

export default FetchError;
