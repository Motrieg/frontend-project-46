import fs from 'node:fs';
import { cwd } from 'node:process';
import { resolve, path } from 'node:path';
import parseFile from './parser.js';

const getFilePath = (filePath) => resolve(cwd(), filePath);

const getFormat = (filePath) => path.extname(filePath).slice(1);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const getData = (filePath) => fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf-8');

const gendiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const obj1 = parseFile(data1, getFormat(filepath1));
  const obj2 = parseFile(data2, getFormat(filepath2));

};

export default gendiff;
