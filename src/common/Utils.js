/**
 * Author: LinberDuan
 * Create Time: 2018-03-20 10:44
 * Description:
 */
import forge from 'node-forge';

export default class Utils {
    /*手机号*/
    static isPhoneNumber(phone) {
        return /^[1][3,4,5,7,8][0-9]{9}$/.test(phone);
    }

    /*短信验证码*/
    static isMsgCode(msgCode) {
        return /[0-9]{6}/.test(msgCode);
    }
    /*图形验证码验证*/
    static isImgMsgCode(msgCode) {
        return /[0-9A-Za-z]{6}/.test(msgCode);
    }
    /*密码*/
    static isPwd(pwd) {

        return /[0-9A-Za-z]{8,20}/.test(pwd);
    }

    /*密码*/
    static isPwdNew(pwd) {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,20}$/.test(pwd);
    }

    static isMail(mail) {
        return /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/.test(mail);
    }

    /*地址*/
    static isAddress(address) {
        return /^[A-Za-z0-9]+$/.test(address);
    }

    static isHotWalletName(walletName) {

        // return /[a-zA-Z0-9\u4e00-\u9fa5]+/.test(walletName);
        return /^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(walletName);
    }

    /*空值验证*/
    static nullCheck(obj) {
        return (null == obj || undefined === obj || obj.length <= 0);
    }

    /*空值验证*/
    static isNotNullCheck(obj) {
        return !this.nullCheck(obj);
    }

    /*对象空验证*/
    static objNullCheck(obj) {
        return (null == obj || undefined === obj);
    }

    /*对象非空验证*/
    static isObjNotNullCheck(obj) {
        return !this.objNullCheck(obj);
    }

    /*去除空格*/
    static removeSpace (obj) {
        // return string = obj.replace(/\s/g,"");
        return string = obj.trim();
    }

    /*字符串md5*/
    static md5(str) {
        var md = forge.md.md5.create();
        md.update(str);
        return md.digest().toHex();
    }

    static formatDateTime(timeStamp) {
        var date = new Date();
        date.setTime(timeStamp);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    };
    /*地址省略处理*/
    static addressOmit(address) {

        if (this.nullCheck(address)) return address;
        if (address.length <= 6) return address;
        let result = address;
        result = result.substr(0, 6) + '...' + result.substr(result.length-6, 6);
        return result;
    }

    /*是否是邮箱*/
    static checkEmail(emil){
        let local = emil.lastIndexOf('@');
        return local > 0;
    }

    /* 邮箱转星 */
    static starEmil(emil) {

        if (this.nullCheck(emil)) return emil;
        var starEmil = emil;
        let local = starEmil.lastIndexOf('@');
        if (local === -1) return emil;
        if (local > 3){
            var satrIdx = '';
            for (let i = 0; i < local -3 ; i++) {
                satrIdx  = satrIdx+'*';
            }
           return  starEmil.replace(starEmil.substring(3,local),satrIdx);
        }

        return starEmil;
    };

    /*号码转*号*/
    static starMobile(mobile) {
        var starMb = mobile;
        if (mobile && mobile.length > 7) {
            var satrIdx = '';
            for (let i = 0; i < mobile.length -7 ; i++) {
                satrIdx  = satrIdx+'*';
            }
            starMb = mobile.substr(0, 3) + satrIdx + mobile.substr(7, 4);
        }
        return starMb;
    };
    /*toString*/
    static JSToString(str) {

        return str;
        if (Utils.nullCheck(str)) {
            return str;
        }
        let result = str.toString();
        /*总长10位实现*/
        if (result.length <= 10) {
            return str;
        }
        return result.slice(0, 10);
    }

    /*截取小数位*/
    static clipNumber(num,lenght) {

        if (!num) return num;

        let numStr = num.toString();
        let result = numStr.split('.');

        if (result.length > 1){
            let last = result[1];
            if (last.length > lenght) {
               return numStr.substr(0,numStr.indexOf('.')+lenght+1);
            }
        }

        return num;

    }


    static deepEquals(a, b) {
        return a === b || JSON.stringify(a) === JSON.stringify(b);
    };

    /*小数位截取*/
    static intercept(str ,num) {

            /*小树位后截取num位实现*/
            if (str) {
                let interStr='';
                let result = str.split('.');
                let str_0 = result[0]||'';
                let str_1 = result[1];
               if (result.length >1 ) {
                   if (str_1.length > num){
                       return true;
                       // interStr = str_1.substring(0,8);
                       // return  str_0 +'.'+ interStr;
                   }
               }
                return false;
            }
            return false;
        }
}

function txDataProcess_btc(tx) {
  let {
    utxos = [],
    outputs = [],
  } = tx;

  let utxos_new = [];

  utxos.map((utxo)=>{
    utxos_new.push({
      ...utxo,
      coinNum:utxo.coinNum+'',
    });
  });

  let outputs_new = [];

  outputs.map((output)=>{
    outputs_new.push({
      ...output,
      coinNum:output.coinNum+'',
    });
  });

  let tx_new = {
    ...tx,
    utxos:utxos_new,
    outputs:outputs_new,
  };

  return tx_new;
}

export function txDataProcess_eth(tx) {

  let {
    txnCoinNum = '',
  } = tx;

  let tx_new = {
    ...tx,
    txnCoinNum:tx.txnCoinNum+'',
    gasPrice:tx.gasPrice+'',
    gasLimit:tx.gasLimit+'',
  };

  return tx_new;

}

export function txDataProcess(tx) {
  let {
    coinType = '',
  } = tx;

  if('BTC' === coinType) {
    return txDataProcess_btc(tx);
  }
  else {
    return txDataProcess_eth(tx);
  }

}
