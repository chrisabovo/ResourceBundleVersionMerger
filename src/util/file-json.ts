import * as fs from 'fs';
import * as loadJsonFile from 'load-json-file';
import { IKeyValue } from '../model/ikey-value';
import { UtilJSON } from './util-json';
import { UtilObject } from './util-object';

export class FileJSON {
  public static changeJSONKeyValue(jsonFile: string, keyValue: IKeyValue, callback: (error: string | null, result: boolean | null) => void) {
    try {
      if (!fs.existsSync(jsonFile)) {
        callback('File not founded!', null);
        return;
      }

      // foi informado o caminho de um arquivo físico do JSON, carregar ele.
      const jsonObj: object = loadJsonFile.sync(jsonFile);

      // quebrar a chave em um array.
      const keys: string[] = keyValue.key;

      // atualiza o valor da chave.
      switch (keys.length) {
        case 1:
          jsonObj[keys[0]] = keyValue.value;
          break;
        case 2:
          jsonObj[keys[0]][keys[1]] = keyValue.value;
          break;
        case 3:
          jsonObj[keys[0]][keys[1]][keys[2]] = keyValue.value;
          break;
        case 4:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]] = keyValue.value;
          break;
        case 5:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] = keyValue.value;
          break;
        case 6:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]] = keyValue.value;
          break;
        case 7:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]] = keyValue.value;
          break;
        case 8:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]] = keyValue.value;
          break;
        case 9:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]][keys[8]] = keyValue.value;
          break;
        case 10:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]][keys[8]][keys[9]] = keyValue.value;
          break;
        case 11:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]][keys[8]][keys[9]][keys[10]] = keyValue.value;
          break;
        case 12:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]][keys[8]][keys[9]][keys[10]][keys[11]] = keyValue.value;
          break;
        case 13:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]][keys[8]][keys[9]][keys[10]][keys[11]][keys[12]] = keyValue.value;
          break;
        case 14:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]][keys[8]][keys[9]][keys[10]][keys[11]][keys[12]][keys[13]] =
            keyValue.value;
          break;
        case 15:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]][keys[8]][keys[9]][keys[10]][keys[11]][keys[12]][keys[13]][keys[14]] =
            keyValue.value;
          break;

        default:
          callback('It´s not possible change the JSON File, they support only 15 levels.', null);
          return; // sai da função se cair no default.
      }

      // gravando o arquivo json depois de alterado.
      fs.writeFile(jsonFile, UtilJSON.stringify(jsonObj), err => {
        if (err) {
          callback(err.code + ' - ' + err.message, false);
        } else {
          callback(null, true);
        }
      });
    } catch (e) {
      callback(e, null);
    }
  }

  public static loadJSONKeyValue(json: object | string, callback: (error: string | null, result: IKeyValue[] | null) => void) {
    try {
      const ret: IKeyValue[] = new Array<IKeyValue>();
      let jsonObj: object;

      if (typeof json === 'object') {
        jsonObj = json;
      } else {
        if (!fs.existsSync(json)) {
          callback('File not founded!', null);
          return;
        }
        jsonObj = loadJsonFile.sync(json);
      }

      Object.keys(jsonObj).forEach(key => {
        if (typeof jsonObj[key] === 'object') {
          this.loadJSONKeyValueSon(jsonObj[key], [key], ret);
        } else {
          ret.push({
            key: [key],
            value: jsonObj[key],
          });
        }
      });

      callback(null, ret);
    } catch (e) {
      callback(e, null);
    }
  }

  private static loadJSONKeyValueSon(json: object, keyDad: string[], list: IKeyValue[]) {
    Object.keys(json).forEach(key => {
      const keySon: string[] = UtilObject.clone(keyDad);
      keySon.push(key);

      if (typeof json[key] === 'object') {
        this.loadJSONKeyValueSon(json[key], keySon, list);
      } else {
        list.push({
          key: keySon,
          value: json[key],
        });
      }
    });
  }
}
