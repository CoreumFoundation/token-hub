import { GeneralIcon } from "@/assets/GeneralIcon";
import { getNumberRegex } from "@/helpers/getNumberRegex";
import { GeneralIconType } from "@/shared/types";
import classNames from "classnames";
import { ChangeEvent, FC, useCallback, useMemo, useState } from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder: string;
  disabled?: boolean;
  id?: string;
  error?: string;
  buttonLabel?: string;
  handleOnButtonClick?: () => void;
  icon?: React.ReactNode;
}

export const Input: FC<InputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled = false,
  id,
  error,
  buttonLabel,
  handleOnButtonClick,
  icon,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputCx = useMemo(() => {
    return classNames('flex items-center w-full gap-3 justify-between border border-[#1B1D23] py-3 px-4 rounded-[10px]', {
      'border-[#25D695]': isFocused,
      'hover:border-[#2B3138]': !isFocused && !disabled && !error?.length,
      'border-[#17191E]': !isFocused && !disabled && !error?.length && value.length,
      'border-[#DE0F3E]': error?.length,
      'border-transparent': disabled,
    });
  }, [disabled, error?.length, isFocused, value.length]);

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.length) {
      onChange('');
      return;
    }

    if (type === 'number') {
      if (getNumberRegex().test(e.target.value)) {
        onChange(e.target.value);
      }
    } else {
      onChange(e.target.value);
    }
  }, [onChange, type]);

  return (
    <div className="flex flex-col w-full gap-2 relative">
      <label
        className="block text-sm text-[#868991] font-noto-sans"
      >
        {label}
      </label>
      <div className={inputCx}>
        <input
          type="text"
          name={id || label.toLowerCase()}
          id={id}
          className="flex-1 w-full bg-transparent text-[#EEE] placeholder:text-[#5E6773] outline-none shadow-sm"
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={handleChangeInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {icon && (
          <div className="flex items-center">
            {icon}
          </div>
        )}
        {buttonLabel && (
          <div className="flex items-center pr-3">
            <div
              className="text-[#25D695] text-sm font-noto-sans cursor-pointer"
              onClick={() => handleOnButtonClick?.()}
            >
              {buttonLabel}
            </div>
          </div>
        )}
      </div>
      {error && (
        <div className="absolute bottom-0 flex items-center gap-2 -mb-7 text-xs text-[#DE0F3E]">
          <GeneralIcon type={GeneralIconType.Error} /> {error}
        </div>
      )}
    </div>
  )
}
