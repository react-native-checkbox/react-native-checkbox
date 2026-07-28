import * as React from 'react';
import {render} from '@testing-library/react-native';
import AndroidCheckbox from '../CheckBox.android';
import IosCheckbox from '../CheckBox.ios';
import WindowsCheckbox from '../CheckBox.windows';

describe('render Android <Checkbox />', () => {
  it('renders enabled Android Checkbox', () => {
    const {toJSON} = render(<AndroidCheckbox />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders disabled Android Checkbox', () => {
    const {toJSON} = render(<AndroidCheckbox disabled />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders Android Checkbox with value', () => {
    const {toJSON} = render(<AndroidCheckbox value />);

    expect(toJSON()).toMatchSnapshot();
  });
});

describe('render IOS <Checkbox />', () => {
  it('renders enabled IOS Checkbox', () => {
    const {toJSON} = render(<IosCheckbox />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders hideBox IOS Checkbox', () => {
    const {toJSON} = render(<IosCheckbox hideBox={true} value={true} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders disabled IOS Checkbox', () => {
    const {toJSON} = render(<IosCheckbox disabled={true} value={true} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders disabled false IOS Checkbox', () => {
    const {toJSON} = render(<IosCheckbox disabled={false} value={true} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders IOS Checkbox without disabled props', () => {
    const {toJSON} = render(<IosCheckbox value={true} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders IOS Checkbox with accessible={false} props', () => {
    const {toJSON} = render(<IosCheckbox accessible={false} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders IOS Checkbox with full setting', () => {
    const {toJSON} = render(
      <IosCheckbox
        value={false}
        onValueChange={() => {}}
        onAnimationDidStop={() => {}}
        lineWidth={2}
        hideBox={false}
        boxType={'circle'}
        tintColor={'#9E663C'}
        onCheckColor={'#6F763F'}
        onFillColor={'#4DABEC'}
        onTintColor={'#F4DCF8'}
        animationDuration={0.5}
        disabled={false}
        onAnimationType={'bounce'}
        offAnimationType={'stroke'}
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});

describe('render Windows <Checkbox />', () => {
  it('renders enabled Windows Checkbox', () => {
    const {toJSON} = render(<WindowsCheckbox />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders disabled Windows Checkbox', () => {
    const {toJSON} = render(<WindowsCheckbox disabled={true} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders Windows Checkbox with value', () => {
    const {toJSON} = render(<WindowsCheckbox value={true} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders Windows Checkbox with custom colors', () => {
    const {toJSON} = render(
      <WindowsCheckbox
        value={true}
        onValueChange={() => {}}
        tintColor={'#9E663C'}
        onCheckColor={'#6F763F'}
        onFillColor={'#4DABEC'}
        onTintColor={'#F4DCF8'}
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
