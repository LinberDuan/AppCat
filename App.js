/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';


import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './src/reducers';


import Main from './src'

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

//// applyMiddleware() 告诉 createStore() 如何处理中间件
let store = createStore(reducer, applyMiddleware(thunkMiddleware));

type Props = {};
export default class App extends Component<Props> {

  render() {
      return (
        <Provider store={store}>
            <Main/>
        </Provider>
      )
  }
}
