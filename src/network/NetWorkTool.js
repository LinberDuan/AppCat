/**
 * Created by eleven on 16/6/3.
 */

import React,{
    NetInfo,
    Platform,
} from 'react-native';

let currentNetState = 'nuKonwn';

let connectInfo={};

/***
 * 检查网络链接状态
 * @param callback
 */
const checkNetworkState = (callback) =>{
//    NetInfo.fetch().done(x
//        (net_sate) => {
//
//            currentNetState = netType(net_sate);
//            console.log('net_type:'+currentNetState);
//            callback && callback(currentNetState);
//        }
//    );
};

const netType = (net_sate) => {

    connectInfo = net_sate;
    let net_type = 'UNKNOWN';
    let ns = net_sate.toUpperCase();
    if (Platform.OS === 'android'){
        if (ns === 'UNKNOWN'){
            net_type  = 'UNKNOWN';
        }else if (ns === 'WIFI'){
            net_type  = 'WIFI';
        }else if (ns === 'NONE'){
            net_type  = 'NONE';
        }else {
            net_type  = '3G/4G';
        }
    }else {
        if (ns === 'unknown'){
            net_type  = 'UNKNOWN';
        }else if (ns === 'wifi'){
            net_type  = 'WIFI';
        }else if (ns === 'none'){
            net_type  = 'NONE';
        }else {
            net_type  = '3G/4G';
        }
    }

    return net_type;
};

/***
 * 移除网络状态变化监听
 * @param tag
 * @param handler
 */
const net_removeEventListener = () => {

    NetInfo.removeEventListener("CHANGE_NET", ()=>{});
};

/***
 * 添加网络状态变化监听
 * @param tag
 * @param handler
 */
const net_addEventListener = ()=>{

    NetInfo.addEventListener("CHANGE_NET", (net_sate)=> {
        currentNetState = netType(net_sate);
    });
};


export {net_removeEventListener,net_addEventListener,checkNetworkState,currentNetState} ;
