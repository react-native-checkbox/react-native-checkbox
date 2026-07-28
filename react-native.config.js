// react-native.config.js
module.exports = {
  dependency: {
    platforms: {
      windows: {
        sourceDir: 'src/windows/Checkbox',
        solutionFile: 'Checkbox.sln',
        projects: [
          {
            projectFile: 'Checkbox\\Checkbox.vcxproj',
            directDependency: true,
          },
        ],
      },
    },
  },
};
