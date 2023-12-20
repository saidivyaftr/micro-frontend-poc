module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.[t|j]sx?$': 'ts-jest',
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest',
    '^.+\\.svg$': '<rootDir>/svgTransform.js',
  },
  testMatch: ['**/*.(test|spec).(ts|tsx)'],
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      babelConfig: '<rootDir>/.babelrc',
      tsConfig: '<rootDir>/jest.tsconfig.json',
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/', 'jest.setup.js'],
  setupFiles: ['./setup-tests.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '^@/shared-ui/layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@/shared-ui/components$': '<rootDir>/src/blitz/index.ts',
    '^@/shared-ui/components/(.*)$': '<rootDir>/src/blitz/components/$1',
    '^@/shared-ui/react-icons$': '<rootDir>/src/blitz/assets/react-icons/index',
    '^@/shared-ui/react-icons/(.*)':
      '<rootDir>/src/blitz/assets/react-icons/$1',
    '^@/shared-ui/hooks$': '<rootDir>/src/hooks/index',
    '^@/shared-ui/hooks/(.*)': '<rootDir>/src/hooks/$1',
    '^@/shared-ui/colors$': '<rootDir>/src/styles/theme/colors.ts',
    '^@/shared-ui/theme/colors.types':
      '<rootDir>/src/blitz/theme/colors/colors.types',
    '^@/shared-ui/theme/colors.helper':
      '<rootDir>/src/blitz/theme/colors/colors.helper',
  },
  modulePaths: ['<rootDir>'],
}
