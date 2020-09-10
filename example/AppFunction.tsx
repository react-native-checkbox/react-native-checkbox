/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu！',
});

const isIOS = Platform.OS === 'ios';

export default function App() {
  const [value, setValue] = useState(false);

  function renderForIOS() {
    return (
      <View style={styles.container}>
        <Text>{`[value: ${value}]`}</Text>
        <CheckBox
          value={value}
          hideBox={true}
          onValueChange={(val) => setValue(val)}
        />
        <Button
          onPress={() => setValue(!value)}
          title="toggle the value above"
        />
      </View>
    );
  }

  function renderForAndroid() {
    return (
      <View style={styles.container}>
        <Text>{`[value: ${value}]`}</Text>
        <CheckBox value={value} onValueChange={(val) => setValue(val)} />
        <Button
          onPress={() => setValue(!value)}
          title="toggle the value above"
        />
      </View>
    );
  }

  function renderForWindows() {
    return (
      <View style={styles.container}>
        <Text>{`[value: ${value}]`}</Text>
        <CheckBox
          tintColor={'green'}
          onCheckColor={'red'}
          onFillColor={'yellow'}
          onTintColor={'#80F4E8'}
          value={value}
          onValueChange={(val) => setValue(val)}
        />
        <Button
          onPress={() => setValue(!value)}
          title="toggle the value above"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native Checkbox!</Text>
      {isIOS
        ? renderForIOS()
        : Platform.OS === 'windows'
        ? renderForWindows()
        : renderForAndroid()}
      <Text style={styles.instructions}>{instructions}</Text>
    </View>
  );
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
