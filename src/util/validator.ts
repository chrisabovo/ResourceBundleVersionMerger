export class Validator {
  public static isArray(value: any): boolean {
    if (value instanceof Array) {
      return true;
    } else {
      return false;
    }
  }

  public static isArrayWithItems(value: any): boolean {
    if (!this.isNullUndefined(value) && this.isArray(value)) {
      if (value.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public static isNumber(value: any) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  public static isNullUndefinedEmpty(value: any, trimText: boolean = false) {
    if (trimText && typeof value === 'string') {
      value = value.trim();
    }

    if (value === undefined || value === null || value === '') {
      return true;
    } else {
      return false;
    }
  }

  public static isNullUndefined(value: any) {
    if (value === undefined || value === null) {
      return true;
    } else {
      return false;
    }
  }

  public static isEqual(str1: string, str2: string, ignoreCase: boolean = false): boolean {
    let ret = false;
    if (ignoreCase) {
      ret =
        (str1 === undefined && str2 === undefined) ||
        (str1 === null && str2 === null) ||
        (str1 != null && str2 != null && typeof str1 === 'string' && typeof str2 === 'string' && str1.toUpperCase() === str2.toUpperCase());
    } else {
      ret =
        (str1 === undefined && str2 === undefined) ||
        (str1 === null && str2 === null) ||
        (str1 != null && str2 != null && typeof str1 === 'string' && typeof str2 === 'string' && str1 === str2);
    }
    return ret;
  }

  public static isEquals(value: string, ...equals: string[]): boolean {
    let ret = false;

    for (const eq of equals) {
      if (this.isEqual(value, eq, false)) {
        ret = true;
        break;
      }
    }

    return ret;
  }

  public static isEqualsIgnoreCase(value: string, ...equals: string[]): boolean {
    let ret = false;

    for (const eq of equals) {
      if (this.isEqual(value, eq, true)) {
        ret = true;
        break;
      }
    }

    return ret;
  }

  public static isEnumEqual(obj1: number | string, obj2: number | string): boolean {
    let ret = false;

    if (typeof obj1 === 'number') {
      ret = obj1.valueOf() === obj2.valueOf();
    } else {
      ret = obj1.toString() === obj2.toString();
    }

    return ret;
  }

  public static isEnumGreaterEqual(obj1: number, obj2: number): boolean {
    let ret = false;

    ret = obj1.valueOf() >= obj2.valueOf();

    return ret;
  }

  public static isRegExp(text: string, pattern: string): boolean {
    const regexp = new RegExp(pattern);
    return regexp.test(text);
  }

  /**
   * Validate if filename is valid in linux or windows.
   *
   * @static
   * @param {string} filename filename.
   * @returns {Boolean} is valid or not.
   * @memberof Validator
   */
  public static isFilename(filename: string): boolean {
    const f: RegExp = /[<>:"\/\\|?*\x00-\x1F]/g;
    const fWindows: RegExp = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i;

    if (!filename || filename.length > 255) {
      return false;
    }

    if (f.test(filename) || fWindows.test(filename)) {
      return false;
    }

    if (/^\.\.?$/.test(filename)) {
      return false;
    }

    return true;
  }
}

Object.seal(Validator);
