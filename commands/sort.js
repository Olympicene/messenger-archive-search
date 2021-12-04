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

export function sort(file) {
  ///////////////////////////////////////////////////////////////////////////File Prep


  //get all files from input if they exist, otherwise get all archive files
  let allFiles = 'input' in file ? file.input : listOfFiles();
  console.log(`Found ${allFiles.length} messenger archive files.`);

  ///////////////////////////////////////////////////////////////////////////Get Participants + Messages
  //iterate through all files and get all participants + Messages
  for (let fileName of allFiles) {
    let file = new Reader(fileName);

    //individual sort file
    let sortFile = {
      participants: file.getParticipants(),
      messages: [],
    };

    if(file.date)
    {
      sortFile.messages = file.getMessages().sort((a, b) => (a.timestamp_ms < b.timestamp_ms) ? 1 : -1);
    }
    else {
      sortFile.messages = file.getMessages();
    }

    ///////////////////////////////////////////////////////////////////////////Writing File
    //delete if duplicates
    if(fs.existsSync(fileName)) {
      console.log('Duplicate File found. Deleting ...');
      fs.unlinkSync(fileName);
    }
  
    fs.writeFileSync(fileName, JSON.stringify(sortFile, null, '\t'));
    console.log(
      `Successfully sorted file ${fileName}`
    );
  }



}
