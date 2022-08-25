/* eslint-disable */
import { getJestProjects } from '@nrwl/jest';
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
  coverageDirectory: '../../coverage/apps/server',
  projects: [
    '<rootDir>/../../libs/server/middlewares/error',
    '<rootDir>/../../libs/server/routes/search/hashtag',
    '<rootDir>/../../libs/server/controllers/twitter-search',
  ],
};
