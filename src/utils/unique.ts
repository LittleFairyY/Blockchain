const innerUnique = (array: any[]) => Array.from(new Set(array));

export default (array: any[], keyName?: string): any[] => {
  if (!keyName) {
    return innerUnique(array);
  }
  return innerUnique(array.map(e => e[keyName])).map(k =>
    array.find(e => e[keyName] === k),
  );
};
