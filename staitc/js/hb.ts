

let elWidth: number = document.body.offsetWidth
let elHeight: number = document.body.offsetHeight
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
      let obj = {
        _x: random(1, elWidth),
        _y: random(1, elHeight),
        _width: random(this.options.minSize, this.options.maxSize),
        _height: random(this.options.minSize, this.options.maxSize),
        _stepSize: random(1, 10) / 100,
        _speed: random(this.options.minSpeed, this.options.maxSpeed)
      }
      let drops = new Drops(this.options, obj)
      this.nowsArr.push(drops)
    }
  }
  /**
   * start
   */

  private snowTimeout;

  public start() {
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
    requestAnimationFrame(() => {
      this.clear()
    })
  }
}

class Drops {
  constructor(options, obj) {
    this.options = options
    this.obj = obj
    this.init()
  }
  private flake
  private obj;
  private options
  private step: number = 0
  // private options:Object;
  private init() {
    if (this.options.images) {
      this.flake = document.createElement("img");
      this.flake.src = this.options.images
    } else {
      this.flake = document.createElement("div");
      this.flake.style.background = this.options.flakeColor;
      this.flake.style.height = this.obj._height + 'px'
    }
    this.cssfun()
    document.body.append(this.flake)
    this.flake.addEventListener("click", this.change, false);

  }
  private cssfun() {
    this.flake.style.position = this.options.flakePosition;
    this.flake.style.cursor = "pointer";
    this.flake.className = "flake_snow";
    this.flake.style.left = this.obj._x + 'px';
    this.flake.style.top = this.obj._y + "px";
    this.flake.style.width = this.obj._width + 'px';
    this.flake.style.zIndex = this.options.flakeIndex;
  }

  updata() {
    this.obj._y += this.obj._speed;
    if (this.obj._y > elHeight - this.options.maxSize * 2 + this.options.minSize) {
      this.reset()
    }
    this.flake.style.left = this.obj._x + 'px'
    this.step += Number(this.obj._stepSize);
    this.obj._x += Math.cos(this.step)
    if (this.obj._x > (elWidth) - this.options.minSize || this.obj._x < 0) {
      this.reset();
    }
    this.flake.style.top = this.obj._y + 'px'
  }

  private reset() {
    this.obj._y = 0;
    this.obj._x = random(0, elWidth - this.options.maxSize);
    this.obj._stepSize = random(1, 10) / 100
    this.obj._speed = random(this.options.minSpeed, this.options.maxSpeed);
  }
  private change() {
    if (window['SnowsClick']) {
      let ins: any = (<any>window).SnowsClick();
    }
  }
}