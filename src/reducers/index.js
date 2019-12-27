/**
 * Author: LinberDuan
 * Create Time: 2018-05-29 20:12
 * Description:
 */

import {combineReducers} from 'redux';

import {loading} from './loading';
import {appStatus} from "./appStatus";
import {appGroups, appList} from "./appReducers"

const reducer = combineReducers({

    loading,
    appStatus,
    appGroups,
    appList,
});

export default reducer;
