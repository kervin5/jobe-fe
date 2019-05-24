// const withSass = require('@zeit/next-sass');
// module.exports = {
//     moduleFileExtensions: [
//       "ts",
//       "tsx",
//       "js"
//     ],
//     testMatch: [
//       "**/*.(test|spec).(js|jsx)"
//     ],
//     coveragePathIgnorePatterns: [
//       "/node_modules/",
//       "enzyme.js"
//     ],
//     setupTestFrameworkScriptFile: "<rootDir>/enzyme.js",
//     coverageReporters: [
//       "json",
//       "lcov",
//       "text",
//       "text-summary"
//     ],
//     moduleNameMapper: {
//       "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/mocks.js",
//       "\\.(css|less|scss)$": "<rootDir>/__mocks__/mocks.js"
//     }
//   };

module.exports = {
    
    setupFiles: ['<rootDir>/enzyme.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/mocks.js",
        "\\.(css|less|scss)$": "<rootDir>/__mocks__/mocks.js"
      }
  }

  
