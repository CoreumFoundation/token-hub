import { ButtonIcon } from "@/assets/ButtonIcon";
import { ButtonIconColorScheme, ButtonIconType, ButtonType } from "@/shared/types";
import classNames from "classnames";
import { FC, useMemo } from "react";
import { Spinner } from "../Spinner";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type: ButtonType;
  iconType?: ButtonIconType;
  icon?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  type,
  iconType,
  icon,
  className,
  iconClassName,
  loading,
}) => {
  const buttonCx = classNames('flex items-center justify-center gap-1 rounded-xl text-base py-3 px-12 w-full text-nowrap whitespace-nowrap font-noto-sans enabled:hover:opacity-50', {
    'bg-green-gradient text-[#21262E]': type === 'primary' && !disabled,
    'bg-green-opacity-10 text-[#25D695] backdrop-blur-sm': type === 'secondary' && !disabled,
    'text-[#25D695]': type === 'default' && !disabled,
    'bg-[#17191E] text-[#2B3138] gap-2 cursor-not-allowed': disabled,
  }, className);

  const renderIcon = useMemo(() => {
    if (iconType) {
      const fillValue = disabled
        ? ButtonIconColorScheme.Disabled
        : type === ButtonType.Primary ? ButtonIconColorScheme.Primary : ButtonIconColorScheme.Secondary;

      return (
        <ButtonIcon
          type={iconType}
          fill={fillValue}
          className={iconClassName}
        />
      );
    }

    if (icon) {
      return icon;
    }

    return null;
  }, [disabled, icon, iconClassName, iconType, type]);

  if (loading) {
    return (
      <button
        type="button"
        className={buttonCx}
      >
        <Spinner />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={buttonCx}
      onClick={onClick}
      disabled={disabled}
    >
      {renderIcon}
      {label}
    </button>
  );
};
