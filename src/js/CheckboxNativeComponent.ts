/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

import type {HostComponent} from 'react-native';
import {Platform} from 'react-native';

let CheckboxNativeComponent: HostComponent<any>;

if (Platform.OS === 'android') {
  CheckboxNativeComponent = require('./AndroidCheckBoxNativeComponent').default;
} else if (Platform.OS === 'windows') {
  CheckboxNativeComponent = require('./RNCCheckboxNativeComponent').default;
} else {
  CheckboxNativeComponent = require('./IOSCheckBoxNativeComponent').default;
}

export default CheckboxNativeComponent;
