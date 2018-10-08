export class UtilText {
  public static replaceAll(value: string, searchValue: string, replaceValue: string): string {
    let ret = value;
    if (ret) {
      ret = value.split(searchValue).join(replaceValue);
    }
    return ret;
  }

  public static stringToBoolean(value: string): boolean {
    if (value) {
      switch (value.toLowerCase().trim()) {
        case 'true':
        case 'yes':
        case '1':
        case 't':
          return true;
        case 'false':
        case 'no':
        case '0':
        case 'f':
        case null:
          return false;
        default:
          return Boolean(value);
      }
    } else {
      return false;
    }
  }
}

Object.seal(UtilText);
