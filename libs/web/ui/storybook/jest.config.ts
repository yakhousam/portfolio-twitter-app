/* eslint-disable */
export default {
  displayName: 'web-ui-storybook',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/web/ui/storybook',
  coveragePathIgnorePatterns: ['index.js', 'index.jsx', 'index.ts'],
};
