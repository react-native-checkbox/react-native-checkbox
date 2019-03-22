# `@react-native-community/checkbox`
[![CircleCI Status](https://img.shields.io/circleci/project/github/react-native-community/react-native-checkbox/master.svg)](https://circleci.com/gh/react-native-community/workflows/react-native-checkbox/tree/master) ![Supports Android and iOS](https://img.shields.io/badge/platforms-android%20|%20ios-lightgrey.svg) ![MIT License](https://img.shields.io/npm/l/@react-native-community/checkbox.svg)

React Native component used to select a single value from a range of values.

## Getting started

`yarn add @react-native-community/checkbox`

or

`npm install @react-native-community/checkbox --save`

### Mostly automatic installation

`react-native link @react-native-community/checkbox`

### Manual installation

<details>
<summary>Manually link the library on Android</summary>
   
#### `android/settings.gradle`
```groovy
include ':@react-native-community/checkbox'
project(':@react-native-community/checkbox').projectDir = new File(rootProject.projectDir, '../node_modules/@react-native-community/checkbox/android')
```

#### `android/app/build.gradle`
```groovy
dependencies {
   ...
   implementation project(':@react-native-community/checkbox')
}
```

#### `android/app/src/main/.../MainApplication.java`
On top, where imports are:

```java
import com.reactnativecommunity.checkbox;
```

Add the `checkbox` class to your list of exported packages.

```java
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.asList(
            new MainReactPackage(),
            new CheckboxPackage()
    );
}
```
</details>

## Migrating from the core `react-native` module
This module was created when the CheckBox was split out from the core of React Native. To migrate to this module you need to follow the installation instructions above and then change you imports from:

```javascript
import { CheckBox } from 'react-native';
```

to:

```javascript
import CheckBox from '@react-native-community/checkbox';
```

## Usage

### Example

```javascript
import CheckBox from '@react-native-community/checkbox';
```

```javascript
  <CheckBox
    value={true}
    disabled={false}
  />
```

Check out the [example project](example) for more examples.

### Props
@TODO

## Contributors

This module was extracted from `react-native` core. Please reffer to https://github.com/react-native-community/react-native-checkbox/graphs/contributors for the complete list of contributors.

## License
The library is released under the MIT licence. For more information see `LICENSE`.