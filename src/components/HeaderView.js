/**
 * Author: LinberDuan
 * Create Time: 2018-06-01 20:24
 * Description:
 */
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
} from 'react-native';
import { getStateBarHeight, getTittleBarHeight } from '../common/UIUtils';

const height = getTittleBarHeight();
const contentTop = getStateBarHeight();

export const headerViewHeight = height;

const HeaderView = ({...args}) =>{

    const { children, style, stateStyle, contentStyle, bgView,shadowStyle } = args;
    return (
        <View style={[styles.body, style,shadowStyle]}>
            <View style={styles.bgView}>
                {bgView}
            </View>
            <View style={[styles.headerStateView, stateStyle]}/>
            <View style={[styles.headerContent, contentStyle]}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body:{
        height:height,
        width:Dimensions.get('window').width,
        backgroundColor:'#377AE9',
    },
    headerStateView:{
        height:contentTop,
        zIndex:0,
    },
    headerContent:{
        flexDirection:'row',
        flex:1,
        alignItems:'center',
        zIndex:0,
    },
    bgView:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        // right:0,
        zIndex:0,
        flex:1,
        height:height,
        width:Dimensions.get('window').width,
    },
});

export default HeaderView;
