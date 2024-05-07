import { FC } from "react";

interface ModalInfoRowProps {
  label: string;
  value: string | React.ReactNode;
}

export const ModalInfoRow: FC<ModalInfoRowProps> = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <div className="text-[#5E6773] text-sm font-noto-sans text-nowrap flex-none text-left">
        {label}
      </div>
      <div className="text-[#EEE] text-base font-noto-sans flex-1 max-w-full break-all text-right">
        {value}
      </div>
    </div>
  );
};
