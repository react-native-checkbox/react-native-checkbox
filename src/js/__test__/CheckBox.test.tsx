import * as React from 'react';
import renderer from 'react-test-renderer';
import AndroidCheckbox from '../CheckBox.android';
import IosCheckbox from '../CheckBox.ios';

describe('render Android <Checkbox />', () => {
  it('renders enabled Android Checkbox', () => {
    const tree = renderer.create(<AndroidCheckbox />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders disabled Android Checkbox', () => {
    const tree = renderer.create(<AndroidCheckbox disabled />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Android Checkbox with value', () => {
    const tree = renderer.create(<AndroidCheckbox value />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('render IOS <Checkbox />', () => {
  it('renders enabled IOS Checkbox', () => {
    const tree = renderer.create(<IosCheckbox />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders hideBox IOS Checkbox', () => {
    const tree = renderer
      .create(<IosCheckbox hideBox={true} value={true} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders disabled IOS Checkbox', () => {
    const tree = renderer
      .create(<IosCheckbox disabled={true} value={true} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders disabled false IOS Checkbox', () => {
    const tree = renderer
      .create(<IosCheckbox disabled={false} value={true} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders IOS Checkbox without disabled props', () => {
    const tree = renderer.create(<IosCheckbox value={true} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders IOS Checkbox with accessible={false} props', () => {
    const tree = renderer.create(<IosCheckbox accessible={false} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders IOS Checkbox with full setting', () => {
    const tree = renderer
      .create(
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
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
