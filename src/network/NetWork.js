/**
 * Author: LinberDuan
 * Create Time: 2018-06-02 12:34
 * Description:
 */
import {
    NativeModules,
    Platform,
    DeviceEventEmitter,
} from 'react-native';

// var httpNetwork = NativeModules.HttpNetworkInterface;

export const host = "http://10.200.5.64/api/";

export class NetWork{

    static post(url, paramet, cancleLoginOut) {

        return new Promise((resolve, reject) => {

            // const body = {idenkey:'31884eddf8014188addc0a0c37d29274', ...paramet, };


            fetch(host + url, {
                method:'POST',
                body:paramet,
                headers:{
                    "Accept": "application/json",
                    "Connection": "close",
                    'x-app-platform':Platform.OS,
                    'content-type':'application/json'
                }
            }).then((response)=>
                response.json()).then((response) => {//1

                if(response.error === 1) {
                    reject(response.errorMsg);
                }
                else {
                    resolve(response);
                }
            }).catch((error) => {//2
                console.warn("NetWork-post Error:" + error);
                // alert("NetWork-post Error:" + error);
                reject({error, msg:'网络异常'});
            });
        });
    }

    static get(url, paramet, cancleLoginOut) {

        return new Promise((resolve, reject) => {
        //     httpNetwork.get(host + url, {...paramet, defaultBuildConfig}, (error, resp) => {
        //
        //         let tag = false;//登录失效时取消退出登录
        //         if(!Utils.nullCheck(cancleLoginOut) && cancleLoginOut) {
        //             tag = cancleLoginOut;
        //         }
        //
        //         const { respErr, respObj } = responseParse(error, resp);
        //
        //         if(!tag && respErr && 'abm_api_access_without_auth' == respErr.errCode) {
        //             //可能是被鉴权服务拦截，在这个场景下通常是由于错误的client_id导致
        //             console.log('登录失效，需重新登录');
        //             DeviceEventEmitter.emit('USERINVALID');
        //         }
        //
        //         console.log('respErr:' + respErr);
        //         console.log('respErrJson:' + JSON.stringify(respErr));
        //
        //         if(respErr) reject(respErr);
        //         else resolve(respObj);
        //
        //     });
        });

    }

}


const responseParse = (error, resp) => {

    var respObj = null;
    var respErr = null;

    try {
        if(error) { //非业务错误
            respErr = {
                ...error,
                msg:t(error.errCode),
            };
        }
        else {

            if(resp)  {

                var respT= resp;
                if(Platform.OS == 'android') {
                    respT = {body:JSON.parse(resp.body),headers:resp.headers};
                }

                if(respT.body.resp) {

                    respObj = respT;
                }
                else { // 业务错误
                    respErr = {
                        ...respT,
                        msg:respT.body.infoMsg
                    };
                }
            }
            else {
                respErr = {msg:t('abm_api_data_error')};
            }
        }
    }
    catch(e) {

        respErr = {
            error:e,
            msg:t('abm_api_data_error'),
        };
    }

    return {respErr, respObj};
};
