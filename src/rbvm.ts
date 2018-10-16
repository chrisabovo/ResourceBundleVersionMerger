import fs from 'fs';
import * as loadJsonFile from 'load-json-file';
import { IKeyValue } from './model/ikey-value';
import { FileJSON } from './util/file-json';

export class RBVM {
  public static merge(oldFile: any, newFile: any, outputMergedFile: any, callback: (error: string | null, result: boolean | null) => void) {
    // loading oldFile.
    FileJSON.loadJSONKeyValue(oldFile, (errorOld, resultOld) => {
      if (errorOld) {
        callback(errorOld, null);
      } else if (resultOld === null) {
        callback('Error: oldFile is invalid file!', null);
      } else {
        // console.log('resultOld =>', resultOld);

        // loading newFile.
        FileJSON.loadJSONKeyValue(newFile, (errorNew, resultNew) => {
          if (errorNew) {
            callback(errorNew, null);
          } else if (resultNew === null) {
            callback('Error: newFile is invalid file!', null);
          } else {
            // console.log('resultNew =>', resultNew);

            // if exist delete outputMergedFile.
            if (fs.existsSync(outputMergedFile)) {
              fs.unlinkSync(outputMergedFile);
            }

            // create empty JSON outputMergedFile.
            fs.writeFileSync(outputMergedFile, '{}');

            // merge and sort.
            this.mergeAndSort(resultOld, resultNew, 0, [], (errorMerge: any, resultMerge: any) => {
              if (errorMerge) {
                callback(errorMerge, null);
              } else {
                // write sorted file.
                this.writeMerged(outputMergedFile, resultMerge, 0, (errorWrite: any, resultWrite: any) => {
                  if (errorWrite) {
                    callback(errorWrite, null);
                  } else {
                    // format file.
                    const jsonObj = loadJsonFile.sync(outputMergedFile);
                    fs.writeFileSync(outputMergedFile, JSON.stringify(jsonObj, null, 2));

                    // return.
                    callback(errorWrite, resultWrite);
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  private static mergeAndSort(
    resultOld: IKeyValue[],
    resultNew: IKeyValue[],
    newIndex: number,
    resultMerged: IKeyValue[],
    callback: (error: string | null, result: IKeyValue[]) => void,
  ) {
    if (newIndex < resultNew.length) {
      const newKeys = resultNew[newIndex].key.join('.');

      const oldArr = resultOld.filter(x => x.key.join('.') === newKeys);

      if (oldArr.length > 0) {
        resultNew[newIndex].value = oldArr[0].value;
      }

      resultMerged.push(resultNew[newIndex]);

      this.mergeAndSort(resultOld, resultNew, newIndex + 1, resultMerged, callback);
    } else {
      // sort.
      resultMerged = resultMerged.sort((a: IKeyValue, b: IKeyValue) => {
        const keyA = a.key.join('.').toLowerCase();
        const keyB = b.key.join('.').toLowerCase();
        if (keyA < keyB) {
          return -1;
        }
        if (keyA > keyB) {
          return 1;
        }
        return 0;
      });

      // return merged and sorted.
      callback(null, resultMerged);
    }
  }

  private static writeMerged(
    outputMergedFile: any,
    resultMerged: IKeyValue[],
    mergedIndex: number,
    callback: (error: string | null, result: boolean | null) => void,
  ) {
    if (mergedIndex < resultMerged.length) {
      FileJSON.updateJSONKeyValue(outputMergedFile, resultMerged[mergedIndex], (errorMerge, resultMerge) => {
        if (errorMerge) {
          callback(errorMerge, null);
        } else {
          this.writeMerged(outputMergedFile, resultMerged, mergedIndex + 1, callback);
        }
      });
    } else {
      callback(null, true);
    }
  }

  private static mergeOldNew(
    resultOld: IKeyValue[],
    resultNew: IKeyValue[],
    outputMergedFile: any,
    newIndex: number,
    callback: (error: string | null, result: boolean | null) => void,
  ) {
    if (newIndex < resultNew.length) {
      const newKeys = resultNew[newIndex].key.join('.');

      const oldArr = resultOld.filter(x => x.key.join('.') === newKeys);

      if (oldArr.length > 0) {
        resultNew[newIndex].value = oldArr[0].value;
      }

      FileJSON.updateJSONKeyValue(outputMergedFile, resultNew[newIndex], (errorMerge, resultMerge) => {
        if (errorMerge) {
          callback(errorMerge, null);
        } else {
          this.mergeOldNew(resultOld, resultNew, outputMergedFile, newIndex + 1, callback);
        }
      });
    } else {
      // TODO:
      callback(null, true);
    }
  }
}

Object.seal(RBVM);
