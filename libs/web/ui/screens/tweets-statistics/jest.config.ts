/* eslint-disable */
export default {
  displayName: 'web-ui-screens-tweets-statistics',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../coverage/libs/web/ui/screens/tweets-statistics',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
