import {Component} from 'react';
import {Constructor, NativeMethodsMixin} from 'react-native';
import {Props as AndroidProps} from '../js/CheckBox.android';
import {Props as IOSProps} from '../js/CheckBox.ios';

type CheckBoxProps = AndroidProps & IOSProps;

declare class CheckBoxComponent extends Component<CheckBoxProps> {}
declare const CheckBoxBase: Constructor<NativeMethodsMixin> &
  typeof CheckBoxComponent;
export default class CheckBox extends CheckBoxBase {}
