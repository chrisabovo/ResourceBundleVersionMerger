# ResourceBundleVersionMerger

A Resource Bundle Version Merger

What's rbvm ?

- Merge two versions os a resorce bundle in a new merged file.

- It will copy all entries of `<newFile>` to `<mergedFile>`, and update value of `<oldFile>` into key of `<mergedFile>`.

- The purpose is to merge bundle files where the customer can customize their messages, so when you install a new version of the application you will make available all text keys of your new version with the texts that the customer has customized to he.

How to install

- `npm install resource-bundle-version-merger -g`

Examples of usage:

- `rbvm -h`

- `rbvm -v`

- `rbvm <oldFile> <newFile> <mergedFile>`

- `rbvm language.pt-BR.v1.js language.pt-BR.v2.js language.pt-BR.v2.1.js`
