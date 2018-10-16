import commander from 'commander';
import fs from 'fs';
import { RBVM } from './rbvm';

let packageJson;
if (fs.existsSync('./package.json')) {
  // tslint:disable-next-line:no-var-requires
  packageJson = require('./package.json');
} else {
  // tslint:disable-next-line:no-var-requires
  packageJson = require('../package.json');
}

commander
  .version(packageJson.version, '-v, --version')
  .arguments('rbvm <oldFile> <newFile> <outputMergedFile>')
  .action((oldFile: any, newFile: any, outputMergedFile: any) => {
    console.log('!!!! rbvm oldFile: %s newFile: %s outputMergedFile: %s', oldFile, newFile, outputMergedFile);

    RBVM.merge(oldFile, newFile, outputMergedFile, (error, result) => {
      if (error) {
        console.error('Merged Error ->', error);
      } else {
        console.info('Merged Completed!');
      }
    });
  });

commander.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('  $ rbvm --help');
  console.log('  $ rbvm -h');
  console.log('  $ rbvm -v');
  console.log('  $ rbvm <oldFile> <newFile> <outputMergedFile>');
  console.log('  $ rbvm language.pt-BR.v1.js language.pt-BR.v2.js language.pt-BR.js');
});

commander.parse(process.argv);
