/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use strict';

import nullthrows from 'nullthrows';
import React from 'react';
import {
  StyleSheet,
  processColor,
  ViewProps,
  NativeMethods,
  NativeSyntheticEvent,
} from 'react-native';
// @ts-ignore setAndForwardRef type does not exist in @types/react-native
import setAndForwardRef from 'react-native/Libraries/Utilities/setAndForwardRef';

import AndroidCheckBoxNativeComponent from './AndroidCheckBoxNativeComponent';

type CheckBoxEvent = NativeSyntheticEvent<
  Readonly<{
    target: number;
    value: boolean;
  }>
>;

type CommonProps = Readonly<
  ViewProps & {
    /**
     * Used in case the props change removes the component.
     */
    onChange?: (event: CheckBoxEvent) => void;

    /**
     * Invoked with the new value when the value changes.
     */
    onValueChange?: (value: boolean) => void;

    /**
     * If true the user won't be able to toggle the checkbox.
     * Default value is false.
     */
    disabled?: boolean;

    /**
     * Used to locate this view in end-to-end tests.
     */
    testID?: string;
  }
>;

type NativeProps = Readonly<
  CommonProps & {
    on?: boolean;
    enabled?: boolean;
    tintColors: {true: any; false: any} | undefined;
  }
>;

type CheckBoxNativeType = NativeMethods;

export type Props = Readonly<
  CommonProps & {
    /**
     * The value of the checkbox.  If true the checkbox will be turned on.
     * Default value is false.
     */
    value?: boolean;

    /**
     * Used to get the ref for the native checkbox
     */
    forwardedRef?: React.Ref<CheckBoxNativeType>;

    /**
     * Controls the colors the checkbox has in checked and unchecked states.
     * TODO: improve this type
     */
    tintColors?: {true: any; false: any};
  }
>;

/**
 * Renders a boolean input (Android only).
 *
 * This is a controlled component that requires an `onValueChange` callback that
 * updates the `value` prop in order for the component to reflect user actions.
 * If the `value` prop is not updated, the component will continue to render
 * the supplied `value` prop instead of the expected result of any user actions.
 *
 * ```
 * import React from 'react';
 * import { AppRegistry, StyleSheet, Text, View, CheckBox } from 'react-native';
 *
 * export default class App extends React.Component {
 *   constructor(props) {
 *     super(props);
 *     this.state = {
 *       checked: false
 *     }
 *   }
 *
 *   toggle() {
 *     this.setState(({checked}) => {
 *       return {
 *         checked: !checked
 *       };
 *     });
 *   }
 *
 *   render() {
 *     const {checked} = this.state;
 *     return (
 *       <View style={styles.container}>
 *         <Text>Checked</Text>
 *         <CheckBox value={checked} onChange={this.toggle.bind(this)} />
 *       </View>
 *     );
 *   }
 * }
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *     flexDirection: 'row',
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *   },
 * });
 *
 * // skip this line if using Create React Native App
 * AppRegistry.registerComponent('App', () => App);
 * ```
 *
 * @keyword checkbox
 * @keyword toggle
 */
class CheckBox extends React.Component<Props> {
  _nativeRef: React.Ref<CheckBoxNativeType> | null = null;
  _setNativeRef = setAndForwardRef({
    getForwardedRef: () => this.props.forwardedRef,
    setLocalRef: (ref: any) => {
      this._nativeRef = ref;
    },
  });

  _onChange = (event: CheckBoxEvent) => {
    const value = this.props.value || false;

    // @ts-ignore
    nullthrows(this._nativeRef).setNativeProps({value: value});

    // Change the props after the native props are set in case the props
    // change removes the component
    this.props.onChange && this.props.onChange(event);
    this.props.onValueChange &&
      this.props.onValueChange(event.nativeEvent.value);
  };

  getTintColors(tintColors: {true: any; false: any} | undefined) {
    return tintColors
      ? {
          true: processColor(tintColors.true),
          false: processColor(tintColors.false),
        }
      : undefined;
  }

  render() {
    const {tintColors, style, ...props} = this.props;
    const disabled = this.props.disabled || false;
    const value = this.props.value || false;

    const nativeProps = {
      ...props,
      onStartShouldSetResponder: () => true,
      onResponderTerminationRequest: () => false,
      enabled: !disabled,
      on: value,
      tintColors: this.getTintColors(tintColors),
      style: [styles.rctCheckBox, style],
    };
    return (
      <AndroidCheckBoxNativeComponent
        {...nativeProps}
        ref={this._setNativeRef}
        // @ts-ignore TODO: implement the type of AndroidCheckBoxNativeComponent
        onChange={this._onChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  rctCheckBox: {
    height: 32,
    width: 32,
  },
});

/**
 * Can't use CheckBoxNativeType because it has different props
 */
type CheckBoxType = NativeMethods;

const CheckBoxWithRef = React.forwardRef(function CheckBoxWithRef(
  props: Props,
  ref: React.Ref<CheckBoxType>,
) {
  return <CheckBox {...props} forwardedRef={ref} />;
});

export default CheckBoxWithRef;
