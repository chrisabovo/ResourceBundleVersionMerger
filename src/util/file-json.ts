import * as fs from 'fs';
import * as loadJsonFile from 'load-json-file';
import { IKeyValue } from '../model/ikey-value';
import { UtilJSON } from './util-json';
import { UtilObject } from './util-object';

export class FileJSON {
  public static updateJSONKeyValue(jsonFile: string, keyValue: IKeyValue, callback: (error: string, result: boolean) => void) {
    try {
      if (!fs.existsSync(jsonFile)) {
        callback('File not found: ' + jsonFile, false);
        return;
      }

      let jsonObj: object = loadJsonFile.sync(jsonFile);

      const keys: string[] = keyValue.key;

      jsonObj = this.updateKeyValue(jsonObj, keys, keyValue.value);
      if (jsonObj === null) {
        callback('Error on change JSON file. Support only 10 levels on JSON.', false);
        return;
      }

      // write sync.
      fs.writeFileSync(jsonFile, UtilJSON.stringify(jsonObj));
      callback('', true);
    } catch (e) {
      callback(e, false);
    }
  }

  public static loadJSONKeyValue(json: object | string, callback: (error: string | null, result: IKeyValue[] | null) => void) {
    try {
      const ret: IKeyValue[] = new Array<IKeyValue>();
      let jsonObj: any;

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

  private static loadJSONKeyValueSon(json: any, keyDad: string[], list: IKeyValue[]) {
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

  private static updateKeyValue(jsonObj: any, keys: string[], value: string): any {
    try {
      switch (keys.length) {
        case 1:
          jsonObj[keys[0]] = value;
          break;
        case 2:
          jsonObj[keys[0]][keys[1]] = value;
          break;
        case 3:
          jsonObj[keys[0]][keys[1]][keys[2]] = value;
          break;
        case 4:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]] = value;
          break;
        case 5:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] = value;
          break;
        case 6:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]] = value;
          break;
        case 7:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]] = value;
          break;
        case 8:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]] = value;
          break;
        case 9:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]][keys[8]] = value;
          break;
        case 10:
          jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]][keys[8]][keys[9]] = value;
          break;

        default:
          return null;
      }

      return jsonObj;
    } catch {
      // if not is an update, create key before update.
      jsonObj = this.createKeys(jsonObj, keys);
      return this.updateKeyValue(jsonObj, keys, value);
    }
  }

  private static createKeys(jsonObj: any, keys: string[]): object {
    if (keys.length >= 1 && jsonObj[keys[0]] === undefined) {
      jsonObj[keys[0]] = {};
    }
    if (keys.length >= 2 && jsonObj[keys[0]][keys[1]] === undefined) {
      jsonObj[keys[0]][keys[1]] = {};
    }
    if (keys.length >= 3 && jsonObj[keys[0]][keys[1]][keys[2]] === undefined) {
      jsonObj[keys[0]][keys[1]][keys[2]] = {};
    }
    if (keys.length >= 4 && jsonObj[keys[0]][keys[1]][keys[2]][keys[3]] === undefined) {
      jsonObj[keys[0]][keys[1]][keys[2]][keys[3]] = {};
    }
    if (keys.length >= 5 && jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] === undefined) {
      jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] = {};
    }
    if (keys.length >= 6 && jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]] === undefined) {
      jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]] = {};
    }
    if (keys.length >= 7 && jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]] === undefined) {
      jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]] = {};
    }
    if (keys.length >= 8 && jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]] === undefined) {
      jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]] = {};
    }
    if (keys.length >= 9 && jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]][keys[8]] === undefined) {
      jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]][keys[8]] = {};
    }
    if (keys.length >= 10 && jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]][keys[8]][keys[9]] === undefined) {
      jsonObj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]][keys[5]][keys[6]][keys[7]][keys[8]][keys[9]] = {};
    }

    return jsonObj;
  }
}
