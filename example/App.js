/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu！',
});

const isIOS = Platform.OS === 'ios';

type Props = {};
type State = {
  value0: boolean,
  value1: boolean,
  value2: boolean,
  value3: boolean,
  value4: boolean,
};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value0: true,
      value1: false,
      value2: true,
      value3: false,
      value4: false,
      lineWidth: 10,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native Checkbox!</Text>
        <CheckBox disabled={true} />
        <CheckBox value={false} hideBox={true} />
        <CheckBox boxType={'square'} />
        <CheckBox
          value={this.state.value2}
          onValueChange={value =>
            this.setState({
              value2: value,
            })
          }
          onAnimationDidStop={() => console.log('onAnimationDidStopEvent')}
          lineWidth={2}
          hideBox={false}
          boxType={'circle'}
          tintColor={'#9E663C'}
          onCheckColor={'#6F763F'}
          onFillColor={'#4DABEC'}
          onTintColor={'#F4DCF8'}
          animationDuration={0.5}
          disabled={false}
          onAnimationType={'bounce'}
          offAnimationType={'stroke'}
        />
        <Text>{`value is: ${this.state.value2}`}</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
