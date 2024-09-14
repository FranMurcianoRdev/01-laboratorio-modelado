export const isValidString = (value: any): boolean => {
  return typeof value === 'string' && value.trim() !== '';
};

export const isValidNumber = (value: any): boolean => {
  return typeof value === 'number' && !isNaN(value);
};
