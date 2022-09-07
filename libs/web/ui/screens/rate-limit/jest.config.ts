/* eslint-disable */
export default {
  displayName: 'web-ui-screens-rate-limit',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/web/ui/screens/rate-limit',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
