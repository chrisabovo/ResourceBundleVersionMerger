import { Validator } from './validator';

export class UtilObject {
  public static transferValues<T>(obj1: T, obj2: T): T {
    const ret: T = obj1;

    const objectKeys = Object.keys(obj2) as Array<keyof T>;
    for (const key of objectKeys) {
      if (!Validator.isNullUndefinedEmpty(obj2[key])) {
        ret[key] = obj2[key];
      }
    }

    return ret;
  }

  public static clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  public static equals<T>(objA: T, objB: T): boolean {
    let ret: boolean = true;

    // compare objA => objB
    if (ret) {
      const objAKeys = Object.keys(objA) as Array<keyof T>;
      for (const key of objAKeys) {
        if (objA[key] !== objB[key]) {
          ret = false;
          break;
        }
      }
    }

    // compare objB => objA
    if (ret) {
      const objBKeys = Object.keys(objB) as Array<keyof T>;
      for (const key of objBKeys) {
        if (objB[key] !== objA[key]) {
          ret = false;
          break;
        }
      }
    }

    return ret;
  }
}

Object.seal(UtilObject);
