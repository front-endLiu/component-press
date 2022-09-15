import { debounce } from './debounce';

class Color {
  constructor(min) {
    this.min = min || 0;
    this._init(this.min);
  }
  _init(min) {
    this.r = this.colorValue(min);
    this.g = this.colorValue(min);
    this.b = this.colorValue(min);
    this.style = this.createColorStyle(this.r, this.g, this.b);
  }
  colorValue(min) {
    return Math.floor(Math.random() * 255 + min);
  }
  createColorStyle(r, g, b) {
    return `rgba(${r}, ${g}, ${b}, .8)`;
  }
}
class Dot {
  constructor(ctx, canvasWidth, canvasHeight, x, y) {
    this.ctx = ctx;
    this.x = x || Math.random() * canvasWidth;
    this.y = y || Math.random() * canvasHeight;
    this._init();
  }
  _init() {
    this.vx = -0.5 + Math.random();
    this.vy = -0.5 + Math.random();
    this.radius = Math.random() * 1.5;
    this.color = new Color();
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color.style;
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
  }
}
class ParticleLine {
  constructor(canvas, options) {
    this.canvas = canvas;
    this.options = options;
    this.init();
  }
  init() {
    const ctx = this.canvas.getContext('2d');
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    this.canvas.style.zIndex = 9;
    this.canvas.style.position = 'absolute';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.top = 0;
    this.canvas.height = height;
    this.canvas.width = width;
    ctx.lineWidth = (this.options && this.options.lineWidth) || 0.3;
    ctx.strokeStyle = new Color(150).style;
    const number = Math.floor((width * height) / 12000);
    this.dots = {
      nb: number,
      distance: (this.options && this.options.dotsDistance) || 100,
      array: [],
    };
    this.ctx = ctx;
    this.color = new Color();

    this.createDots(this.ctx, width, height);
    this.animateDots();
    this.hoverEffect();
    window.addEventListener(
      'resize',
      debounce(() => this.resize(), 300)
    );
  }
  hoverEffect() {
    if (this.options && this.options.hoverEffect) {
      this.canvas.addEventListener('mousemove', e => {
        if (this.dots.array.length > this.dots.nb) {
          this.dots.array.pop();
        }
        this.dots.array.push(
          new Dot(this.ctx, this.canvas.width, this.canvas.height, e.pageX, e.pageY)
        );
      });
    }
  }
  resize() {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    this.canvas.width = width;
    this.canvas.height = height;
    this.createDots(this.ctx, width, height);
    console.log('resize');
  }
  mixComponents(comp1, weight1, comp2, weight2) {
    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
  }
  averageColorStyles(dot1, dot2) {
    const color1 = dot1.color;
    const color2 = dot2.color;
    const r = this.mixComponents(color1.r, dot1.radius, color2.r, dot2.radius);
    const g = this.mixComponents(color1.g, dot1.radius, color2.g, dot2.radius);
    const b = this.mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
    return this.color.createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
  }
  createDots(ctx, canvasWidth, canvasHeight) {
    this.dots.array = [];
    for (let i = 0; i < this.dots.nb; i++) {
      this.dots.array.push(new Dot(ctx, canvasWidth, canvasHeight));
    }
  }
  moveDots() {
    for (let i = 0; i < this.dots.nb; i++) {
      const dot = this.dots.array[i];
      if (dot.y < 0 || dot.y > this.canvas.height) {
        dot.vx = dot.vx; // eslint-disable-line
        dot.vy = -dot.vy;
      } else if (dot.x < 0 || dot.x > this.canvas.width) {
        dot.vx = -dot.vx;
        dot.vy = dot.vy; // eslint-disable-line
      }
      dot.x += dot.vx;
      dot.y += dot.vy;
    }
  }
  connectDots() {
    for (let i = 0; i < this.dots.array.length; i++) {
      for (let j = 0; j < this.dots.array.length; j++) {
        const iDot = this.dots.array[i];
        const jDot = this.dots.array[j];
        if (
          iDot.x - jDot.x < this.dots.distance &&
          iDot.y - jDot.y < this.dots.distance &&
          iDot.x - jDot.x > -this.dots.distance &&
          iDot.y - jDot.y > -this.dots.distance
        ) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = this.averageColorStyles(iDot, jDot);
          this.ctx.moveTo(iDot.x, iDot.y);
          this.ctx.lineTo(jDot.x, jDot.y);
          this.ctx.stroke();
          this.ctx.closePath();
        }
      }
    }
  }
  drawDots() {
    for (let i = 0; i < this.dots.array.length; i++) {
      const dot = this.dots.array[i];
      dot.draw();
    }
  }
  animateDots() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawDots();
    this.connectDots();
    this.moveDots();
    requestAnimationFrame(this.animateDots.bind(this));
  }
}

export default ParticleLine;
