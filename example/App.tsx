/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView} from 'react-native';

// Platform-specific imports
let CheckBox: any;
let CheckboxWindowsExamples: any[] = [];

if (Platform.OS === 'windows') {
  CheckboxWindowsExamples = require('./CheckboxWindowsExample').examples;
} else {
  CheckBox = require('@react-native-community/checkbox').default;
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu！',
});

const isIOS = Platform.OS === 'ios';
const isWindows = Platform.OS === 'windows';

type Props = {};
type State = {
  value0: boolean;
  value1: boolean;
  value2: boolean;
  value3: boolean;
  value4: boolean;
  lineWidth: number;
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

  renderForIOS() {
    return (
      <View style={styles.container}>
        <Text>{`[value: ${this.state.value0}]`}</Text>
        <CheckBox
          disabled={true}
          value={this.state.value0}
          onValueChange={(value) =>
            this.setState({
              value0: value,
            })
          }
        />
        <Text>{`[value: ${this.state.value4}]`}</Text>
        <CheckBox
          value={this.state.value4}
          hideBox={true}
          onValueChange={(value) =>
            this.setState({
              value4: value,
            })
          }
        />
        <Text>{`[value: ${this.state.value3}]`}</Text>
        <CheckBox
          value={this.state.value3}
          boxType={'square'}
          onValueChange={(value) =>
            this.setState({
              value3: value,
            })
          }
        />
        <Text>{`[value: ${this.state.value2}]`}</Text>
        <CheckBox
          value={this.state.value2}
          onValueChange={(value) =>
            this.setState({
              value2: value,
            })
          }
          onAnimationDidStop={() => console.log('onAnimationDidStopEvent')}
          lineWidth={2}
          hideBox={false}
          boxType={'circle'}
          tintColors={'#9E663C'}
          onCheckColor={'#6F763F'}
          onFillColor={'#4DABEC'}
          onTintColor={'#F4DCF8'}
          animationDuration={0.5}
          disabled={false}
          onAnimationType={'bounce'}
          offAnimationType={'stroke'}
        />
        <Button
          onPress={() =>
            this.setState({
              value2: !this.state.value2,
            })
          }
          title="toggle the value above"
        />
      </View>
    );
  }

  renderForAndroid() {
    return (
      <View style={styles.container}>
        <Text>{`[value: ${this.state.value0}]`}</Text>
        <CheckBox
          disabled={true}
          value={this.state.value0}
          onValueChange={(value) =>
            this.setState({
              value0: value,
            })
          }
        />
        <Text>{`[value: ${this.state.value1}]`}</Text>
        <CheckBox
          value={this.state.value1}
          tintColors={{true: '#ff0000'}}
          onValueChange={(value) =>
            this.setState({
              value1: value,
            })
          }
        />
        <Button
          onPress={() =>
            this.setState({
              value1: !this.state.value1,
            })
          }
          title="toggle the value above"
        />
      </View>
    );
  }

  renderForWindows() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.welcome}>Welcome to React Native Checkbox!</Text>
          {CheckboxWindowsExamples.map((example, index) => {
            const ExampleComponent = example.render;
            return (
              <View key={index} style={styles.exampleContainer}>
                <Text style={styles.sectionTitle}>{example.title}</Text>
                <Text style={styles.description}>{example.description}</Text>
                <ExampleComponent />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native Checkbox!</Text>
         {isIOS
          ? this.renderForIOS()
          : Platform.OS === 'windows'
          ? this.renderForWindows()
          : this.renderForAndroid()}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  exampleContainer: {
    marginBottom: 20,
    padding: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  result: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
  },
});
