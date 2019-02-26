
# react-native-react-native-checkbox

## Getting started

`$ npm install react-native-react-native-checkbox --save`

### Mostly automatic installation

`$ react-native link react-native-react-native-checkbox`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-react-native-checkbox` and add `RNCReactNativeCheckbox.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNCReactNativeCheckbox.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactnativecommunity.checkbox.RNCReactNativeCheckboxPackage;` to the imports at the top of the file
  - Add `new RNCReactNativeCheckboxPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-react-native-checkbox'
  	project(':react-native-react-native-checkbox').projectDir = new File(rootProject.projectDir, 	'../../node_modules/react-native-react-native-checkbox/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-react-native-checkbox')
  	```


## Usage
```javascript
import RNCReactNativeCheckbox from 'react-native-react-native-checkbox';

// TODO: What to do with the module?
RNCReactNativeCheckbox;
```
  