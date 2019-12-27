/**
 * Author: LinberDuan
 * Create Time: 2018-03-20 10:44
 * Description:
 */
import {
    Dimensions, NativeModules,
    Platform
} from 'react-native';

let UIInterface = NativeModules.UIInterface;

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

const XR_HEIGHT = 821;
const XMax_HEIGHT = 896;

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export const isIphoneX = ()=> {
    return (
        Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT)||
            (screenH === XR_HEIGHT || screenH === XMax_HEIGHT))

    )
};

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
 export const ifIphoneX = (iphoneXStyle, iosStyle, androidStyle) => {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else if (Platform.OS === 'ios') {
        return iosStyle
    } else {
        if (androidStyle) return androidStyle;
        return iosStyle
    }
};

global.android_statebar_height = 20;

/**
 * 取得android状态栏的高度（刘海的问题）
 */
export const getNativeAndroidStateBarHeight = ()=> {

    UIInterface.getAndroidStateBarHeight((stateBarHeight)=>{
        android_statebar_height = stateBarHeight;

        // console.warn(android_statebar_height)
    });
}

/**
 * 获取状态栏高度
 * @returns {number}
 */
export const getStateBarHeight = ()=> {
    let ipx = isIphoneX();
    // TODO getAndroidStateBarHeight 异步回调
    // let height = !ipx ? Platform.OS === 'android' ? android_statebar_height:20 : 30;
    let height = !ipx ? Platform.OS === 'android' ? 25:20 : 30;

    return height;
}

/**
 * 获取标题栏高度
 * @returns {number}
 */
export const getTittleBarHeight = ()=> {
    let ipx = isIphoneX();

    let height = !ipx ? ( Platform.OS === 'android' ? 64:64) : 74;
    return height;
};

/**
* 标题+状态栏
*/
export const getNavBarHeight = () => {
    return getStateBarHeight()+getTittleBarHeight();
};
