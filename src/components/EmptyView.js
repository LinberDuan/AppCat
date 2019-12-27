/**
 * desc：
 * author：xbc
 * date： $
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

export const EmptyModel = {

    /*初始状态*/
    none: 'none',
    /*无数据状态*/
    empty:'empty',
    /*加载中状态*/
    loding: 'loading',
    /*失败状态*/
    loadFiald:'fiald',
    /*自定义页面*/
    customize:'customize',
};

export default EmptyView = ({...args}) => {

    const { emptyModel = EmptyModel.empty,customizeBox } = args;

    switch (emptyModel) {

        case EmptyModel.none: {

            return <View/>
        }
        case EmptyModel.empty: {

            return <EmptyBox {...args}/>
        }
        case EmptyModel.loadFiald: {

            return <FialdBox {...args}/>
        }

        case EmptyModel.loding: {

            return <LoadingView {...args}/>
        }

        case EmptyModel.customize: {

            return customizeBox;
        }

        default: return null;
    }
};

/*加载页面*/
LoadingView = ({...args}) => {
    const { top } = args;
    return (<ActivityIndicator style={[styles.content,top && {marginTop:top}]}
                               animating={true}
                               size={'large'}/>);
};

/*无数据页面*/
EmptyBox = ({...args}) => {

    const { top,emptyTitle } = args;

    let title = emptyTitle ? emptyTitle : "暂无数据";

    return (

            <View style={[styles.content,top && {marginTop:top}]}>
                <Image source={require("../resources/img/network_noData.png")}/>
                <Text style={[styles.title,{color: "#333333",}]}>{title}</Text>
            </View>
    );
};

/*加载失败页面*/
FialdBox = ({...args}) => {

    const { onPress,top } = args;
    return (

        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.content, top && {marginTop:top}]}>
                <Image source={require("../resources/img/network_err.png")}/>
                <Text style={[styles.title,{color: "#333333",}]}>{"加载失败"}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    content:{

        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginTop:170,

    },
    title:{
        marginTop:5,
        fontFamily: 'PingFangSC-Regular',
        fontSize: 16,
        letterSpacing: 0,
        textAlign:'center',
        width:200,
    },
});
