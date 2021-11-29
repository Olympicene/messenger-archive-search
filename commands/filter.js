import config from 'conf';
import chalk from 'chalk';
import * as fs from 'fs';
import { Reader, listOfFiles } from '../helper/read.js';
import { dir } from 'console';
import utf8 from 'utf8';
import buffer from 'buffer';
import assert from 'assert';
import iconv from 'iconv-lite';
import { urlToHttpOptions } from 'url';

export function filter(option) {
  ///////////////////////////////////////////////////////////////////////////File Prep
  //final filter file
  let filterFile = {
    participants: [],
    messages: [],
  };

  //get all files from input if they exist, otherwise get all archive files
  let allFiles = 'input' in option ? option.input : listOfFiles();
  console.log(`Found ${allFiles.length} messenger archive files.`);

  ///////////////////////////////////////////////////////////////////////////Get Participants + Messages
  //iterate through all files and get all participants + Messages
  for (let fileName of allFiles) {
    let file = new Reader(fileName);

    //go through every message in file
    for (let message of file.getMessages()) {

      //check if sender filter is present and if message is from sender
      if (option.sender && !(message.sender_name == option.sender)) {
        continue;
      }

      //check if sender filter is present and if message is has exact reacts
      if (option.reacts && !('reactions' in message && Object.keys(message.reactions).length == option.reacts)) {
        continue;
      }
      
      //check if isUnsent filter is present and if message is unsent
      if ('isUnsent' in option && !(message.is_unsent == option.isUnsent)) {
        continue;
      }

      //push message
      filterFile.messages.push(message); 

      //push participant
      if (!filterFile.participants.includes(message.sender_name)) { 
        filterFile.participants.push(message.sender_name);
      }
    }

    console.log(`Successfully read ${fileName}`);
  }

  ///////////////////////////////////////////////////////////////////////////Writing File

  let fileName = option.output;

  //delete if duplicates
  if(fs.existsSync(fileName)) {
    console.log('Duplicate File found. Deleting ...');
    fs.unlinkSync(fileName);
  }

  fs.writeFileSync(fileName, JSON.stringify(filterFile, null, '\t'));
  console.log(
    `Successfully filtered all messenger archive files into ${fileName}`
  );
}
