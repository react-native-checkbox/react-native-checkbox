require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "react-native-checkbox"
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['homepage']

  s.description  = package['description']
  s.platform     = :ios, "9.0"

  s.source       = { :git => "https://github.com/react-native-community/react-native-checkbox.git", :tag => "master" }
  s.source_files  = "ios/RNCReactNativeCheckbox/**/*.{h,m}"
  s.requires_arc = true

  s.dependency "React"

end
