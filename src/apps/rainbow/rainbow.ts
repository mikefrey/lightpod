import {FrameBuffer} from '../../framebuffer'
import {App} from '../../app'

export class Rainbow extends App {
  offset = -1
  colors = [
    0xFF0000,
    0xFFA500,
    0xFFFF00,
    0x00FF00,
    0x00FFFF,
    0x0000FF,
    0x800080,
    0xFF00FF,
  ]

  update(ts: number) {
    this.offset += 1
    if (this.offset > this.colors.length) {
      this.offset = 0
    }
    // if (this.offset >= 512) {
    //   this.offset = 0
    // }
  }

  draw(buf: FrameBuffer) {
    buf.each((x, y) => {
      // if (y * 64 + x == this.offset) {
      //   console.log(x, y)
      //   return 0xFF0000
      // }
      // return 0
      const i = (y + this.offset) % 8
      return this.colors[i]
    })
  }
}
