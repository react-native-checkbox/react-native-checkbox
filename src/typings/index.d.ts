import {Component} from 'react';
import {Constructor, NativeMethodsMixin} from 'react-native';
import {Props as AndroidProps} from '../dist/CheckBox.android';
import {Props as IOSProps} from '../dist/CheckBox.ios';
import {Props as WindowsProps} from '../dist/CheckBox.windows';

type CheckBoxProps = AndroidProps & IOSProps & WindowsProps;

declare class CheckBoxComponent extends Component<CheckBoxProps> {}
declare const CheckBoxBase: Constructor<NativeMethodsMixin> &
  typeof CheckBoxComponent;
export default class CheckBox extends CheckBoxBase {}
