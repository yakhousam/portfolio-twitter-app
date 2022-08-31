/* eslint-disable */
export default {
  displayName: 'server',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/server',
  projects: [
    '<rootDir>/../../libs/server/middlewares/error',
    '<rootDir>/../../libs/server/routes/search/hashtag/src/lib',
    '<rootDir>/../../libs/server/controllers/twitter-search/src/lib',
  ],
};
