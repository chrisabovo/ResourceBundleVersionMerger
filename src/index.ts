import * as commander from 'commander';
import * as fs from 'fs';

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
  .arguments('rbvm <newFile> <oldFile> <outputMergedFile>')
  // .option('-u, --username <username>', 'The user to authenticate as')
  // .option('-p, --password <password>', "The user's password")
  .action((newFile, oldFile, outputMergedFile) => {
    console.log('rbvm newFile: %s oldFile: %s outputMergedFile: %s', newFile, oldFile, outputMergedFile);
  });

commander.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('  $ rbvm --help');
  console.log('  $ rbvm -h');
});

commander.parse(process.argv);
