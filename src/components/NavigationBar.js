/**
 * Author: LinberDuan
 * Create Time: 2018-06-12 11:02
 * Description:
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import HeaderView from "./HeaderView";

const NavigationBar = ({...args}) => {


    const { style, contentStyle } = args;
    let { shadowStyle, showShadow } = args;

    const { hideLeftIcon, leftTitleIcon, leftTitle, leftTitleStyle, leftOnPress, leftView } = args;
    const { title, titleStyle, titleView } = args;
    const { rightIcon, rightTitle, rightTitleStyle, rightOnPress, rightView} = args;
    const { bgView } = args;

    const leftIcon = hideLeftIcon?null:leftTitleIcon;

    return (
        <HeaderView contentStyle={[styles.header, contentStyle]}
                    style={style}
                    shadowStyle={shadowStyle}
                    bgView={bgView}>

            <View style={styles.left}>
                {leftView}

                {
                    (leftIcon||leftTitle)?
                        <TouchableOpacity style={styles.leftBtnV} onPress={leftOnPress}>
                            {leftIcon?<Image style={styles.leftIconStyle} source={leftIcon}/>:null}
                            {leftTitle?<Text style={[styles.leftTitleStyle, leftTitleStyle]}>{leftTitle}</Text>:null}
                        </TouchableOpacity>
                        :null
                }
            </View>


            <View style={styles.titleBg}>
                <Text numberOfLines={1} style={[styles.title, titleStyle]}>{title}</Text>
                {titleView}
            </View>


            <View style={styles.right}>
                {rightView}

                {
                    (rightIcon||rightTitle)?
                        <TouchableOpacity style={styles.rightBtnV} onPress={rightOnPress}>
                            {rightIcon?<Image style={styles.rightIconStyle} source={rightIcon}/>:null}
                            {rightTitle?<Text style={[styles.rightTitleStyle, rightTitleStyle]}>{rightTitle}</Text>:null}
                        </TouchableOpacity>
                        :null
                }
            </View>


        </HeaderView>
    );
};

const styles = StyleSheet.create({

    header:{
        alignItems:'center',
    },
    left:{
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection:'row',
        top:0,
        bottom:0,
    },
    leftBtnV:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height:35,
    },
    leftIconStyle:{
        marginLeft:20,
    },
    leftTitleStyle:{
        marginLeft:10,
    },

    titleBg:{
        flex:2,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
    },

    title:{
        flex:1,
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
        color: '#FFFFFF'
    },
    right: {
        flex:1,
        marginRight:10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection:'row',
    },
    rightBtnV:{
        flex:1,
        justifyContent: 'flex-end',
        flexDirection:'row',
        alignItems: 'center',
        height:35,
    },
    rightIconStyle:{
        marginRight:10,
    },
    rightTitleStyle:{
        marginRight:10,
    },
    shadowStyle: {
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 1,
    },
});

export default NavigationBar;
