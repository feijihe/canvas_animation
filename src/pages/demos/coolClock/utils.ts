const GRAVITY = 9.8; const P_RADIUS = 6

const numData = [
  '1111/1001/1001/1001/1001/1001/1111', // 0
  '0001/0001/0001/0001/0001/0001/0001', // 1
  '1111/0001/0001/1111/1000/1000/1111', // 2
  '1111/0001/0001/1111/0001/0001/1111', // 3
  '1001/1001/1001/1111/0001/0001/0001', // 4
  '1111/1000/1000/1111/0001/0001/1111', // 5
  '1111/1000/1000/1111/1001/1001/1111', // 6
  '1111/0001/0001/0001/0001/0001/0001', // 7
  '1111/1001/1001/1111/1001/1001/1111', // 8
  '1111/1001/1001/1111/0001/0001/1111', // 9
  '0000/0000/0010/0000/0010/0000/0000', // :
]

export class Particle {
  vx: number
  vy: number
  x: number
  y: number
  color: string
  visible: boolean
  drop: boolean
  lasetColor = ''
  radius = 0

  constructor(public ctx: CanvasRenderingContext2D, public width: number, public height: number) {
    this.x = 0
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.color = ''
    this.visible = false
    this.drop = false
  }

  public paint() {
    if (this.lasetColor !== this.color) {
      this.ctx.fillStyle = this.color
      this.lasetColor = this.color
    }
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.fill()
  }

  public reset(x: number, y: number, color = '#fff') {
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.color = color
    this.visible = true
    this.drop = false
    this.radius = 0
  }

  public isDrop() {
    this.drop = true
    const vx = Math.random() * 15 + 10
    const vy = Math.random() * 15 + 10
    this.vx = Math.random() > 0.5 ? vx : -vx
    this.vy = vy
  }

  public update(time: number) {
    if (this.drop) {
      this.x += this.vx * time
      this.y += this.vy * time
      this.vy += 0.5

      let vy = this.vy + GRAVITY * time

      if (this.y > this.height - P_RADIUS) {
        this.y = this.height - P_RADIUS
        vy = -vy * 0.8
      }

      this.vy = vy

      if (this.x < -P_RADIUS || this.x > this.width + P_RADIUS || this.y > this.height + P_RADIUS) {
        this.visible = false
      }

      if (this.radius < P_RADIUS) {
        this.radius += 0.5
      }
    }
  }
}

export function drawBackGround(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const XJ = 10 // 圆点间距
  const xjg = 20 // 各个字母之间的距离
  const yjg = 22// 每一栏上下距离
  const diameter = P_RADIUS * 2 // 圆点直径

  let startX = (width - (diameter * 4 + XJ * 3) * 8 + 7 * xjg) / 2

  for (let i = 0; i < 8; i++) {
    let startY = (height - diameter * 7 + yjg * 6) / 2
    for (let j = 0; j < numData[0].length; j++) {
      const item = numData[0][j]
      if (item === '/') {
        startY += yjg
      }
      else {
        const index = j % 5
        const x = startX + index * diameter + (index - 1) * XJ
        const y = startY
        ctx.beginPath()
        console.log(x, y, P_RADIUS)
        ctx.arc(x, y, P_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = '#f0f'
        ctx.fill()
      }
    }
    startX += diameter * 4 + XJ * 3 + xjg
  }
}
