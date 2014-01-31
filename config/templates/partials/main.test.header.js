/*global requirejs: false*/
(function () {
    "use strict";

    var tests = [];
    for (var file in window.__karma__.files) {
        if (window.__karma__.files.hasOwnProperty(file)) {
            if (/^\/base\/spec\//i.test(file) && /Spec\.js$/.test(file)) {
                tests.push(file);
            }
        }
    }

    function describeEach(description, cases, callback) {
        cases.forEach(function (value) {
            describe(description.replace(/\{value\}/gi, String(value)), function () {
                callback(value);
            });
        });
    }
    window.describeEach = describeEach;

    var mainConfig = 