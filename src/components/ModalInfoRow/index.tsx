import classNames from "classnames";
import { FC } from "react";

interface ModalInfoRowProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export const ModalInfoRow: FC<ModalInfoRowProps> = ({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
}) => {
  return (
    <div className={classNames('flex items-center justify-between w-full gap-2', className)}>
      <div className={classNames('text-[#5E6773] text-sm font-noto-sans text-nowrap flex-none text-left', labelClassName)}>
        {label}
      </div>
      <div className={classNames('text-[#EEE] text-base font-noto-sans flex-1 max-w-full break-all text-right', valueClassName)}>
        {value}
      </div>
    </div>
  );
};
