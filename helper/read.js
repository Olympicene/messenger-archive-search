import * as fs from 'fs';
import { orderBy } from 'natural-orderby';
import * as path from 'path';
import * as utf8 from 'utf8';

//read from file
export class Reader {
    constructor(fileName)
    {
        this.fileName = fileName;
    }

    getParticipants()
    {
        let file = JSON.parse(fs.readFileSync(this.fileName));
        return file.participants;
    }

    getMessages()
    {
        let file = JSON.parse(fs.readFileSync(this.fileName));
        return file.messages;
    }
}

//get list of files
export function listOfFiles() {
    let fileList = [];
  
    fs.readdirSync('./').forEach(file => {
      if(file.substr(0,8) == 'message_') {
        fileList.push(file);
      }
    }); 

    return orderBy(fileList);
}