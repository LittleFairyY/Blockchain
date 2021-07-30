import Compressor from 'compressorjs';

const compressImage = (
  file: File | Blob,
  quality: number,
  width: number,
): Promise<File | Blob> =>
  new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('compressImage: file is required'));
    }
    return new Compressor(file, {
      quality,
      width,
      success(result) {
        resolve(result);
      },
      error(error) {
        reject(error);
      },
    });
  });

export default compressImage;
