import fs from 'fs';
import { IKeyValue } from './model/ikey-value';
import { FileJSON } from './util/file-json';

export class RBVM {
  public static merge(oldFile: any, newFile: any, outputMergedFile: any, callback: (error: string | null, result: boolean | null) => void) {
    // carregando o oldFile.
    FileJSON.loadJSONKeyValue(oldFile, (errorOld, resultOld) => {
      if (errorOld) {
        callback(errorOld, null);
      } else if (resultOld === null) {
        callback('Error: oldFile is invalid file!', null);
      } else {
        console.log('resultOld =>', resultOld);

        // carregando o newFile.
        FileJSON.loadJSONKeyValue(newFile, (errorNew, resultNew) => {
          if (errorNew) {
            callback(errorNew, null);
          } else if (resultNew === null) {
            callback('Error: newFile is invalid file!', null);
          } else {
            console.log('resultNew =>', resultNew);

            // caso já exista exclui o arquivo outputMergedFile.
            if (fs.existsSync(outputMergedFile)) {
              fs.unlinkSync(outputMergedFile);
            }

            // criando o arquivo outputMergedFile vazio.
            fs.writeFileSync(outputMergedFile, '{}');

            // construindo o outputMergedFile.
            this.mergeOldNew(resultOld, resultNew, outputMergedFile, 0, (errorMerge: any, resultMerge: any) => {
              // callback(errorMerge, resultMerge);

              //
              FileJSON.loadJSONKeyValue(outputMergedFile, (errorTeste, resultTeste) => {
                if (errorTeste) {
                  callback(errorTeste, null);
                } else {
                  console.log('resultMerge =>', resultTeste);

                  callback(errorMerge, resultMerge);
                }
              });
              //
            });
          }
        });
      }
    });
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
