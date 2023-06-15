export const validate = (inutValue: string) => {
  return inutValue.trim().length > 0 ? true : false;
};
