/**
 * Author: LinberDuan
 * Create Time: 2018-12-04 17:38
 * Description:
 */

import Toast from "react-native-root-toast";

let toast = null;

export const ShowMsg = (msg, onHidden = () => {}) => {

    if(!msg || !msg.length) return;

    if(toast) Toast.hide(toast);

    const options = {
        position: Toast.positions.CENTER,
        duration: 1000,
        textStyle:{lineHeight:25},
        onShow: () => {},
        onShown: () => {},
        onHidden: onHidden,
        onHide: () => {},
    };

    toast = Toast.show(msg,options);
    // Toast.showShortCenter(msg);
};

export const ShowMsgF = (msg, onHidden) => {

    return (
    (resp)=>{
         console.log('ShowMsgF:'+resp);
        ShowMsgErrObj(msg||resp, onHidden);
    });
};

export const ShowMsgErrObj = (msgObj, onHidden) => {
    const showMsg = (msgObj.msg || msgObj.errMsg || msgObj.infoMsg || msgObj || '').toString();

    if(showMsg && showMsg.length>0) ShowMsg(showMsg, onHidden);
};

export const ShowMsgErr = ShowMsg;

export const ShowMsgFErr = ShowMsgF;

export const ShowMsgSuccess = ShowMsg;

export const ShowMsgFSuccess = ShowMsg;
