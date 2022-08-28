/* eslint-disable */
export default {
  displayName: 'web-ui-screens-search-bar',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/web/ui/screens/search-bar',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
