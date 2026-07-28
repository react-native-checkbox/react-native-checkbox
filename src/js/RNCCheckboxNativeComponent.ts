/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 *
 * @format
 */

'use strict';

import type {ViewProps, ColorValue, HostComponent} from 'react-native';
import type {
  WithDefault,
  BubblingEventHandler,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type CheckBoxChangeEvent = Readonly<{
  value: boolean;
}>;

export interface RNCCheckboxNativeProps extends ViewProps {
  /**
   * If true the user won't be able to toggle the checkbox.
   * Default value is false.
   */
  disabled?: WithDefault<boolean, false>;

  /**
   * The value of the checkbox. If true the checkbox will be turned on.
   * Default value is false.
   */
  value?: WithDefault<boolean, false>;

  /**
   * Used to set the color of the checkbox when it is disabled.
   */
  tintColor?: ColorValue;

  /**
   * Used to set the color of the check mark when the checkbox is checked.
   */
  onCheckColor?: ColorValue;

  /**
   * Used to set the tint color of the checkbox when it is checked.
   */
  onTintColor?: ColorValue;

  /**
   * Used to set the fill color of the checkbox when it is checked.
   */
  onFillColor?: ColorValue;

  /**
   * The label to display next to the checkbox.
   */
  label?: string;

  /**
   * Called when the checkbox value changes.
   */
  onChange?: BubblingEventHandler<CheckBoxChangeEvent>;
}

export default codegenNativeComponent<RNCCheckboxNativeProps>('RNCCheckbox') as HostComponent<RNCCheckboxNativeProps>;
