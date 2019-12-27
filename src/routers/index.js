/**
 * Author: LinberDuan
 * Create Time: 2018-12-04 17:32
 * Description:
 */

import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import Routers from './routers';

let StackConfigs = {
    initialRouteName: 'HomeScreen',

    navigationOptions: {
        // header: null,
        tabBarOnPress: ({scene, jumpToIndex}) => (
            alert('test ' + JSON.stringify(scene))
        ),
    },
};
let AppNav = createStackNavigator(Routers, StackConfigs);

const AppContainer = createAppContainer(AppNav);

export default AppContainer
