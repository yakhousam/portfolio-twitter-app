/* eslint-disable */
export default {
  displayName: 'web-ui-components-output',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/web/ui/components/output',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
