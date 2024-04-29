import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType } from "@/shared/types";
import classNames from "classnames";
import { FC, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string | React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  wrapperClassName,
  headerClassName,
  bodyClassName,
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={classNames('flex flex-col items-center justify-center w-full h-screen max-w-full absolute left-0 right-0 top-0 bottom-0 bg-black/75 backdrop-blur-[2px] z-50', className)}>
      <div className={classNames('flex flex-col w-[640px] max-w-full overflow-y-auto p-8 bg-[#101216] rounded-2xl backdrop-blur-sm gap-8', wrapperClassName)}>
        <div className={classNames('flex justify-between w-full text-lg font-space-grotesk text-[#eee] font-medium', headerClassName)}>
          {title}
          <div
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={onClose}
          >
            <GeneralIcon type={GeneralIconType.Close} className="group cursor-pointer" pathClassName="group-hover:fill-[#eee]" />
          </div>
        </div>
        <div className={classNames('flex flex-col w-full', bodyClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
};
