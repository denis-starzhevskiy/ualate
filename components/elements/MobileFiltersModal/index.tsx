import React, { useEffect } from 'react';
import s from './MobileFiltersModal.module.scss';
import Modal from '@/components/elements/Modal';
import Filters from '@/components/elements/Filters';
import Image from 'next/image';
import closeIcon from '@/public/images/closeIcon.svg';

type MobileFiltersModalProps = {
  open?: boolean;
  onClose?: () => void;
  filterQuery: {};
  setFilterQuery: (prev: any) => void;
};

const MobileFiltersModal = ({
  open,
  onClose,
  filterQuery,
  setFilterQuery,
}: MobileFiltersModalProps) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
  }, [open]);

  return (
    <Modal open={open} className={s.modal}>
      <div className={s.container}>
        <Image className={s.closeIcon} src={closeIcon} alt={'close modal'} onClick={onClose} />
        <Filters filteredQuery={filterQuery} setFilteredQuery={setFilterQuery} />
      </div>
    </Modal>
  );
};

export default MobileFiltersModal;
