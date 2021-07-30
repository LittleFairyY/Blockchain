function toThousands(num: string) {
  if (num.includes('.')) {
    const value = num.split('.');
    return `${(value[0] || 0)
      .toString()
      .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}.${value[1]}`;
  }
  const newNum = num.includes('.') ? num.split('.') : num;
  return (newNum || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
export default toThousands;
