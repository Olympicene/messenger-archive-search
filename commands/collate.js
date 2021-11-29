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

export function collate(file) {
  ///////////////////////////////////////////////////////////////////////////File Prep
  //final collate file
  let collateFile = {
    participants: [],
    messages: [],
  };

  //get all files from input if they exist, otherwise get all archive files
  let allFiles = 'input' in file ? file.input : listOfFiles();
  console.log(`Found ${allFiles.length} messenger archive files.`);

  ///////////////////////////////////////////////////////////////////////////Get Participants + Messages
  //iterate through all files and get all participants + Messages
  for (let fileName of allFiles) {
    let file = new Reader(fileName);

    //if collateFile does not have participant push it into collate File
    for (let person of file.getParticipants()) {
      if (!collateFile.participants.includes(person.name)) {
        collateFile.participants.push(person.name);
      }
    }

    collateFile.messages = collateFile.messages.concat(file.getMessages());

    console.log(`Successfully read ${fileName}`);
  }

  ///////////////////////////////////////////////////////////////////////////Formatting
  //set back to original formatting where name was within object
  for (let index in collateFile.participants) {
    collateFile.participants[index] = {
      name: collateFile.participants[index],
    };
  }

  ///////////////////////////////////////////////////////////////////////////Writing File

  let fileName = file.output;

  //delete if duplicates
  if(fs.existsSync(fileName)) {
    console.log('Duplicate File found. Deleting ...');
    fs.unlinkSync(fileName);
  }

  fs.writeFileSync(fileName, JSON.stringify(collateFile, null, '\t'));
  console.log(
    `Successfully collated all messenger archive files into ${fileName}`
  );
}
