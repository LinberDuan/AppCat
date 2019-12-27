/**
 * Author: LinberDuan
 * Create Time: 2018-12-05 12:59
 * Description:
 */
import * as actionType from '../constants/actionType';

export function appGroups(state = [], action) {
    switch (action.type) {
        case actionType.SET_APPGROUPS: {
            return action.appGroups;
        }
        case actionType.CLEAN_STATE_DATA: {
            return [];
        }
        default:
            return state;
    }
}

export function appList(state = [], action) {
    switch (action.type) {
        case actionType.SET_APPLIST: {
            return action.appList;
        }
        case actionType.CLEAN_STATE_DATA: {
            return [];
        }
        default:
            return state;
    }
}
