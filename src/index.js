/**
 * Author: LinberDuan
 * Create Time: 2018-12-04 17:32
 * Description:
 */

import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    DeviceEventEmitter,
    BackHandler,
    AppState,
    Alert,
    Platform,
    PushNotificationIOS,
} from 'react-native';

import { connect } from 'react-redux';

import SplashScreen from 'react-native-splash-screen'

import LoadingScreen from './components/LoadingScreen';
import LaunchScreen from './components/LaunchScreen';
import {setAppStatus} from "./actions/appStatus";
import {AppStatus} from "./reducers/appStatus";
import {ShowMsg} from "./components/ShowMessage";
import ModalBox from './components/ModalBox';

import {
  pushToken,
} from "./actions/appActions";

import AppContainer from './routers';

import {net_addEventListener, net_removeEventListener,checkNetworkState} from "./network/NetWorkTool";

class Main extends Component {

    state = {
        ready: false,
        currentAppState: AppState.currentState,
        showTouchIdScrn:false,
    };

    constructor(props) {
        super(props);
        //监控原生事件
        AppState.addEventListener('change', this.handleAppStateChange);


    }

    componentDidMount() {
        /*获取用户经纬度*/
        // positionInfo();
        /*检测网络*/
        // checkNetworkState();
        //解决白屏问题
        SplashScreen.hide();
        // net_addEventListener();
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);


        if("ios" === Platform.OS) {
            // Add listener for push notifications
            PushNotificationIOS.addEventListener('notification', this.onNotification);
            // Add listener for local notifications
            PushNotificationIOS.addEventListener('localNotification', this.onLocalNotification);
            // Add listener for deviceToken registered
            PushNotificationIOS.addEventListener('register', this.register);

            PushNotificationIOS.setApplicationIconBadgeNumber(0);
        }


        // this.notificationConfig()

        this.init();
        // setTimeout(()=>{
        //   this.setState({testFlag:2})
        // }, 3000);
    }

    componentWillUnmount() {

        if("ios" === Platform.OS) {
            // Remove listener for notifications
            PushNotificationIOS.removeEventListener('notification', this.onNotification);
            PushNotificationIOS.removeEventListener('localNotification', this.onLocalNotification);
            PushNotificationIOS.removeEventListener('register', this.register);
        }


        // net_removeEventListener();
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    async init() {

        const {dispatch} = this.props;


        this.setState({ ready: true });



    }

      //receive remote notification
     onNotification = (notification)=> {
       const title = notification._alert.title || ""
       const body = notification._alert.body || ""
       Alert.alert(
        title,
        body,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
     }
     //receive local notification
     onLocalNotification = (notification)=> {

     }
     //获取device token
     register = (deviceToken)=>  {
         //使用window保存下devicetoken
         const { pushToken } = this.props

         console.warn("deviceToken:"+deviceToken);

         pushToken({deviceToken})

     }
    //原生状态处理
    handleAppStateChange = (nextAppState) => {
        if (this.state.currentAppState.match(/background/) && nextAppState === 'active') {
            console.log('从后台进入前台');
            this.props.dispatch(setAppStatus(AppStatus.Foreground));

        }
        else if (this.state.currentAppState.match(/active/) && nextAppState === 'background'){
            console.log('从前台进入后台');
            this.props.dispatch(setAppStatus(AppStatus.Background));
        }
        this.setState({currentAppState: nextAppState});
    };


    //安卓返回键处理
    onBackAndroid = () => {

        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {

            //最近2秒内按过back键，可以退出应用。

            return false;

        }

        this.lastBackPressed = Date.now();

        ShowMsg('再按一次退出应用');

        return true;

    };

    render() {

        const { loading,language,dispatch} = this.props;

        const {ready} = this.state;

        return (
          <View style={styles.body} >
              {
                  ready ? <AppContainer style={{backgroundColor:'red'}}/> : <LaunchScreen/>
              }
              <ModalBox/>
              {
                  loading ? <LoadingScreen visible={loading}/> : null
              }
          </View>
        );
    }
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    container: {
        // flex: 1,

    },
    position: {
        position:'absolute',
        flex:1,
        top:0,
        left:0,
        bottom:0,
        right:0,
    }
});


let mapStateToProps = state => {

    return {
      appStatus:state.appStatus,
    }
};

let mapDispatchToProps = dispatch => {
    return {
        dispatch:dispatch,
        pushToken:(request)=>dispatch(pushToken(request)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
