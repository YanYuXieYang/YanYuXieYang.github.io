//气泡球class
class Bubble {
  constructor(x, y) {
    if (0 === arguments.length) {
      this.init()
    }
    else {
      this.init(x, y)
    }
  }
  init (x, y) {//初始化，overload重载
    if (0 === arguments.length) {
      this.x = this.random(0, w)
      this.y = this.random(0, h)
    }
    else {
      this.x = x
      this.y = y
    }

    this.r = this.random(3, 12)//半径
    this.color = ("#" + Math.floor(Math.random() * 0xffffff).toString(16))//随机颜色值

    this.vx = this.random(-1, 1)//坐标移动的offset
    this.vy = this.random(-1, 1)

    //在四边生成的小球能完全显示
    this.x = this.x - this.r < 0 ? this.r : this.x
    this.x = this.x + this.r > w ? w - this.r : this.x
    this.y = this.y - this.r < 0 ? this.r : this.y
    this.y = this.y + this.r > h ? h - this.r : this.y
  }

  random (min, max) {//生成[min, max]之间的随机数. Math.random()取值[0,1]
    return Math.random() * (max - min) + min
  }
  move () {//移动
    this.x += this.vx
    this.y += this.vy
  }

  collisionRebound () {//碰边反弹
    if (this.x - this.r < 0 || this.x + this.r > w) {
      this.vx = -this.vx
    }
    if (this.y - this.r < 0 || this.y + this.r > h) {
      this.vy = -this.vy
    }
  }
  draw () {//绘制
    conT.beginPath()//开始一条路径，或重置当前的路径
    conT.fillStyle = this.color
    conT.arc(this.x, this.y, this.r, 0, 2 * Math.PI)//创建路径.圆心坐标,起始角和结束角
    conT.fill()//绘制圆弧路径
  }
}