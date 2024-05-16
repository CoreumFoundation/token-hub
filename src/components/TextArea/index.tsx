import { GeneralIcon } from "@/assets/GeneralIcon";
import { GeneralIconType } from "@/shared/types";
import classNames from "classnames";
import { ChangeEvent, FC, useCallback, useMemo, useState } from "react";

interface TextAreaProps {
  label?: string;
  value: string;
  rows: number;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  id?: string;
  error?: string;
  className?: string;
}

export const TextArea: FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  id,
  error,
  rows,
  className,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const textAreaCx = useMemo(() => {
    return classNames('flex items-center w-full gap-3 justify-between border border-[#1B1D23] py-3 px-4 rounded-[10px]', {
      'border-[#25D695]': isFocused,
      'hover:border-[#2B3138]': !isFocused && !disabled && !error?.length,
      'border-[#17191E]': !isFocused && !disabled && !error?.length && value.length,
      'border-[#DE0F3E]': error?.length,
      'border-transparent': disabled,
    }, className);
  }, [disabled, error?.length, isFocused, value.length, className]);

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, []);

  return (
    <div className="flex flex-col w-full gap-2 relative">
      {label && (
        <label
          htmlFor={id || label?.toLowerCase()}
          className="block text-sm text-[#868991] font-noto-sans"
        >
          {label}
        </label>
      )}
      <div className={textAreaCx}>
        <textarea
          rows={rows}
          name={id || label?.toLowerCase()}
          id={id}
          className="flex-1 w-full bg-transparent text-[#EEE] placeholder:text-[#5E6773] outline-none shadow-sm resize-none"
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={handleChangeInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {error && (
        <div className="absolute bottom-0 flex items-center gap-2 -mb-9 sm:-mb-7 text-xs text-[#DE0F3E]">
          <GeneralIcon type={GeneralIconType.Error} /> {error}
        </div>
      )}
    </div>
  )
}
