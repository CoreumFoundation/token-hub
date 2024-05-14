import { FC } from "react";

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
}

export const Tooltip: FC<TooltipProps> = ({
  content,
  children,
}) => {
  return (
    <div className="has-tooltip group">
      <span className="cursor-default tooltip rounded-lg shadow-lg px-3 py-2 bg-[#2B3138] text-sm font-noto-sans text-[#EEE] mt-6">
        {content}
      </span>
      {children}
    </div>
  );
};
