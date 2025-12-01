import * as fs from 'fs'
import {GifReader, Frame as OmgFrame} from 'omggif'

export class Gif {
  readonly path: string
  readonly width: number
  readonly height: number
  readonly loopCount: number
  readonly frameCount: number
  readonly frames: Frame[]

  constructor(path: string) {
    this.path = path
    const buf = fs.readFileSync(path)
    const img = new GifReader(buf)

    this.width = img.width
    this.height = img.height

    this.loopCount = img.loopCount()
    this.frameCount = img.numFrames()

    const frames = []

    for (let i = 0; i < this.frameCount; i++) {
      const frameInfo = img.frameInfo(i)
      const px = new Uint8Array(img.width*img.height*4)
      img.decodeAndBlitFrameRGBA(i, px)

      frames.push(new Frame(frameInfo, px))
    }

    this.frames = frames
  }
}

export class Frame {
  delay: number
  width: number
  height: number
  pixels: Uint32Array[]

  constructor(frameInfo: OmgFrame, data: Uint8Array) {
    this.delay = frameInfo.delay * 10 // fps to milleseconds
    this.width = frameInfo.width
    this.height = frameInfo.height

    let i = 0

    const pixels: Uint32Array[] = this.pixels = []
    for (let y = 0; y < frameInfo.height; y++) {
      const px = new Uint32Array(frameInfo.width)
      pixels.push(px)
      for (let x = 0; x < frameInfo.width; x++) {
        // const i = y * frameInfo.width * 4 + x * 4
        const r = data[i++]
        const g = data[i++]
        const b = data[i++]
        i++ // burn one for the alpha channel
        px[x] = (r << 16) + (g << 8) + b
      }
    }
  }

  get(x: number, y: number): number {
    return this.pixels[y][x]
  }
}