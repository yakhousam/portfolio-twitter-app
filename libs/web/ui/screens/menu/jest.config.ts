/* eslint-disable */
export default {
  displayName: 'web-ui-screens-menu',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/web/ui/screens/menu',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
