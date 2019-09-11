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
