/* eslint-disable */
export default {
  displayName: 'web-ui-components-input-search',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../coverage/libs/web/ui/components/input-search',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
