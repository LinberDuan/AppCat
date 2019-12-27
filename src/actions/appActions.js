/**
 * Author: LinberDuan
 * Create Time: 2018-12-04 20:41
 * Description:
 */

import * as actionType from "../constants/actionType";
import { Dispatch } from 'redux';
import {NetWork, host} from '../network';

import {
    Platform,
} from 'react-native';

export function setAppGroups(appGroups) {
    return { type: actionType.SET_APPGROUPS, appGroups};
}

export function setAppList(appList) {
    return { type: actionType.SET_APPLIST, appList};
}

export function getAppGroups({...args}) {

    return function (dispatch) {

        return new Promise((resolve, reject) => {

          // if(!hideLoading) dispatch(displayLoadingView());

          NetWork.post('getAppGroup',"channel=" + Platform.OS).then(resp => {
              const { result = false, data = [], message = ""} = resp

              console.log('resp' + resp);
              if(result) {
                dispatch(setAppGroups(data))
                resolve(data)
              }
              else {
                reject(message)
              }
          }, error => {
              console.log('error' + error);
              // dispatch({type:actionType.NETWORT_REQUEST_FAILD, error});
              reject(error)
          }).finally(()=>{
              // if(!hideLoading) dispatch(hideLoadingView());
          });

        })

    };
}

export function getAppList({...args}) {

    return function (dispatch) {

        return new Promise((resolve, reject) => {

          // if(!hideLoading) dispatch(displayLoadingView());
          const { bundleId = "" } = args


          NetWork.post('getAppList',"channel=" + Platform.OS + "&bundleId="+bundleId).then(resp => {
              const { result = false, data = [], message = ""} = resp

              console.log('resp' + JSON.stringify(resp));
              if(result) {
                dispatch(setAppList(data))
                resolve(data)
              }
              else {
                reject(message)
              }
          }, error => {
              console.log('error' + error);
              // dispatch({type:actionType.NETWORT_REQUEST_FAILD, error});
              reject(error)
          }).finally(()=>{
              // if(!hideLoading) dispatch(hideLoadingView());
          });

        })

    };
}


export function pushToken({...args}) {

    return function (dispatch) {

        return new Promise((resolve, reject) => {

          // if(!hideLoading) dispatch(displayLoadingView());
          const { deviceToken = "" } = args


          NetWork.post('pushToken',"channel=" + Platform.OS + "&token="+deviceToken).then(resp => {
              const { result = false, data = [], message = ""} = resp

              console.log('pushToken-Resp:' + JSON.stringify(resp));
              if(result) {
                resolve(data)
              }
              else {
                reject(message)
              }
          }, error => {
              console.log('error' + error);
              // dispatch({type:actionType.NETWORT_REQUEST_FAILD, error});
              reject(error)
          }).finally(()=>{
              // if(!hideLoading) dispatch(hideLoadingView());
          });

        })

    };
}
