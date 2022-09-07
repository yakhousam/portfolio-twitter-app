/* eslint-disable */
export default {
  displayName: 'web-ui-components-error-message',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../coverage/libs/web/ui/components/error-message',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
