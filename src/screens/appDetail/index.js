/**
 * Author: LinberDuan
 * Create Time: 2018-12-04 17:32
 * Description:
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    Linking,
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';

import {connect} from "react-redux";
import {ShowMsg, ShowMsgErr, ShowMsgErrObj, ShowMsgFErr} from "../../components/ShowMessage";
import NavigationBar from "../../components/NavigationBar";
import EmptyView from "../../components/EmptyView";
import {AppStatus} from "../../reducers/appStatus";
import {
  getAppList,
} from "../../actions/appActions";

class AppDetailScreen extends Component {

    static navigationOptions = {
        header:null
    };
  constructor(props) {
      super(props);
      this.state = {
          isRefreshing: false,
          pageStatus: -1,
          msgUnread: false,
          title:""
      };
  }


  componentDidMount() {

    const { app } = this.props.navigation.state.params
    this.setState({
      title:app.title
    });

  }

  downLoadOnPress = ()=>{
    const { app } = this.props.navigation.state.params
    Linking.openURL(app.downloadUrl).catch(err => {
      alert("下载失败:"+err)
    });
  }

  reloadData = (showRefreshing)=> {

    if(showRefreshing) {
      this.setState({
            isRefreshing: true,
        });
    }

    const { app } = this.props.navigation.state.params

    this.props.getAppList({bundleId:appGroup.bundleId}).then(()=>{

    }, err => {
      ShowMsgErr(err)
    }).finally(()=>{
      this.setState({
            isRefreshing: false,
        });
    });
  }



  onRefresh = ()=> {
      this.setState({
          isRefreshing: true,
      });

      this.reloadData(true);
  }

  cellOnPress = (app)=>{

      this.gotoAppDetailScreen(app);
  };

  gotoAppDetailScreen = (app)=> {
    this.props.navigation.navigate('AppDetailScreen',{app});
  }

  render() {

      const { app } = this.props.navigation.state.params

      return (
          <View style={styles.body}>
            <NavigationBar title={this.state.title}
                           leftTitleIcon={require('../../resources/img/nav_btn_back.png')}
                           leftOnPress={() => this.props.navigation.pop()}/>
                         <ScrollView>
                           <View style={styles.iconView}>
                             <Image source={{ uri: app.appIconUrl }} style={styles.icon}/>
                           </View>
                           <Text style={styles.title}>{app.title}</Text>
                           <Text style={styles.subTitle}>
                             {app.subTitle}
                           </Text>
                         <Text style={styles.subTitle}>
                           {"版本: " + app.version + " (build: " + app.buildVersion+ ")" +
                             "  大小:" + Math.ceil(Number(app.fileSize)/(1024*1024)) + "M"
                           }
                         </Text>
                         <Text style={styles.subTitle}>
                           {"更新时间:" + app.editTime}
                         </Text>
                         <View style={styles.qrCodeView}>
                           <QRCode
                              value={app.downloadUrl}
                              logo={{uri: app.appIconUrl}}
                              logoSize={30}
                              logoBackgroundColor='transparent'
                              size={120}/>
                         </View>

                         <TouchableOpacity style={styles.btnView} onPress={this.downLoadOnPress}>
                           <Text style={styles.btnTitle}>{"下载"}</Text>
                         </TouchableOpacity>

                         <View style={styles.detailView}>
                           <Text style={styles.detailTitle}>{"更新内容:"}</Text>
                         <Text style={styles.detailText}>{app.describe}</Text>
                         </View>
                         </ScrollView>
          </View>
      );
  }



}

const styles = StyleSheet.create({
  body: {
      flex: 1,
  },
  content: {
      flex: 1,
      marginTop: 0,
  },
  iconView:{
    width: 120,
    height: 120,
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius:60,
    shadowOffset: {width: -2, height: -2},
    shadowOpacity: 1,
    shadowColor: '#999999',
    elevation:3,
  },
  icon:{
    width: 70,
    height: 70,
    borderRadius:15,
  },
  title:{
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  subTitle:{
    fontSize: 12,
    alignSelf: 'center',
    marginTop: 5,
  },
  qrCodeView:{
    alignSelf: 'center',
    marginTop: 10,
  },
  btnView:{
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 50,
    backgroundColor:'#377AE9',
    marginTop: 20,
    borderRadius:25,
    shadowOffset: {width: -2, height: -2},
    shadowOpacity: 1,
    shadowColor: '#999999',
    elevation:3,
  },
  btnTitle:{
    color:'#FFFFFF',
  },
  detailView:{
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  detailTitle:{
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailText:{
    marginTop: 10,
    fontSize: 13,
    color:'#666666',
    lineHeight: 18,
    marginBottom: 50,
  },
});


let mapStateToProps = state => {

  return {
    appList:state.appList,
  }
};

let mapDispatchToProps = dispatch => {
  return {
      dispatch: dispatch,
      getAppList:(request)=>dispatch(getAppList(request)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppDetailScreen);
