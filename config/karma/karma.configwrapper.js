module.exports = {"basePath":"","frameworks":["jasmine","requirejs"],"files":["src/main-test.js",{"pattern":"spec/app/**/*.js","included":false},{"pattern":"src/vendor/**/*.js","included":false,"watched":false},{"pattern":"src/app/**/*.js","included":false,"watched":true},{"pattern":"src/app/views/**/*.html","included":false,"watched":false}],"preprocessors":{"src/app/**/*.js":["coverage"]},"exclude":[],"reporters":["progress","coverage","junit"],"coverageReporter":{"type":"html","dir":"exports/jasmine/coverage/"},"junitReporter":{"outputFile":"exports/jasmine/test-results.xml"},"port":9876,"runnerPort":9100,"colors":true,"autoWatch":true,"browsers":["PhantomJS"],"captureTimeout":60000,"singleRun":false} ;