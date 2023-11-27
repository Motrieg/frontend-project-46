import fs from 'node:fs';
import * as path from 'path';
import parseFile from './parser.js';
import _ from 'lodash';

//const getFilePath = (filePath) => resolve(cwd(), filePath);

const getFormat = (filePath) => path.extname(filePath).slice(1);

//const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const getData = (filePath) => fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf-8');

const gendiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const obj1 = parseFile(data1, getFormat(filepath1));
  const obj2 = parseFile(data2, getFormat(filepath2));

  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();

  let diff = '';

  keys.forEach((key) => {
    if (!_.has(obj1, key)) {
      diff += `+ ${key}: ${obj2[key]}\n`;
    } else if (!_.has(obj2, key)) {
      diff += `- ${key}: ${obj1[key]}\n`;
    } else if (obj1[key] !== obj2[key]) {
      diff += `- ${key}: ${obj1[key]}\n`;
      diff += `+ ${key}: ${obj2[key]}\n`;
    } else {
      diff += `  ${key}: ${obj1[key]}\n`;
    }
  });

  return diff;

};

export default gendiff;
