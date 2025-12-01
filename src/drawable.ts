import {FrameBuffer} from './framebuffer'
import {Font} from './fonts/font'
import {Gif} from './gif'

export abstract class Drawable {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  update(ts: number) {}
  
  abstract draw(buf: FrameBuffer, offsetX?: number, offsetY?: number): void
  abstract width(): number
}

export class Text extends Drawable {
  font: Font
  #msg: string = ''
  color: number
  align: TextAlign
  length: number

  constructor(font: Font, msg: string, x: number, y: number, color: number = 0xFFFFFF, align: TextAlign = 'left') {
    super(x, y)
    this.font = font
    this.#msg = msg
    this.color = color
    this.align = align
    this.length = font.measure(msg)
  }

  draw(buf: FrameBuffer, offsetX: number = 0, offsetY: number = 0): number {
    let x = offsetX + this.x
    let y = offsetY + this.y

    if (this.align == 'right') {
      x -= this.length
    } else if (this.align == 'center') {
      x -= this.length / 2
    }

    for (let c of this.#msg) {
      const char = this.font.get(c)
      const w = char[0].length

      if (x + w > 0 && x < buf.width) {
        for (let yy = 0; yy < char.length; yy++) {
          let row = char[yy]
          for (let xx = 0; xx < row.length; xx++) {
            let px = row[xx]
            if (px) {
              buf.set(x+xx, y+yy, this.color)
            }
          }
        }
      }

      x += w + 1 // add 1 for a break between characters
    }

    return x
  }

  get msg() {
    return this.#msg
  }

  set msg(v: string) {
    this.#msg = v
    this.length = this.font.measure(v)
  }

  width(): number {
    return this.length
  }
}

export class Img extends Drawable {
  gif: Gif
  timeAtLastFrame: number
  currentFrame: number = 0
  
  constructor(gif: Gif, x: number, y: number) {
    super(x, y)
    this.gif = gif
    this.timeAtLastFrame = 0
  }

  update(ts: number) {
    const frame = this.gif.frames[this.currentFrame]
    if (ts - this.timeAtLastFrame > frame.delay) {
      this.currentFrame = (this.currentFrame + 1) % this.gif.frameCount
      this.timeAtLastFrame = ts
    }
  }
  
  draw(buf: FrameBuffer, offsetX: number = 0, offsetY: number = 0): number {
    const x = this.x + offsetX
    const y = this.y + offsetY
    const frame = this.gif.frames[this.currentFrame]
    
    for (let yy = 0; yy < this.gif.height; yy++) {
      for (let xx = 0; xx < this.gif.width; xx++) {
        buf.set(x+xx, y+yy, frame.get(xx, yy))
      }
    }

    return x + this.gif.width
  }

  width() {
    return this.gif.width
  }
}
