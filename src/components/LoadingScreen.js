/**
 * Author: LinberDuan
 * Create Time: 2018-06-02 14:21
 * Description:
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
} from 'react-native';

export default class LoadingScreen extends Component {

    state = {
        show:false,
    };
    componentDidMount() {
        const {visible} = this.props;

        if (Platform.OS === 'android'){

            this.setState({show:true});
        }else {

            this.timer = setInterval(() => {
                if(!this.state.show) {
                    this.setState({show:true});
                    clearInterval(this.timer);
                }
            }, 200);
        }

    }

    componentWillUnmount() {
        if(this.timer) clearInterval(this.timer);
    }

    render() {
        const {visible} = this.props;

        let size = Platform.OS === 'android'?'large':'small';

        return (
            <Modal transparent={true}
                   animationType='fade'
                   visible={visible}
                   onRequestClose={() => {}} >
                {
                    this.state.show ?
                        (
                            <View style={styles.body}>
                                <View style={styles.content}>
                                    <ActivityIndicator tintColor={"#587FFF"}
                                                       color={"#587FFF"}
                                                       size={size}/>
                                    {/*<Text style={styles.text}>{t('loading') + '...'}</Text>*/}
                                </View>
                            </View>

                        ):<View/>
                }

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    content:{
        width:120,
        height:100,
        // backgroundColor:'#AAA',
        alignItems:'center',
        justifyContent:'center',
        // borderRadius:10,
    },
    active:{
        color:'#111'
    },
    text:{
        marginTop:10,
        color:'#111'
    },
});
