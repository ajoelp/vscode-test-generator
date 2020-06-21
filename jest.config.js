module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // automock: true,
  testPathIgnorePatterns: ["/node_modules/", "/out/"],
//   unmockedModulePathPatterns: [
//     'jest-editor-support/node_modules',
//     'color-convert',
//     'chalk',
//     'snapdragon',
//     'ansi-styles',
//     'core-js',
//     'debug',
//     '@babel/template',
//   ],
};
