export class UtilJSON {
  public static parse(value: string): any {
    return JSON.parse(value, (key: any, val: any) => {
      // console.log('JSON.parse =>', value);
      if (val !== undefined && typeof val === 'string' && val.search(new RegExp('u002f', 'i')) === 0) {
        let ret: string = val.toString();
        let flags: string;
        // remove a barra inicial.
        ret = ret.replace(new RegExp('u002f', 'i'), '');
        // troca todos os caracteres u005Cu002F <=> \/
        while (ret.search(new RegExp('u005cu002f', 'i')) >= 0) {
          ret = ret.replace(new RegExp('u005cu002f', 'i'), '/');
        }
        // separa o valor das flags
        if (ret.search(new RegExp('u002f', 'i')) >= 0) {
          const pos = ret.search(new RegExp('u002f', 'i'));
          flags = ret.substring(pos + 5, ret.length);
          ret = ret.substring(0, pos);
        }

        return new RegExp(ret, flags);
      } else {
        return val;
      }
    });
  }

  public static tryParseAny(value: any): any {
    try {
      if (value) {
        return UtilJSON.tryParse(value.toString());
      } else {
        return value;
      }
    } catch {
      return value;
    }
  }

  public static tryParse(value: string): any {
    if (value && value.indexOf('{') + value.indexOf('}') + value.indexOf(':') > 0) {
      return JSON.parse(value, (key: any, val: any) => {
        // console.log('JSON.parse =>', value);
        if (val !== undefined && typeof val === 'string' && val.search(new RegExp('u002f', 'i')) === 0) {
          let ret: string = val.toString();
          let flags: string;
          // remove a barra inicial.
          ret = ret.replace(new RegExp('u002f', 'i'), '');
          // troca todos os caracteres u005Cu002F <=> \/
          while (ret.search(new RegExp('u005cu002f', 'i')) >= 0) {
            ret = ret.replace(new RegExp('u005cu002f', 'i'), '/');
          }
          // separa o valor das flags
          if (ret.search(new RegExp('u002f', 'i')) >= 0) {
            const pos = ret.search(new RegExp('u002f', 'i'));
            flags = ret.substring(pos + 5, ret.length);
            ret = ret.substring(0, pos);
          }

          return new RegExp(ret, flags);
        } else {
          return val;
        }
      });
    } else {
      return value;
    }
  }

  public static stringify(value: any): string {
    return JSON.stringify(value, (key: string, val: any) => {
      if (val && val.constructor === RegExp) {
        let ret: string = val.toString();
        // change initial bar.
        ret = ret.replace('/', 'u002f');
        // change characteres /.
        while (ret.indexOf('\\/') >= 0) {
          ret = ret.replace('/', 'u005cu002f');
        }
        // change final bar, flags expression.
        while (ret.indexOf('/') >= 0) {
          ret = ret.replace('/', 'u002f');
        }

        return ret;
      } else {
        return val;
      }
    });
  }
}

Object.seal(UtilJSON);
