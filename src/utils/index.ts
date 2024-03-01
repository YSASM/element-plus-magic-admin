export default {
  deepClone(obj: any) {
    if (obj === null) return null
    if (typeof obj !== 'object') return obj;
    if (obj.constructor === Date) return new Date(obj);
    if (obj.constructor === RegExp) return new RegExp(obj);
    if (typeof obj === "object") {
      const objClone: any = Array.isArray(obj) ? [] : {};
      for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
          //判断ojb子元素是否为对象，如果是，递归复制
          if (obj[key] && typeof obj[key] === "object") {
            objClone[key] = this.deepClone(obj[key]);
          } else {
            //如果不是，简单复制
            objClone[key] = obj[key];
          }
        }
      }
      return objClone;
    }
    return obj
  },
  strToArr(str: any) {
    if (typeof (str) != 'string') {
      return str
    }
    if (str === " " || str === "") {
      return []
    }
    else {
      return str.split(",")
    }
  },
  arrToStr(arr: any) {
    if (typeof (arr) != 'object') {
      return arr
    }
    if (arr.length > 0) {
      return arr.toLocaleString()
    } else {
      return ''
    }
  },
  yuanToFen(m: any) {
    return (m * 100).toString()
  },
  defaultDate() {
    const da: any = new Date()
    const date: any = [new Date(da.getFullYear(), da.getMonth(), da.getDate(), 0, 0, 0).getTime(), new Date(da.getFullYear(), da.getMonth(), da.getDate(), 23, 59, 59).getTime()]
    return date
  },
  generateUUID() {
    // eslint-disable-next-line no-var
    var d: any = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  },
  isNumber(value: any) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },
  inRange(start: any, end: any, value: any) {
    if (value >= start && value <= end) {
      return true
    }
    return false
  },
  parseJson(s: string) {
    const rev = (key: any, value: any) => {
      try {
        value = JSON.parse(value, rev)
      } catch (e) {
        // 
      }
      return value
    }
    const value = JSON.parse(s, rev)
    return value
  },
  getPathName(){
    return location.hash.replace(/#/g,"")
  },
  hmTsTos(ts:number){
    return (ts/1000).toFixed()
  },
}