export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'new':
      return 'Випуск';
    case 'in progress':
      return 'Переводиться';
    case 'output':
      return 'Вихід';
    case 'waiting':
      return 'Очікування глав';
    default:
      return 'Не визначено';
  }
};
