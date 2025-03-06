export const pluralize = (
  str: string,
  count: number,
  suffix: string = "s"
): string => {
  return count === 1 ? str : `${str}${suffix}`;
};

export const capitalize = (str: string) => {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
};
