import * as React from 'react';
import {render} from '@testing-library/react-native';

// Capture the props the CheckBox passes to the native component so the test
// can drive the onChange handler and observe how the native view is reset.
// Names are prefixed with `mock` so jest.mock's factory may reference them.
const mockState: {nativeProps: any} = {nativeProps: null};
const mockSetNativeProps = jest.fn();

jest.mock('../IOSCheckBoxNativeComponent', () => {
  const ReactModule = require('react');
  return {
    __esModule: true,
    default: ReactModule.forwardRef((props: any, ref: any) => {
      mockState.nativeProps = props;
      ReactModule.useImperativeHandle(ref, () => ({
        setNativeProps: mockSetNativeProps,
      }));
      return ReactModule.createElement('RNCCheckbox', props);
    }),
  };
});

import IosCheckbox from '../CheckBox.ios';

beforeEach(() => {
  mockState.nativeProps = null;
  mockSetNativeProps.mockClear();
});

describe('iOS CheckBox controlled behavior (issue #103)', () => {
  it('resets the native view to the `value` prop and reports the tapped value', () => {
    const onValueChange = jest.fn();
    const onChange = jest.fn();

    render(
      <IosCheckbox
        value={true}
        onValueChange={onValueChange}
        onChange={onChange}
      />,
    );

    // Simulate a tap that toggles the native checkbox off.
    const event = {nativeEvent: {value: false, target: 1, name: 'tap'}};
    mockState.nativeProps.onValueChange(event);

    // onValueChange receives the value produced by the native tap...
    expect(onValueChange).toHaveBeenCalledWith(false);
    expect(onChange).toHaveBeenCalledWith(event);
    // ...but the native view is reset to the controlled `value` prop (true),
    // so the iOS checkbox stays in sync with the controlled state instead of
    // drifting to whatever the tap produced.
    expect(mockSetNativeProps).toHaveBeenLastCalledWith({value: true});
  });

  it('keeps the native view off when the controlled value is false', () => {
    const onValueChange = jest.fn();

    render(<IosCheckbox value={false} onValueChange={onValueChange} />);

    mockState.nativeProps.onValueChange({
      nativeEvent: {value: true, target: 1, name: 'tap'},
    });

    expect(onValueChange).toHaveBeenCalledWith(true);
    expect(mockSetNativeProps).toHaveBeenLastCalledWith({value: false});
  });
});
