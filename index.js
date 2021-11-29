#!/usr/bin/env node

//CLI tool help
import program from 'commander';
import {collate} from './commands/collate.js';
import {fixEncoding} from './commands/fixEncoding.js'
import { filter } from './commands/filter.js';
import chalk from 'chalk';


program
    .command('fix-encoding')
    .description(`Fixes Mojibake issue of messenger archive files. ${chalk.red('ONLY RUN ONCE PER FILE.')}`)
    .option('-i, --input <file...>', 'Specify which files you want to fix. If not specified, will default to all files named message_{value}.json')
    .action(fixEncoding);

program
    .command('filter')
    .description(`Filter messages by a variety of properties and outputs to json. By default will go through every valid file.`)
    .option('-i, --input <file...>', 'Specify which files you want to filter. If not specified, will default to all files named message_{value}.json')
    .option('-o, --output <file>', 'Name of file to be outputed. If not specified, will default to \'filter.json\'', 'filter.json')
    .option('-s, --sender <name>', 'Filter messages by sender name.')
    .option('-r, --reacts <value>', 'Filter messages by the number of reactions message received.')
    .option('-iu, --is-unsent <bool>', 'Filter messages by if they were unsent.')
    .action(filter);

program
    .command('collate')
    .description('Collate certain or all message files into a single json.')
    .option('-i, --input <file...>', 'Specify which files you want to collate. If not specified, will default to all files named message_{value}.json')
    .option('-o, --output <file>', 'Name of file to be outputed. If not specified, will default to \'collate.json\'', 'collate.json')
    .action(collate);

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
