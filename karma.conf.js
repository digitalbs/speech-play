var kConfig = require(__dirname + "/config/karma/karma.configwrapper.js");

module.exports = function (config) {
    "use strict";

    kConfig["logLevel"] = config.LOG_INFO;

    config.set(kConfig);
};