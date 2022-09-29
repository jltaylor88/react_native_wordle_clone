export const keyFromIndex = (idx: number): string =>
  `${new Date().toISOString()}_${idx}`;

export const generateAlphabetArray = (): string[] => {
  return Array.from(Array(26).keys())
    .map(num => num + 65)
    .map(i => String.fromCharCode(i));
};
