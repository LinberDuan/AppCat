/**
 * Author: LinberDuan
 * Create Time: 2018-12-04 17:32
 * Description:
 */

 import React, {Component} from 'react';
 import {
     StyleSheet,
     View,
     FlatList,
     Linking,
 } from 'react-native';
 import {connect} from "react-redux";
 import {ShowMsg, ShowMsgErr, ShowMsgErrObj, ShowMsgFErr} from "../../components/ShowMessage";
 import NavigationBar from "../../components/NavigationBar";
 import EmptyView from "../../components/EmptyView";
 import {AppStatus} from "../../reducers/appStatus";
 import Cell from "./Cell"
 import {
   getAppList,
 } from "../../actions/appActions";

class AppListScreen extends Component {

    static navigationOptions = {
        header:null
    };

      constructor(props) {
          super(props);
          this.state = {
              isRefreshing: false,
              pageStatus: -1,
              title:"",
              appList:[],
          };
      }


      componentDidMount() {

        const { appGroup={} } = this.props.navigation.state.params
        const { app = {} } = appGroup
        this.setState({
          title:app.title
        });

        this.reloadData();
      }

      componentWillUnmount() {

          if (this.openScreenListener) {
              this.openScreenListener.remove();
              this.openScreenListener = null;
          }

          if (this.didBlurSubscription) {
              this.didBlurSubscription.remove();
              this.didBlurSubscription = null;
          }
      }

      componentWillReceiveProps(nextProps) {


          //判断用户数据是否变动
          if (this.props.appStatus !== nextProps.appStatus &&
                  nextProps.appStatus === AppStatus.Foreground) // 判断app状态变化，从后台进入前台
          {
              this.reloadData();
          }
      }

      gotoAppList = () => {

          this.props.navigation.navigate('AppListScreen', {});
      };

      renderRow = ()=> {

          // const assetsList = this.props.accountAssets.assets || [];
          // return assetsList.map((assets, index) => {
          //
          //     return (
          //         <View />
          //     );
          // });

      }

      reloadData = (showRefreshing)=> {

        if(showRefreshing) {
          this.setState({
                isRefreshing: true,
            });
        }

        const { appGroup={} } = this.props.navigation.state.params
        const { app = {} } = appGroup

        this.props.getAppList({bundleId:appGroup.bundleId}).then((appList)=>{
          this.setState({appList})
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

      downLoadOnPress = (app)=>{
        Linking.openURL(app.downloadUrl).catch(err => {
          alert("下载失败:"+err)
        });
      }

      gotoAppDetailScreen = (app)=> {
        this.props.navigation.navigate('AppDetailScreen',{app});
      }

      render() {

          const { appList=[] } = this.state

          return (
              <View style={styles.body}>
                <NavigationBar title={this.state.title}
                               leftTitleIcon={require('../../resources/img/nav_btn_back.png')}
                               leftOnPress={() => this.props.navigation.pop()}/>
                <FlatList   data={appList}
                            renderItem={(item)=>{
                                return(<Cell item={item}
                                             key={item.key}
                                             onPress={this.cellOnPress}
                                             rightBtnClick={this.gotoActivationOrImport}
                                             rightOnPress={this.downLoadOnPress}/>)}}
                            ListEmptyComponent={
                                <EmptyView emptyModel = {this.state.isStartGetting ? 'loading':'none'} />}
                            keyExtractor={(item, index)=>'cellID'+index}
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh}
                            // onEndReached={this.reloadData}
                            // onEndReachedThreshold={0.3}
                          />
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
  });


  let mapStateToProps = state => {

      return {
        appList:state.appList,
        appStatus:state.appStatus,
      }
  };

  let mapDispatchToProps = dispatch => {
      return {
          dispatch: dispatch,
          getAppList:(request)=>dispatch(getAppList(request)),
      }
  };


export default connect(mapStateToProps, mapDispatchToProps)(AppListScreen);
