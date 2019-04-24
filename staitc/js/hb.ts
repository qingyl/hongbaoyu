

let _elWidth: number = document.body.offsetWidth
let _elHeight: number = document.body.offsetHeight
let _fontsize: number = _elWidth > 750 ? 1 : _elWidth / 7.5
let random = (min, max) => {
  return Math.round(min + Math.random() * (max - min));
};


class Snows {
  constructor(options) {
    this.options = { ...this.options, ...options }
  }
  public options = {
    images: "",
    flakeCount: 35,
    flakeColor: 'red',
    flakePosition: 'absolute',
    flakeIndex: 10000,
    minSize: 50,
    maxSize: 100,
    minSpeed: 1,
    maxSpeed: 5,
  }

  private nowsArr: Array<Drops> = []
  private inits() {
    for (let i = 0; i < this.options.flakeCount; i += 1) {
      let drops = new Drops(this.options)
      this.nowsArr.push(drops)
    }
  }
  /**
   * start
   */

  private snowTimeout;

  public start() {
    this.clear()
    this.inits()
    this.move()

  }

  private move() {
    for (let item of this.nowsArr) {
      item.updata()
    }
    this.snowTimeout = requestAnimationFrame(() => {
      this.move()
    });
  }
  /**
   * clear
   */
  public clear() {
    this.remove()
    this.nowsArr = [];
    cancelAnimationFrame(this.snowTimeout);
  }
  private remove() {
    var allLi = document.querySelectorAll('.flake_snow')
    for (var a = 0; a < allLi.length; a++) {
      document.body.removeChild(allLi[a])
    }
  }

}

// 红包对象
class Drops {
  constructor(options) {
    this.options = options
    this.resize()
    this.obj = {
      _x: random(1, _elWidth),
      _y: random(1, _elHeight),
      _width: random(this.options.minSize, this.options.maxSize),
      _height: random(this.options.minSize, this.options.maxSize),
      _stepSize: random(1, 10) / 100,
      _speed: random(this.options.minSpeed, this.options.maxSpeed)
    }
   
    this.init()
  }
  private flake;
  private obj;
  private options
  private step: number = 0
  private init() {
    if (this.options.images) {
      this.flake = document.createElement("img");
      this.flake.src = this.options.images
    } else {
      this.flake = document.createElement("div");
      this.flake.style.background = this.options.flakeColor;
      this.flake.style.height = this.obj._height / _fontsize + (_elWidth > 750 ? 'px' : 'rem')
    }
    this.cssfun()
    if (this.options.el) {
      let el = document.getElementById(this.options.el)
      if (el) {
        el.append(this.flake)
      }
    } else {
      document.body.append(this.flake)
    }

    this.flake.addEventListener("click", this.change, false);

  }

  // div或者img 
  private cssfun() {
    this.flake.style.position = this.options.flakePosition;
    this.flake.style.cursor = "pointer";
    this.flake.className = "flake_snow";
    this.flake.style.left = this.obj._x / _fontsize + 'px';
    this.flake.style.top = this.obj._y / _fontsize + "px";
    this.flake.style.width = this.obj._width / _fontsize + (_elWidth > 750 ? 'px' : 'rem')
    this.flake.style.zIndex = this.options.flakeIndex;
  }


  // 红包下下落执行
  updata() {
    this.obj._y += this.obj._speed;
    if (this.obj._y > _elHeight-(_fontsize==1?180:_fontsize)) {
      this.reset()
    }
    this.flake.style.left = this.obj._x + 'px'
    this.step += Number(this.obj._stepSize);
    this.obj._x += Math.cos(this.step)
    if (this.obj._x > (_elWidth) - this.options.minSize || this.obj._x < 0) {
      this.reset();
    }
    this.flake.style.top = this.obj._y + 'px'
  }

  //掉落到底部重置红包的位置
  private reset() {
    this.obj._y = 0;
    this.obj._x = random(0, _elWidth - this.options.maxSize);
    this.obj._stepSize = random(1, 10) / 100
    this.obj._speed = random(this.options.minSpeed, this.options.maxSpeed);
  }

  // 监听容器窗口变化重新获取容器窗口大小
  private resize() {
  
    window.addEventListener("resize",  ()=> {
      _elWidth = document.body.offsetWidth
      _elHeight = document.body.offsetHeight
      _fontsize = _elWidth > 750 ? 1 : _elWidth / 7.5
      this.cssfun()
    }, false)
  }

  // 红包点击触发事件 
  private change() {
    if (window['SnowsClick']) {
      let ins: any = (<any>window).SnowsClick();
    }
  }
}