/**
 * Author: LinberDuan
 * Create Time: 2018-06-05 16:01
 * Description:
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    DeviceEventEmitter,
    Animated,
} from 'react-native';

var childrens = [];
var visible = false;

class ModalBox extends Component {

    static push(children) {
        childrens.push(children);
        DeviceEventEmitter.emit('ModalBoxPush');
    }
    static pop(children) {
        childrens.pop(children);
        DeviceEventEmitter.emit('ModalBoxPop');
    }

    static hideAll(){
        childrens = [];
        DeviceEventEmitter.emit('ModalBoxPop');
    }

    static visibleState() {
        return visible;
    }

    state = {
        time:Date.now(),
    };

    componentDidMount() {
        this.subscription_push = DeviceEventEmitter.addListener('ModalBoxPush', ()=>{this.setState({time:Date.now()})});
        this.subscription_pop = DeviceEventEmitter.addListener('ModalBoxPop', ()=>{this.setState({time:Date.now()})});

    }

    componentWillUnmount() {
        this.subscription_push.remove();
        this.subscription_pop.remove();
    }

    getChildrens() {
        var c = [];

        for(var i=0; i<childrens.length; i++) {
            const Children = childrens[i];
            // const childrenVisible = Children.props.visible || true;
            c.push(
                <View style={styles.child} key={i}>
                    <Children visible={(c)=>{
                        const obj = c || Children;
                        ModalBox.pop(obj);
                    }}/>
                </View>
            );

        }

        return c;
    }

    render() {
        // alert(this.state.childrens);
        visible = childrens.length >0;
        if(visible) {
            return (
                <ModalBoxAnimatedView style={styles.body} time={this.state.time}>
                    {this.getChildrens()}
                </ModalBoxAnimatedView>
            );
        }
        else {
            return (<View/>);
        }


    }
}

const styles = StyleSheet.create({
    body:{
        position:'absolute',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        top:0,
        left:0,
        bottom:0,
        right:0,
    },
    child:{
        position:'absolute',
        flex:1,
        top:0,
        left:0,
        bottom:0,
        right:0,
    }
});

export default ModalBox;


class ModalBoxAnimatedView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0), // init opacity 0
        };
    }

    componentDidMount() {
        Animated.timing(          // Uses easing functions
            this.state.fadeAnim,    // The value to drive
            {
                toValue: 1,
                duration:0,
            },           // Configuration
        ).start();                // Don't forget start!
    }

    render() {
        const {children, style} = this.props;
        return (
            <Animated.View style={
                [
                    style,
                    {
                        opacity: this.state.fadeAnim
                    }
                ]
                }
            >
                {children}
            </Animated.View>
        );
    }
}
