import { GifReader } from 'omggif'
declare module 'omggif' {
  interface GifReader {
    width: number
    height: number
    decodeAndBlitFrameRGBA(frame_num: number, pixels: Uint8Array): void
  }
}
