export const pluralize = (str: string, count: number, suffix: string = "s"): string => {
    return count === 1 ? str : `${str}${suffix}`;
};
