export default (key: string, search: string) => {
  const ret = search.match(new RegExp('(\\?|&)' + key + '=(.*?)(&|$)'));
  return ret && global.decodeURIComponent(ret[2]);
};
