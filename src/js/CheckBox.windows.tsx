/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
'use strict';

import nullthrows from 'nullthrows';
import React from 'react';
import {
  StyleSheet,
  ViewProps,
  NativeMethods,
  NativeSyntheticEvent,
} from 'react-native';
import WindowsCheckBoxNativeComponent from './WindowsCheckBoxComponent';
// @ts-ignore setAndForwardRef type does not exist in @types/react-native
import setAndForwardRef from 'react-native/Libraries/Utilities/setAndForwardRef';

type CheckBoxEvent = NativeSyntheticEvent<
  Readonly<{
    target: number;
    value: boolean;
  }>
>;

type CommonProps = Readonly<
  ViewProps & {
    /**
     * Used to get the ref for the native checkbox
     */
    forwardedRef?: React.Ref<CheckBoxNativeType>;

    /**
     * The value of the checkbox.  If true the checkbox will be turned on.
     * Default value is false.
     */
    value?: boolean;

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
     * @TODO: implement disable prop for IOS
     */
    disabled?: boolean;

    /**
     * Used to locate this view in end-to-end tests.
     */
    testID?: string;
  }
>;

type CheckBoxNativeType = NativeMethods;

export type Props = Readonly<
  CommonProps & {
    tintColor?: string;
    onCheckColor?: string;
    onFillColor?: string;
    onTintColor?: string;
  }
>;

class CheckBox extends React.Component<Props> {
  _nativeRef: React.Ref<CheckBoxNativeType> | null = null;
  _setNativeRef = setAndForwardRef({
    getForwardedRef: () => this.props.forwardedRef,
    setLocalRef: (ref: any) => {
      this._nativeRef = ref;
    },
  });

  _onChange = (event: CheckBoxEvent) => {
    const {onValueChange} = this.props;

    const {value} = event.nativeEvent;
    // @ts-ignore
    nullthrows(this._nativeRef).setNativeProps({value});
    onValueChange && onValueChange(value);
  };

  render() {
    // Do not use onValueChange directly from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {style, onValueChange, ...props} = this.props;
    return (
      <WindowsCheckBoxNativeComponent
        {...props}
        // @ts-ignore TODO: implement the type of WindowsCheckBoxNativeComponent
        style={[styles.rctCheckBox, style]}
        ref={this._setNativeRef}
        onChange={this._onChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  rctCheckBox: {
    height: 32,
    width: 32,
    backgroundColor: 'transparent',
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
