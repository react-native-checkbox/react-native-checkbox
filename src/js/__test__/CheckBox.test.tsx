import * as React from 'react';
import renderer from 'react-test-renderer';
import Checkbox from '../CheckBox.android';

describe('<Checkbox />', () => {
  it('renders enabled Checkbox', () => {
    const tree = renderer.create(<Checkbox />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders disabled Checkbox', () => {
    const tree = renderer.create(<Checkbox disabled />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Checkbox with value', () => {
    const tree = renderer.create(<Checkbox value />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
