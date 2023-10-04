/* eslint-disable no-useless-escape */
/* eslint-disable no-bitwise */
import * as _ from "lodash-es";

const Util = {
  numberFormat: (number) => {
    let param = number;
    if (number === "") {
      return 0;
    }

    if (typeof number !== "number") {
      if (isNaN(parseInt(number))) {
        return 0;
      }
      param = parseInt(number);
    }
    return new Intl.NumberFormat("currency").format(param);
  },
  isEmpty: (value) => {
    if (value === null) return "";
    if (value === undefined) return "";
    return value;
  },
  stringToBoolean: (value) => {
    if (value === "Y") return true;
    if (value === "N") return false;
    return value;
  },
  arrDel: (data, nameArr) => {
    const nData = _.cloneDeep(data);
    for (let i = 0; i < nameArr.length; i++) {
      nData.forEach((o) => {
        delete o[nameArr[i]];
      });
    }
    return nData;
  },
  /**
   * @param {Array} [{},{}]
   * @param {String} keyname -- data에서 추출하려는 키값
   * @returns {Array}
   */
  arrPush: (data, name) => {
    const arr = [];
    data.forEach((o) => {
      arr.push(o[name]);
    });

    return arr;
  },
  /**
   * DataGrid에서 columnVisibilityModel 설정
   * @param {Array} data
   * @param {String} keyname -- data에서 출력하고싶은 키값
   * @param {String} value -- data에서 boolean으로 담을 value값
   * @returns {object}
   */
  ejectBoolValue: (data, keyname, value) => {
    const obj = {};
    data.forEach((o) => {
      obj[o[keyname]] = !o[value];
    });
    return obj;
  },
  /**
   * (Select) 다중객체에서 원하는 값 찾기
   * @param {Array} listData
   * @param {String} value -- 찾고자하는 값
   * @param {String} type -- typeof data
   * @returns {"" || object}
   */
  arrFindValue: (array, value, type) => {
    if (!value) return value;
    if (type === "number") return array.find((_) => Number(_.name) === Number(value)).value;
    return array.find((_) => _.name === value).value;
  },
  /**
   * (Select) 다중객체에서 원하는 값의 이름 찾기
   * @param {Array} listData
   * @param {String} value -- 찾고자하는 값
   * @param {String} type -- typeof data
   * @returns {"" || object}
   */
  arrFindName: (array, value, type) => {
    if (value === null || value === undefined) return "";
    if (type === "number") return array.find((_) => Number(_.value) === Number(value))?.name;
    let obj;
    if (typeof value === "number") obj = array.find((_) => Number(_.value) === value);
    else obj = array.find((_) => _.value === value);

    return obj ? obj.name : `${value}(불일치 코드)`;
  },
  /**
   * 배열에 공백한칸 추가
   * @param {Array} data
   * @param {String} type -- typeof data
   * @returns {object}
   */
  arrayNbsp: (array, type) => {
    let str = "";
    array.forEach((element, index) => {
      if (array.length - 1 === index) {
        str += `${type === "number" ? element.toLocaleString() : element}`;
        return;
      }
      str += `${type === "number" ? element.toLocaleString() : element} / `;
    });
    return str;
  },

  inputFormat: (str, type) => {
    str = String(str);
    switch (type) {
      // case "monthYear":
      //   return str.replace(/^(\d{1})/, `$1월 `);
      case "phone":
        str = str.replace(/^[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]|[-_]/gi, "");
        if (str.length === 11) {
          return str.replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`);
        }
        return str;
      case "price":
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/gi, "$1,");
      default:
        return str;
    }
  },
  /**
   * @param value {number | string} - 숫자값
   * @param digit {number} - 자릿수 default=2
   */
  leadZeros: (value, digit = 2) => {
    const zeros = "0".repeat(digit);
    return (zeros + value).slice(-digit);
  },
};

export default Util;
