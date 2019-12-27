/**
 * Author: LinberDuan
 * Create Time: 2018-06-04 18:39
 * Description:
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    ActivityIndicator,
} from 'react-native';

class LaunchScreen extends Component {

    render() {
        return (
            <View style={[styles.body, this.props.style]}>
                <Image style={styles.image} source={{uri:'launchscreen'}}/>
                <View style={styles.content}>
                    <ActivityIndicator color='#8286FF' size='large' />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    body:{
        flex:1,
    },
    image:{
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    content:{
        position:'absolute',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        top:0,
        left:0,
        bottom:0,
        right:0,
    },
});


export default LaunchScreen;
