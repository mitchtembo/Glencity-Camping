module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1', // To match Vite's path alias
  },
  // Ignore transform for node_modules except for specific modules if needed
  transformIgnorePatterns: ['/node_modules/(?!lucide-react).+\\.js$'],
};
