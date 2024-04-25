import classNames from "classnames";
import { FC } from "react";

interface SectionWithLabelProps {
  label: string | React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
}

export const SectionWithLabel: FC<SectionWithLabelProps> = ({
  label,
  children,
  contentClassName,
}) => {
  const contentCx = classNames('flex flex-col w-full px-5 py-4 font-noto-sans border border-[#1B1D23] rounded-[10px]', contentClassName);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex w-full font-noto-sans text-[#868991] text-sm">
        {label}
      </div>
      <div className={contentCx}>
        {children}
      </div>
    </div>
  );
};
