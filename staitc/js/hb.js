"use strict";
var Hb = /** @class */ (function () {
    function Hb(options) {
        this.options = options;
    }
    /**
     * start
     */
    Hb.prototype.start = function () {
        console.log('tag', requestAnimationFrame);
        this.clear();
    };
    /**
     * clear
     */
    Hb.prototype.clear = function () {
        var _this = this;
        console.log(111);
        requestAnimationFrame(function () {
            _this.clear();
        });
    };
    return Hb;
}());
var drops = /** @class */ (function () {
    function drops(x, y) {
    }
    return drops;
}());
