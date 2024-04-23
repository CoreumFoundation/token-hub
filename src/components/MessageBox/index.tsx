'use client';

import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType } from "@/shared/types";
import classNames from "classnames";
import { FC, useState } from "react";

interface MessageBoxProps {
  children: React.ReactNode;
}

export const MessageBox: FC<MessageBoxProps> = ({
  children,
}) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const cx = classNames('flex bg-[#17191E] backdrop-blur-sm py-4 px-5 gap-10 w-full rounded-xl', {
    'hidden': isClosed,
  });

  return (
    <div className={cx}>
      <div className="flex-1">
        {children}
      </div>
      <GeneralIcon onClick={() => setIsClosed(true)} type={GeneralIconType.Close} className="group cursor-pointer" pathClassName="group-hover:fill-[#eee]" />
    </div>
  );
};
