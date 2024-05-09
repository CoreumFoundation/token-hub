import { FC } from "react";
import Image from 'next/image';
import classNames from "classnames";

interface NFTItemProps {
  imgPath: string;
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  isActive?: boolean;
  className?: string;
  description?: string;
}

export const NFTItem: FC<NFTItemProps> = ({
  imgPath,
  label,
  onClick,
  icon,
  isActive,
  className,
  description,
}) => {
  const contentCx = classNames('flex items-center w-full gap-1 text-sm tracking-[-0.21px]', {
    'justify-between': icon !== undefined,
  });

  return (
    <div
      className={classNames('flex flex-col items-center w-40 max-w-full rounded-lg overflow-hidden bg-[#17191E] text-[#9FA2AC] group hover:bg-[#2B3138] hover:text-[#eee] shadow-lg cursor-pointer box-content font-noto-sans', {
        ' border-[1.5px] border-[#25D695]': isActive,
      }, className)}
      onClick={onClick}
    >
      <Image className="w-full h-40" src={imgPath} alt={label} width="160" height="160" />
      <div className="flex flex-col w-full gap-1 p-3">
        <div className={contentCx}>
          {label}
          {icon ? icon : ''}
        </div>
        {description && (
          <div className="text-xs text-[#5E6773]">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
