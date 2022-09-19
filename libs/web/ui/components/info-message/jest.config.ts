/* eslint-disable */
export default {
  displayName: 'web-ui-components-info-message',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../coverage/libs/web/ui/components/info-message',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
