require('dotenv').config();

const salt = process.env.CURSOR_SALT!;
const saltLen = salt.length;

const cursorToHash = (cursor: any) => {
  return Buffer.from(salt + String(cursor)).toString('base64');
};

const hashToCursor = (hash: string) => {
  return Buffer.from(hash, 'base64').toString('ascii').substr(saltLen);
};

const minCursorLenght: number = cursorToHash('').length;

export { cursorToHash, hashToCursor, minCursorLenght };
