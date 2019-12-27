/**
 * Author: LinberDuan
 * Create Time: 2018-06-14 10:59
 * Description:
 */

import * as actionType from "../constants/actionType";

//设置APP状态（处于前台还是后台）
export function setAppStatus(status) {
    return { type: actionType.SET_APPSTATUS, status};
}
