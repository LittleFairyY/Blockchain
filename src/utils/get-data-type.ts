export const getDataType = (data: any): string => {
  return Object.prototype.toString.call(data).slice(-7, -1);
};
