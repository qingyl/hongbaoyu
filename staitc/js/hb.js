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
var _elWidth = document.body.offsetWidth;
var _elHeight = document.body.offsetHeight;
var _fontsize = _elWidth > 750 ? 1 : _elWidth / 7.5;
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
            el: ''
        };
        this.nowsArr = [];
        this.options = __assign({}, this.options, options);
    }
    Snows.prototype.inits = function () {
        for (var i = 0; i < this.options.flakeCount; i += 1) {
            var drops = new Drops(this.options);
            this.nowsArr.push(drops);
        }
    };
    Snows.prototype.start = function () {
        this.clear();
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
        this.remove();
        this.nowsArr = [];
        cancelAnimationFrame(this.snowTimeout);
    };
    Snows.prototype.remove = function () {
        var allLi = document.querySelectorAll('.flake_snow');
        for (var a = 0; a < allLi.length; a++) {
            var el = document.getElementById(this.options.el);
            if (el) {
                el.removeChild(allLi[a]);
            }
            else {
                document.body.removeChild(allLi[a]);
            }
        }
    };
    return Snows;
}());
// 红包对象
var Drops = /** @class */ (function () {
    function Drops(options) {
        this.step = 0;
        this.options = options;
        this.resize();
        this.obj = {
            _x: random(1, _elWidth),
            _y: random(1, _elHeight),
            _width: random(this.options.minSize, this.options.maxSize),
            _height: random(this.options.minSize, this.options.maxSize),
            _stepSize: random(1, 10) / 100,
            _speed: random(this.options.minSpeed, this.options.maxSpeed)
        };
        this.init();
    }
    Drops.prototype.init = function () {
        if (this.options.images) {
            this.flake = document.createElement("img");
            this.flake.src = this.options.images;
        }
        else {
            this.flake = document.createElement("div");
            this.flake.style.background = this.options.flakeColor;
            this.flake.style.height = this.obj._height / _fontsize + (_elWidth > 750 ? 'px' : 'rem');
        }
        this.cssfun();
        if (this.options.el) {
            var el = document.getElementById(this.options.el);
            if (el) {
                el.append(this.flake);
            }
        }
        else {
            document.body.append(this.flake);
        }
        this.flake.addEventListener("click", this.change, false);
    };
    // div或者img 
    Drops.prototype.cssfun = function () {
        this.flake.style.position = this.options.flakePosition;
        this.flake.style.cursor = "pointer";
        this.flake.className = "flake_snow";
        this.flake.style.left = this.obj._x / _fontsize + 'px';
        this.flake.style.top = this.obj._y / _fontsize + "px";
        this.flake.style.width = this.obj._width / _fontsize + (_elWidth > 750 ? 'px' : 'rem');
        this.flake.style.zIndex = this.options.flakeIndex;
    };
    // 红包下下落执行
    Drops.prototype.updata = function () {
        this.obj._y += this.obj._speed;
        if (this.obj._y > _elHeight - (_fontsize == 1 ? 180 : _fontsize)) {
            this.reset();
        }
        this.flake.style.left = this.obj._x + 'px';
        this.step += Number(this.obj._stepSize);
        this.obj._x += Math.cos(this.step);
        if (this.obj._x > (_elWidth) - this.options.minSize || this.obj._x < 0) {
            this.reset();
        }
        this.flake.style.top = this.obj._y + 'px';
    };
    //掉落到底部重置红包的位置
    Drops.prototype.reset = function () {
        this.obj._y = 0;
        this.obj._x = random(0, _elWidth - this.options.maxSize);
        this.obj._stepSize = random(1, 10) / 100;
        this.obj._speed = random(this.options.minSpeed, this.options.maxSpeed);
    };
    // 监听容器窗口变化重新获取容器窗口大小
    Drops.prototype.resize = function () {
        var _this = this;
        window.addEventListener("resize", function () {
            _elWidth = document.body.offsetWidth;
            _elHeight = document.body.offsetHeight;
            _fontsize = _elWidth > 750 ? 1 : _elWidth / 7.5;
            _this.cssfun();
        }, false);
    };
    // 红包点击触发事件 
    Drops.prototype.change = function () {
        if (window['SnowsClick']) {
            var ins = window.SnowsClick();
        }
    };
    return Drops;
}());
