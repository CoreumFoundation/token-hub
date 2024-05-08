import Big from "big.js";
import classNames from "classnames";
import { FC } from "react";

interface DecimalProps {
  value: string;
  precision: number;
  className?: string;
  integerClassName?: string;
  decimalsClassName?: string;
}

export const Decimal: FC<DecimalProps> = ({
  value,
  precision,
  className,
  integerClassName,
  decimalsClassName,
}) => {
  if (precision > 0) {
    const formattedValue = Big(value).toFixed(precision);
    const [integerPart, decimalsPart] = formattedValue.split('.');

    return (
      <div className={classNames('text-left flex items-baseline text-[#eee]', className)}>
        <span className={classNames('text-base', integerClassName)}>{Number(integerPart).toLocaleString()}</span>
        <span className={classNames('text-xs', decimalsClassName)}>.{decimalsPart}</span>
      </div>
    );
  }

  const [integerPart] = value.split('.');

  return (
    <div className="flex items-baseline">
      <span className={classNames('text-base', integerClassName)}>
        {Number(integerPart).toLocaleString()}
      </span>
    </div>
  );
};
