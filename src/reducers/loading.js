/**
 * Author: LinberDuan
 * Create Time: 2018-06-02 14:14
 * Description:
 */
import * as type from '../constants/actionType';


export function loading(state = false, action) {
    switch (action.type) {
        case type.DISPLAY_LOADINGVIEW: {
            return true;
        }
        case type.HIDE_LOADINGVIEW: {

            return false;
        }
        default:
            return state;
    }
}

