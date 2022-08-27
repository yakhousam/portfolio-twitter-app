/* eslint-disable */
export default {
  displayName: 'web-ui-components-twitter-timeline-embed',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../coverage/libs/web/ui/components/twitter-timeline-embed',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
