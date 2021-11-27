#!/usr/bin/env node

//CLI tool help
import program from 'commander';
import {collate} from './commands/collate.js';
import {fixEncoding} from './commands/fixEncoding.js'
import chalk from 'chalk';


program
    .command('collate')
    .description('Collate all message files into a single json.')
    .option('-o, --output <file>', 'Name of file to be outputed. If not specified, will default to \'collate.json\'')
    .action(collate);

program
    .command('fix-encoding')
    .description(`Fixes Mojibake issue of messenger archive files. ${chalk.red('ONLY RUN ONCE.')} By default will go through every valid file.`)
    .action(fixEncoding);

// program
//   .command('list')
//   .description('List all the TODO tasks')
//   .action(list);

// program
//   .command('add <task>')
//   .description('Add a new TODO task')
//   .action(add);

// program
//   .command('mark-done')
//   .description('Mark commands done')
//   .option('-t, --tasks <tasks...>', 'The tasks to mark done. If not specified, all tasks will be marked done.')
//   .action(markDone);

program.parse();
