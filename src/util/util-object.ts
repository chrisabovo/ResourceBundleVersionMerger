export class UtilObject {
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
