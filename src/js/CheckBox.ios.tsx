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

import React from 'react';
import {
  StyleSheet,
  processColor,
  ViewProps,
  NativeComponent,
  NativeSyntheticEvent,
} from 'react-native';
import IOSCheckBoxNativeComponent from './IOSCheckBoxNativeComponent';
// @ts-ignore setAndForwardRef type does not exist in @types/react-native
import setAndForwardRef from 'react-native/Libraries/Utilities/setAndForwardRef';

type CheckBoxEvent = NativeSyntheticEvent<
  Readonly<{
    target: number,
    value: boolean,
    name: 'animation' | 'tap',
    // eslint-disable-next-line prettier/prettier
  }>
>;

type CommonProps = Readonly<
  ViewProps & {
    /**
     * Used in case the props change removes the component.
     */
    onChange?: (event: CheckBoxEvent) => void,

    /**
     * Invoked with the new value when the value changes.
     */
    onValueChange?: (value: boolean) => void,

    /**
     * Used to locate this view in end-to-end tests.
     */
    testID?: string,
    // eslint-disable-next-line prettier/prettier
  }
>;

type CheckBoxNativeType = typeof NativeComponent;

type BoxType = 'circle' | 'square'
type AnimationType = 'stroke' | 'fill' | 'bounce' | 'flat' | 'one-stroke' | 'fade'

type Props = Readonly<
  CommonProps & {
    /**
     * The value of the checkbox.  If true the checkbox will be turned on.
     * Default value is false.
     */
    value?: boolean,

    /**
     * If true the user won't be able to toggle the checkbox.
     * Default value is false.
     */
    disabled?: boolean,

    /**
     * Used to get the ref for the native checkbox
     */
    forwardedRef?: React.Ref<CheckBoxNativeType>,

    /**
     * Controls the colors the checkbox has in checked and unchecked states.
     */
    tintColors?: {true?: number, false?: number},
    // eslint-disable-next-line prettier/prettier

    lineWidth?: number,
    hideBox?: boolean,
    boxType?: BoxType
    tintColor?: string,
    onCheckColor?: string,
    onFillColor?: string,
    onTintColor?: string,
    animationDuration?: number,
    onAnimationType?: AnimationType,
    offAnimationType?: AnimationType,
    onAnimationEnd?: Function,
  }
>;

export default class CheckBox extends React.Component<Props> {

  _nativeRef: React.Ref<CheckBoxNativeType> | null = null;
  _setNativeRef = setAndForwardRef({
    getForwardedRef: () => this.props.forwardedRef,
    setLocalRef: (ref: any) => {
      this._nativeRef = ref;
    },
  });

  _onChange = (event: CheckBoxEvent) => {
    const {
      onValueChange,
      onAnimationEnd,
      value: propValue,
      onChange,
    } = this.props;

    const { name, value: nativeValue } = event.nativeEvent;

    // @ts-ignore
    nullthrows(this._nativeRef).setNativeProps({value: propValue});

    // Change the props after the native props are set in case the props
    // change removes the component
    onChange && onChange(event);
    onValueChange && onValueChange(nativeValue);
    if (name === 'animation' && onAnimationEnd) {
      onAnimationEnd(propValue);
    }
  };

  getTintColors(tintColors: {true?: number, false?: number} | undefined) {
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
      <IOSCheckBoxNativeComponent
        {...nativeProps}
        ref={this._setNativeRef}
        onChange={this._onChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  rctCheckBox: {
    height: 50,
    width: 50,
    backgroundColor: 'transparent',
  },
});