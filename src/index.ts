#!/usr/bin/env node

import commander from 'commander';
import { RBVM } from './rbvm';

const helpMessage = () => {
  console.log('');
  console.log('Example:');
  console.log('  $ rbvm language.pt-BR.v1.js language.pt-BR.v2.js language.pt-BR.v3.js');
};

const myArgs = process.argv.slice(2);
if (myArgs.length === 0) {
  helpMessage();
} else {
  // check app version
  let packageJson;
  try {
    // tslint:disable-next-line:no-var-requires
    packageJson = require('./package.json');
  } catch {
    // tslint:disable-next-line:no-var-requires
    packageJson = require('../package.json');
  }

  commander.name('rbvm');
  commander.usage('[options] <oldFile> <newFile> <outputMergedFile>');
  commander.version(packageJson.version, '-v, --version', 'output the current version');
  commander.arguments('rbvm <oldFile> <newFile> <outputMergedFile>');
  commander.action((oldFile: any, newFile: any, outputMergedFile: any) => {
    // console.log('rbvm oldFile: %s newFile: %s outputMergedFile: %s', oldFile, newFile, outputMergedFile);

    RBVM.merge(oldFile, newFile, outputMergedFile, (error, result) => {
      if (error) {
        console.error('Merged Error ->', error);
      } else {
        console.info('Merged Completed!');
      }
    });
  });

  commander.on('--help', () => {
    helpMessage();
  });

  commander.parse(process.argv);
}
