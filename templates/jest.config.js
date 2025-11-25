// Jest Configuration Template
module.exports = {
  // Test environment
  testEnvironment: 'node', // or 'jsdom' for browser-like environment

  // Roots where Jest should look for tests
  roots: ['<rootDir>/src', '<rootDir>/tests'],

  // Test match patterns
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],

  // Transform files with ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/index.tsx',
    '!src/setupTests.ts',
  ],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  coverageDirectory: 'coverage',

  coverageReporters: ['text', 'lcov', 'html', 'json'],

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // Module name mapper for aliases and static assets
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],

  // Watch plugins
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],

  // Verbose output
  verbose: true,

  // Clear mocks between tests
  clearMocks: true,

  // Restore mocks between tests
  restoreMocks: true,

  // Reset mocks between tests
  resetMocks: true,

  // Maximum worker threads
  maxWorkers: '50%',

  // Timeout
  testTimeout: 10000,
};
