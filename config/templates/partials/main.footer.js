;

mainConfig["callback"] = function () {
        "use strict";
        requirejs(["bootstrap"], function () {

        });
    };

requirejs.config(mainConfig);