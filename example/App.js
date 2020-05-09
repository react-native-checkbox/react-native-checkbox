/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu！',
});

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
      value0: false,
      value1: false,
      value2: true,
      value3: false,
      value4: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <CheckBox disabled={this.state.value0} />
        <CheckBox value={this.state.value1} hideBox={true} />
        <CheckBox boxType={'square'} />

        <Text>{`value is: ${this.state.value2}`}</Text>
        <CheckBox
          value={this.state.value2}
          onValueChange={event =>
            this.setState({value2: event.nativeEvent.value})
          }
        />
        <Text style={styles.welcome}>Welcome to React Native Checkbox!</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
