import classNames from "classnames";
import { FC } from "react";

interface CheckboxProps {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  isChecked,
  setIsChecked,
}: CheckboxProps) => {
  return (
    <div className={
      classNames('flex flex-col items-center justify-center w-5 h-5 rounded-full border cursor-pointer', {
        'border-[#25D695]': isChecked,
        'border-[#5E6773]': !isChecked,
      })}
      onClick={() => setIsChecked(!isChecked)}
    >
      <div className={
        classNames('w-2.5 h-2.5 rounded-full', {
          'bg-[#25D695]': isChecked,
          '': !isChecked,
        })}
      />
    </div>
  );
};
