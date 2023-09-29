import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ClickAwayListener from '@/components/elements/ClickAwayListener';

type PopoverProps = {
  open?: boolean;
  onClose?: () => void;
  anchorEl?: Element | null;
  children?: React.ReactNode;
  width?: number;
};

const Popover: React.FC<PopoverProps> = ({ open, anchorEl, onClose, children, width }) => {
  const portalRef = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    portalRef.current = document.querySelector<HTMLElement>('#portal');
    setMounted(true);
  }, []);

  const selectContainerRect = anchorEl ? anchorEl.getBoundingClientRect() : null;

  if (!(mounted && portalRef.current && open)) return null;

  return ReactDOM.createPortal(
    <ClickAwayListener onClickAway={onClose}>
      <div
        style={{
          position: 'absolute',
          ...(selectContainerRect && {
            left: selectContainerRect.left,
            top:
              selectContainerRect.top +
              selectContainerRect.height +
              10 +
              document.documentElement.scrollTop,
            width: width || selectContainerRect.width,
          }),
        }}>
        {children}
      </div>
    </ClickAwayListener>,
    portalRef.current
  );
};

export default Popover;
