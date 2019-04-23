"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var elWidth = document.body.offsetWidth;
var elHeight = document.body.offsetHeight;
var random = function (min, max) {
    return Math.round(min + Math.random() * (max - min));
};
var Snows = /** @class */ (function () {
    function Snows(options) {
        this.options = {
            images: "",
            flakeCount: 35,
            flakeColor: 'red',
            flakePosition: 'absolute',
            flakeIndex: 10000,
            minSize: 50,
            maxSize: 100,
            minSpeed: 1,
            maxSpeed: 5,
        };
        this.nowsArr = [];
        this.options = __assign({}, this.options, options);
    }
    Snows.prototype.inits = function () {
        for (var i = 0; i < this.options.flakeCount; i += 1) {
            var obj = {
                _x: random(1, elWidth),
                _y: random(1, elHeight),
                _width: random(this.options.minSize, this.options.maxSize),
                _height: random(this.options.minSize, this.options.maxSize),
                _stepSize: random(1, 10) / 100,
                _speed: random(this.options.minSpeed, this.options.maxSpeed)
            };
            var drops = new Drops(this.options, obj);
            this.nowsArr.push(drops);
        }
    };
    Snows.prototype.start = function () {
        this.inits();
        this.move();
    };
    Snows.prototype.move = function () {
        var _this = this;
        for (var _i = 0, _a = this.nowsArr; _i < _a.length; _i++) {
            var item = _a[_i];
            item.updata();
        }
        this.snowTimeout = requestAnimationFrame(function () {
            _this.move();
        });
    };
    /**
     * clear
     */
    Snows.prototype.clear = function () {
        var _this = this;
        requestAnimationFrame(function () {
            _this.clear();
        });
    };
    return Snows;
}());
var Drops = /** @class */ (function () {
    function Drops(options, obj) {
        this.step = 0;
        this.options = options;
        this.obj = obj;
        this.init();
    }
    // private options:Object;
    Drops.prototype.init = function () {
        if (this.options.images) {
            this.flake = document.createElement("img");
            this.flake.src = this.options.images;
        }
        else {
            this.flake = document.createElement("div");
            this.flake.style.background = this.options.flakeColor;
            this.flake.style.height = this.obj._height + 'px';
        }
        this.cssfun();
        document.body.append(this.flake);
        this.flake.addEventListener("click", this.change, false);
    };
    Drops.prototype.cssfun = function () {
        this.flake.style.position = this.options.flakePosition;
        this.flake.style.cursor = "pointer";
        this.flake.className = "flake_snow";
        this.flake.style.left = this.obj._x + 'px';
        this.flake.style.top = this.obj._y + "px";
        this.flake.style.width = this.obj._width + 'px';
        this.flake.style.zIndex = this.options.flakeIndex;
    };
    Drops.prototype.updata = function () {
        this.obj._y += this.obj._speed;
        if (this.obj._y > elHeight - this.options.maxSize * 2 + this.options.minSize) {
            this.reset();
        }
        this.flake.style.left = this.obj._x + 'px';
        this.step += Number(this.obj._stepSize);
        this.obj._x += Math.cos(this.step);
        if (this.obj._x > (elWidth) - this.options.minSize || this.obj._x < 0) {
            this.reset();
        }
        this.flake.style.top = this.obj._y + 'px';
    };
    Drops.prototype.reset = function () {
        this.obj._y = 0;
        this.obj._x = random(0, elWidth - this.options.maxSize);
        this.obj._stepSize = random(1, 10) / 100;
        this.obj._speed = random(this.options.minSpeed, this.options.maxSpeed);
    };
    Drops.prototype.change = function () {
        if (window['SnowsClick']) {
            var ins = window.SnowsClick();
        }
    };
    return Drops;
}());
