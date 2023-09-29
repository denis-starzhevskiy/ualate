import React from 'react';
import Modal from '@/components/elements/Modal';
import s from './SearchModal.module.scss';
import clsx from 'clsx';
import PageTitle from '@/components/elements/PageTitle';
import Button from '@/components/elements/Button';
import Image from 'next/image';
import closeIcon from '@/public/images/closeIcon.svg';
import 'react-toastify/dist/ReactToastify.css';
import { useSearch } from '@/hooks/api/useBooks';
import { useRouter } from 'next/router';

type SearchModalProps = {
  open?: boolean;
  onClose?: () => void;
  searchRequest: string;
};

const SearchModal: React.FC<SearchModalProps> = ({ open, onClose, searchRequest }) => {
  const router = useRouter();
  const { data: searchData } = useSearch(searchRequest);

  const onCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <Modal open={open} onClose={onCloseModal}>
        <div className={s.modalContainer}>
          <Image
            className={s.closeIcon}
            src={closeIcon}
            alt={'close modal'}
            onClick={onCloseModal}
          />
          <PageTitle title={'Результати пошуку'} />
          <div className={s.itemsContainer}>
            {!searchData ||
              (searchData.count === 0 && (
                <p style={{ textAlign: 'center' }}>Результати не знайдено.</p>
              ))}
            {searchData &&
              searchData.results.slice(0, 5).map((item, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onCloseModal();
                      router.push(`/books/${item.id}`);
                    }}
                    className={s.item}>
                    <Image
                      src={item.main_photo.slice(0, 17) + '/api' + item.main_photo.slice(17)}
                      alt={''}
                      width={50}
                      height={50}
                    />
                    <p>{item.title}</p>
                  </div>
                );
              })}
          </div>
          <div className={s.btnContainer}>
            {!searchData ||
              (searchData.count !== 0 && searchData.count > 5 && (
                <Button
                  className={clsx(s.submitBtn)}
                  onClick={() => {
                    onCloseModal();
                    router.push(`/catalog?search=${searchRequest}`);
                  }}>
                  Переглянути всі
                </Button>
              ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SearchModal;
