export * from './canvas'

export * from './RAF'

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function setTime(time: Date) {
  return new Date(time.getFullYear(), time.getMonth(), time.getDate(), 0, 0, 0, 0)
}

export function getHMS(_date?: Date) {
  const date = _date || new Date()
  const localeTimeString = date.toLocaleTimeString()
  const [hours, minutes, seconds] = localeTimeString.split(':')

  return [hours, minutes, seconds]
}

export class Flip {
  start: { [key: string]: [number, number] } = {}
  end: { [key: string]: [number, number] } = {}

  constructor(public container: HTMLElement) {
    const { children } = container

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement
      const { top, left } = child.getBoundingClientRect()
      const key = child.dataset.key!

      this.start[key] = [top, left] // 记录开始位置
    }
  }

  _raf(cb: () => void) {
    requestAnimationFrame(() => {
      requestAnimationFrame(cb)
    })
  }

  play(doms: any[]) {
    // 算出结束位置
    const { children } = this.container
    for (let i = 0; i < doms.length; i++) {
      const child = children[i] as HTMLElement
      const { top, left } = child.getBoundingClientRect() // 结束位置
      const key = doms[i]!
      const [startTop, startLeft] = this.start[key]

      child.style.setProperty('transform', `translate(${startLeft - left}px, ${startTop - top}px)`)

      console.log(key, `translate(${startLeft - left}px, ${startTop - top}px)`)
      this._raf(() => {
        child.style.setProperty('transition', 'transform 0.5s')
        child.style.removeProperty('transform')
      })
      this.start[key] = [top, left]
    }
    // 算出位移

    // 开始动画
  }
}
