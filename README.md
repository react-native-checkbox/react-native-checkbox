# `@react-native-community/checkbox`
[![React Native Checkbox CI](https://github.com/react-native-checkbox/react-native-checkbox/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/react-native-checkbox/react-native-checkbox/actions/workflows/ci.yml)
![Supports Android, iOS and Windows](https://img.shields.io/badge/platforms-android%20%7C%20ios%20%7C%20windows-lightgrey.svg) ![MIT License](https://img.shields.io/npm/l/@react-native-community/checkbox.svg) [![npm version](https://img.shields.io/npm/v/@react-native-community/checkbox.svg?style=flat)](https://www.npmjs.com/package/@react-native-community/checkbox) [![Lean Core Extracted](https://img.shields.io/badge/Lean%20Core-Extracted-brightgreen.svg)](https://github.com/facebook/react-native/issues/23313)

React Native component for Checkbox

Android Example             |  IOS Example | Windows Example             |
:-------------------------:|:-------------------------: | :-------------------------:
<img src="screenShots/demo-android.png" width="320"/>  |  <img src="screenShots/demo-ios.png" width="320"/> | <img src="screenShots/demo-windows.png" width="520"/>



## Support

| RN version              | Checkbox version               |
| ----------------------- | ------------------------------ |
| >= 0.76 (New Architecture) | >= 0.5.20                    |
| >= 0.62 to run on Windows  | 0.5                          |
| > 0.60 & < 0.62         | >= 0.3 (Support iOS from 0.4)  |
| < 0.60                  | 0.2 (only Android)             |

### New Architecture

The library supports the React Native New Architecture (Fabric/TurboModules):

- **Android** and **Windows** run as native Fabric components.
- **iOS** runs through the New Architecture interop layer (it is not yet a
  native Fabric component). It works under the New Architecture, but a full
  iOS codegen migration is still tracked in
  [#211](https://github.com/react-native-checkbox/react-native-checkbox/issues/211).

The latest versions are developed and tested against React Native 0.82.

## Getting started

`yarn add @react-native-community/checkbox`

or

`npm install @react-native-community/checkbox --save`

On iOS, install cocoapods:

`npx pod-install`

### Autolinking

On react-native >= 0.60 (and react-native-windows >= 0.63), autolinking takes
care of linking the module on iOS, Android, and Windows — no extra steps are
needed beyond installing the package (and running `pod install` on iOS).

### Manual installation (legacy)

<blockquote>Only needed for react-native &lt; 0.60 or react-native-windows &lt; 0.63.</blockquote>

<details>
<summary>Manually link the library on Android</summary>

#### `android/settings.gradle`
```groovy
include ':react-native-community-checkbox'
project(':react-native-community-checkbox').projectDir = new File(rootProject.projectDir, '../node_modules/@react-native-community/checkbox/android')
```

#### `android/app/build.gradle`
```groovy
dependencies {
   ...
   implementation project(':react-native-community-checkbox')
}
```

#### `android/app/src/main/.../MainApplication.java`
On top, where imports are:

```java
import com.reactnativecommunity.checkbox.ReactCheckBoxPackage;
```

Add the `checkbox` class to your list of exported packages.

```java
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.asList(
            new MainReactPackage(),
            new ReactCheckBoxPackage()
    );
}
```
</details>

<details>
<summary>Manually link the library on Windows</summary>

#### Add the Checkbox project to your solution

1. Open the solution in Visual Studio.
2. Right-click solution icon in Solution Explorer > Add > Existing Project.
   Select `<pathToYourApp>\node_modules\@react-native-community\checkbox\windows\Checkbox\Checkbox.vcxproj`.

#### **windows/myapp.sln**

Add a reference to `Checkbox` to your main application project. From Visual Studio:

Right-click main application project > Add > Reference...
Check 'Checkbox' from the 'Project > Solution' tab on the left.

#### **pch.h**

Add `#include "winrt/Checkbox.h"`.

#### **app.cpp**

Add `PackageProviders().Append(winrt::Checkbox::ReactPackageProvider());` before `InitializeComponent();`.

</details>

## Migrating from the core `react-native` module
This module was created when the CheckBox was split out from the core of React Native. To migrate to this module you need to follow the installation instructions above and then change your imports from:

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
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  <CheckBox
    disabled={false}
    value={toggleCheckBox}
    onValueChange={(newValue) => setToggleCheckBox(newValue)}
  />
```

`CheckBox` is a **controlled component**: it renders the `value` prop and does
not keep its own internal state. You must update `value` (usually from
`onValueChange`) for the checkbox to reflect a tap. If `value` is not updated,
the checkbox stays in the state you passed — this is now consistent across
Android, iOS, and Windows.

Check out the [example project](example) for more examples.

### Props

## Common Props

[View props...](https://reactnative.dev/docs/view#props)

| Prop name     | Type     | Description                                                                                                                                                                                                           |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onChange      | function | Invoked on change with the native event.                                                                                                                                                                              |
| onValueChange | function | Invoked with the new boolean value when it changes.                                                                                                                                                                   |
| value         | boolean  | The value of the checkbox. If true the checkbox will be turned on. Default value is false.                                                                                                                            |
| testID        | string   | Used to locate this view in end-to-end tests.
| disabled      | boolean | If true the user won't be able to toggle the checkbox. Default value is false.


## Android Only Props

| Prop name     | Type    | Description                                                                                                                                                                                                           |
| ------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                                                             |
| tintColors    | object  | An object with the following shape: `{ true?: ?ColorValue, false?: ?ColorValue }`. The color value for `true` will be used when the checkbox is checked, and the color value for `false` will be used when it is off. |

## IOS Only Props

| Prop name     | Type    | Description                                                                                                                                                                                                           |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| lineWidth     | number | The width of the lines of the check mark and box. Defaults to 2.0.                                                                                                                                        |
| hideBox       | boolean | Control if the box should be hidden or not. Defaults to false |
| boxType       | 'circle' or 'square' |  The type of box to use. Defaults to 'circle' |
| tintColor     | string  | The color of the box when the checkbox is Off. Defaults to '#aaaaaa' |
| onCheckColor  | string  | The color of the check mark when it is On. Defaults to '#007aff' |
| onFillColor   | string  | The color of the inside of the box when it is On. Defaults to transparent |
| onTintColor   | string  | The color of the line around the box when it is On. Defaults to '#007aff' |
| animationDuration   | number  | The duration in seconds of the animations. Defaults to 0.5 |
| onAnimationType   | 'stroke' or 'fill' or 'bounce' or 'flat' or 'one-stroke' or 'fade'  | The type of animation to use when the checkbox gets checked. Default to 'stroke' |
| offAnimationType   | 'stroke' or 'fill' or 'bounce' or 'flat' or 'one-stroke' or 'fade'  | The type of animation to use when the checkbox gets unchecked. 'stroke'|

## Windows Props
Implemented most of iOS and Android props.
Defaults for color styling can be referenced here:
https://docs.microsoft.com/en-us/dotnet/framework/wpf/controls/checkbox-styles-and-templates

| Prop name     | Type    | Description                                                                                                                                                                                                           |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| disabled      | boolean | If true the user won't be able to toggle the checkbox. Default value is false.                                                                                                                                                                                           |
| tintColor     | string  | The color of the box when the checkbox is Off.|
| onCheckColor  | string  | The color of the check mark when it is On. |
| onFillColor   | string  | The color of the inside of the box when it is On. |
| onTintColor   | string  | The color of the line around the box when it is On. |

## Contributors

This module was extracted from `react-native` core.

The implementaion of IOS version refered to [BEMCheckBox](https://github.com/Boris-Em/BEMCheckBox)

## License
The library is released under the MIT licence. For more information see `LICENSE`.
