export const calculateStandardDeviation = (values: number[]): number => {
  const sum = values.reduce((sum, value) => sum + value, 0);
  const length = values.length;
  const mean = sum / length;
  const squaredDifferences = values.map((value) => Math.pow(value - mean, 2));
  const variance =
    squaredDifferences.reduce((sum, value) => sum + value, 0) / length;

  return parseFloat(Math.sqrt(variance).toFixed(2));
};
