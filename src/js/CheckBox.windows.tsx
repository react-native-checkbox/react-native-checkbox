/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * @format
 */
'use strict';

import React from 'react';
import {StyleSheet, ViewProps, NativeMethods, NativeSyntheticEvent} from 'react-native';
import RNCCheckboxNativeComponent from './RNCCheckboxNativeComponent';
// @ts-ignore setAndForwardRef type does not exist in @types/react-native
import setAndForwardRef from './setAndForwardRef';

type CheckBoxEvent = NativeSyntheticEvent<
  Readonly<{
    value: boolean;
  }>
>;

type CheckBoxNativeType = NativeMethods;

export type Props = Readonly<
  ViewProps & {
    /**
     * Used to get the ref for the native checkbox
     */
    forwardedRef?: React.Ref<CheckBoxNativeType>;

    /**
     * The value of the checkbox. If true the checkbox will be turned on.
     * Default value is false.
     */
    value?: boolean;

    /**
     * If true the user won't be able to toggle the checkbox.
     * Default value is false.
     */
    disabled?: boolean;

    /**
     * Used in case the props change removes the component.
     */
    onChange?: (event: CheckBoxEvent) => void;

    /**
     * Invoked with the new value when the value changes.
     */
    onValueChange?: (value: boolean) => void;

    /**
     * Used to set the color of the box when unchecked.
     */
    tintColor?: string;

    /**
     * Used to set the color of the check mark when the checkbox is checked.
     */
    onCheckColor?: string;

    /**
     * Used to set the tint color of the checkbox border when it is checked.
     */
    onTintColor?: string;

    /**
     * Used to set the fill color of the checkbox when it is checked.
     */
    onFillColor?: string;

    /**
     * Used to locate this view in end-to-end tests.
     */
    testID?: string;
  }
>;

/**
 * Renders a boolean checkbox input (Windows).
 *
 * This is a controlled component that requires an `onValueChange` callback that
 * updates the `value` prop in order for the component to reflect user actions.
 * If the `value` prop is not updated, the component will continue to render
 * the supplied `value` prop instead of the expected result of any user actions.
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
    const {onChange, onValueChange} = this.props;

    onChange && onChange(event);
    onValueChange && onValueChange(event.nativeEvent.value);
  };

  render() {
    const {
      style,
      value,
      disabled,
      tintColor,
      onCheckColor,
      onTintColor,
      onFillColor,
      testID,
      ...props
    } = this.props;

    return (
      <RNCCheckboxNativeComponent
        {...props}
        testID={testID}
        value={value ?? false}
        disabled={disabled ?? false}
        tintColor={tintColor}
        onCheckColor={onCheckColor}
        onTintColor={onTintColor}
        onFillColor={onFillColor}
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
