export const formatNumber = (value: number, decimals = 2): string => {
  const units = ['K', 'M', 'B'];
  const thresholds = [1_000, 1_000_000, 1_000_000_000];

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (value >= thresholds[i]) {
      const formattedValue = (Math.floor(value / (thresholds[i] / 100)) / 100).toFixed(decimals);
      return parseFloat(formattedValue).toString() + units[i];
    }
  }

  return value.toString();
};

export const formatNumberWithThousandSeparator = (value: number): string => {
  return (value || '0').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
