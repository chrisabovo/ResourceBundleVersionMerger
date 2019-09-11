# ResourceBundleVersionMerger - Dev Doc

How build:
- npm run build

How run in debug mode:

- In VSCODE just press F5 or in command line

- node ./lib/index.js .\samples\test_1_json\language.pt-BR.v1.json .\samples\test_1_json\language.pt-BR.v2.json .\samples\test_1_json\language.pt-BR.v3.json

Generate a new version:

- git add -A && git commit -m "Setup Package"

- git push

- npm version patch

- npm login

- npm publish

NPM Repository

- https://www.npmjs.com/package/resource-bundle-version-merger

Thanks a lot to Carl-Johan Kihl with this amazing tutorial.

https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c

https://github.com/caki0915/my-awesome-greeter

https://www.npmjs.com/package/my-awesome-greeter

https://github.com/richie5um/vscode-sort-json/blob/master/lib/lodash-sortkeys.js
