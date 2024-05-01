import Big from "big.js";

export const convertSubunitToUnit = ({
  amount,
  precision,
}: {
  amount: string;
  precision: number;
}) => {
  const precisionFactor = new Big(10).pow(precision);

  return new Big(amount).div(precisionFactor).toFixed(precision);
};

export const convertUnitToSubunit = ({
  amount,
  precision,
}: {
  amount: string;
  precision: number;
}) => {
  const precisionFactor = new Big(10).pow(precision);

  return new Big(amount).mul(precisionFactor).toFixed(0);
};
