/**
 * Author: LinberDuan
 * Create Time: 2018-12-04 17:32
 * Description:
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native';

export default class Cell extends Component {


    render() {

        const { item, onPress } = this.props;
        const appGroup = item.item
        const { app = {} } = appGroup

        return (
            <View style={styles.body}>
              <TouchableOpacity style={styles.content} onPress={onPress.bind(this,appGroup)}>
                <Image source={{ uri: app.appIconUrl }} style={styles.icon} />
                <View style={styles.center}>
                  <Text style={styles.title}>{app.title}</Text>
                <Text style={styles.version}>
                    {"最新版: " + app.version + " (build: " + app.buildVersion+ ")" +
                      "  大小:" + Math.ceil(Number(app.fileSize)/(1024*1024)) + "M" +
                      "\n更新时间:" + app.editTime
                    }
                  </Text>
                  <Text style={styles.sutTitle}>{app.subTitle}</Text>
                </View>
                <Image style={styles.rightIcon} source={require('../../resources/img/rightArrow.png')}/>
              </TouchableOpacity>
            </View>
        );
    }



}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        height: 100,
    },
    content: {
        flex: 1,
        marginTop: 10,
        marginBottom: 0,
        height: 90,
        backgroundColor:'#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
      width: 60,
      height: 60,
      borderRadius:12,
      marginLeft: 10,
      borderWidth: 0.5,
      borderColor: '#DDDDDD',
    },
    center:{
      marginLeft: 10,
    },
    title:{
      color:'#333333',
      fontSize: 16,
      fontWeight: 'bold',
    },
    version:{
      color: '#666666',
      fontSize: 11,
      marginTop: 3,
      lineHeight: 15,
    },
    sutTitle:{
      color: '#999999',
      fontSize: 10,
      marginTop: 3,
      marginRight: 10,
    },
    rightIcon:{
      position: 'absolute',
      right: 15,
      opacity: 0.3,
    },
});
