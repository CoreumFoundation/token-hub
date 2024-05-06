import { AlertIcon } from '@/assets/AlertIcon';
import { GeneralIcon } from '@/assets/GeneralIcon';
import { AlertType, GeneralIconType } from '@/shared/types';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';

export interface AlertProps {
  type: AlertType;
  title: string;
  message?: string;
  onClose?: () => void;
  onCloseByClick?: () => void;
}

const ALERT_DISPLAY_TIME = 5; // in seconds

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  onCloseByClick,
}: AlertProps) => {
  const handleCloseAlert = useCallback(() => {
    onCloseByClick?.();
  }, [onCloseByClick]);

  useEffect(() => {
    if (ALERT_DISPLAY_TIME) {
      setTimeout(() => {
        onClose?.();
      }, +ALERT_DISPLAY_TIME * 1000);
    }
  }, []);

  return (
    <div className="flex flex-col items-start gap-1.5 min-w-[266px] w-fit max-w-xs h-max p-3 pr-2.5 bg-[#1B1D23] box-shadow-custom rounded-[10px] relative font-noto-sans">
      <div className="flex items-center justify-between w-full gap-2">
        <div
          className="flex items-center gap-2 w-full"
        >
          <AlertIcon type={type} />
          <span className="whitespace-nowrap text-[#EEE] text-sm tracking-[-0.21px] font-normal">
            {title}
          </span>
        </div>
        <button onClick={handleCloseAlert}>
          <GeneralIcon type={GeneralIconType.AlertClose} className="group cursor-pointer" pathClassName="group-hover:fill-[#eee]" />
        </button>
      </div>
      {message?.length && (
        <div className="text-left text-xs text-[#9FA2AC] max-w-full font-normal tracking-wide">
          {message}
        </div>
      )}
    </div>
  );
};
