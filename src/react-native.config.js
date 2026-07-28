// react-native.config.js
module.exports = {
  dependency: {
    platforms: {
      windows: {
        sourceDir: 'windows',
        solutionFile: 'Checkbox.sln',
        projects: [
          {
            projectFile: 'Checkbox\\Checkbox.vcxproj',
            projectName: 'Checkbox',
            projectLang: 'cpp',
            projectGuid: '{87A42D22-4DC5-4BDD-A12A-C90CD1B75FF6}',
            directDependency: true,
            cppHeaders: ['winrt/Checkbox.h'],
            cppPackageProviders: ['Checkbox::ReactPackageProvider'],
          },
        ],
      },
    },
  },
};
