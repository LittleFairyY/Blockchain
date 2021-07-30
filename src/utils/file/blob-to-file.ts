export default (blob: Blob, fileName: string, type: string) => {
  var nFile = new File([blob], fileName, {
    type,
  });
  return nFile;
};
