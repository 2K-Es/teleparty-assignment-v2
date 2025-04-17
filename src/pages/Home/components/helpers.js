import { nanoid } from '@reduxjs/toolkit';

const parseImageAsUrl = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target.result); // Base64 string (data URL)
    };

    reader.readAsDataURL(file);
  });
};

const getFileExtension = (file) => {
  return file.name.split('.').pop(); // Extracts the extension after the last dot
};

const generateUniqueFileName = (file) => {
  const extension = getFileExtension(file);
  const uniqueId = nanoid(10);
  return `${uniqueId}.${extension}`;
};

export { parseImageAsUrl, generateUniqueFileName };
