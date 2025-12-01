import ws281x from 'rpi-ws281x'
import {FrameBuffer} from './framebuffer'

export class Surface {
  width: number
  height: number
  brightness: number
  ledCount: number

  constructor(width: number, height: number, brightness: number) {
    this.width = width
    this.height = height
    this.ledCount = width * height
    this.brightness = brightness

    const config = {
      width: width,
      height: height,
      map: 'matrix',
      dma: 10,
      brightness: brightness, // 0 - 255
      gpio: 18,
      type: 'grb',
    }

    // Configure ws281x
    ws281x.configure(config)
  }

  draw(buf: FrameBuffer) {
    ws281x.render(buf.data)
  }
}
