# ResourceBundleVersionMerger

A Resource Bundle Version Merger

What's rbvm ?

- Merge two versions os a resorce bundle in a new merged file.

- It will copy all entries of <newFile> to <mergedFile>, and update value of <oldFile> into key of <mergedFile>.

How to install

- npm install resource-bundle-version-merger -g

Examples of usage:

- rbvm -h

- rbvm -v

- rbvm <oldFile> <newFile> <mergedFile>

- rbvm language.pt-BR.v1.js language.pt-BR.v2.js language.pt-BR.v2.1.js

- rbvm .\samples\test_1_json\language.pt-BR.v1.json .\samples\test_1_json\language.pt-BR.v2.json .\samples\test_1_json\language.pt-BR.v3.json

How run in debug mode:

- In VS CODE just press F5 or in command line

- node ./lib/index.js .\samples\test_1_json\language.pt-BR.v1.json .\samples\test_1_json\language.pt-BR.v2.json .\samples\test_1_json\language.pt-BR.v3.json

Generate a new version:

- git add -A && git commit -m "Setup Package"

- git push

- npm version patch

- npm publish

Thanks a lot to Carl-Johan Kihl with this amazing tutorial.

https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c

https://github.com/caki0915/my-awesome-greeter

https://www.npmjs.com/package/my-awesome-greeter

https://github.com/richie5um/vscode-sort-json/blob/master/lib/lodash-sortkeys.js
