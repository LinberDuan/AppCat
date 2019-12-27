/**
 * Author: LinberDuan
 * Create Time: 2018-06-14 10:54
 * Description:
 */
import * as actionType from '../constants/actionType';

export const AppStatus = {
    Foreground:1,//应用处于前台
    Background:0,//应用处于后台
};

export function appStatus(state = AppStatus.Foreground, action) {
    switch (action.type) {
        case actionType.SET_APPSTATUS: {
            return action.status;
        }
        default:
            return state;
    }
}
