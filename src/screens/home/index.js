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
} from 'react-native';
import {connect} from "react-redux";
import {ShowMsg, ShowMsgErr, ShowMsgErrObj, ShowMsgFErr} from "../../components/ShowMessage";
import NavigationBar from "../../components/NavigationBar";
import EmptyView from "../../components/EmptyView";
import {AppStatus} from "../../reducers/appStatus";
import Cell from "./Cell"
import {
  getAppGroups,
} from "../../actions/appActions";

class HomeScreen extends Component {


    static navigationOptions = {
        title: 'AppCat',
        header:null
    };

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            pageStatus: -1,
            msgUnread: false,
        };
    }


    componentDidMount() {

        this.didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.reloadData();
            }
        );
        //TODO 待优化
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

      this.props.getAppGroups().then(()=>{

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

    cellOnPress = (appGroup)=>{

        this.gotoAppListScreen(appGroup);
    };

    gotoAppListScreen = (appGroup)=> {
      this.props.navigation.navigate('AppListScreen',{appGroup});
    }

    render() {

        const { appGroups=[] } = this.props

        return (
            <View style={styles.body}>
              <NavigationBar title={"AppCat"} />
              <FlatList   data={appGroups}
                          renderItem={(item)=>{
                              return(<Cell item={item}
                                           key={item.key}
                                           onPress={this.cellOnPress}
                                           rightBtnClick={this.gotoActivationOrImport}/>)}}
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
      appGroups:state.appGroups,
      appStatus:state.appStatus,
    }
};

let mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
        getAppGroups:(request)=>dispatch(getAppGroups(request)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
