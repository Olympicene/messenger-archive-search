import config from 'conf';
import chalk from 'chalk';
import * as fs from 'fs';
import { Reader, listOfFiles } from '../helper/read.js';
import { dir } from 'console';
import utf8 from 'utf8';
import buffer from 'buffer';
import assert from 'assert';
import iconv from 'iconv-lite';

const conf = new config();

export function fixEncoding() {
  ///////////////////////////////////////////////////////////////////////////File Prep
  //get all messenger archive files
  let allFiles = listOfFiles();
  console.log(`Found ${allFiles.length} messenger archive files.`);

  ///////////////////////////////////////////////////////////////////////////Iterate Through files
  for (let fileName of allFiles) {
  	let file = JSON.parse(fs.readFileSync(fileName));
  	file = parseObject(file); //repair encoding

    //write in new file
  	fs.writeFile(fileName, JSON.stringify(file, null, '\t'), (err) => {
  		if (err) return console.error(err);
  	});

  	console.log(`Successfully fixed ${fileName}`);
  }
}

//recursively goes through file object and checks then encodes and decodes every string to fix Mojibake
function parseObject(object) {
  if (typeof object == 'string') { //encode w/ latin 1 and decord with utf8
    return iconv.decode(iconv.encode(object, 'latin1'), 'utf8');;
  }

  if (typeof object == 'object') { //recursively traverse objects
    for (let key in object) {
      object[key] = parseObject(object[key]);
    }
    return object;
  }

  return object; //return final object
}
