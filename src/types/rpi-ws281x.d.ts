declare module 'rpi-ws281x'

interface StripConfig {
  leds: number,
  dma?: number,
  brightness: number,
  gpio: number,
  type: 'rgb'|'rbg'|'grb'|'gbr'|'bgr'|'brg'
}

interface MatrixConfig {
  width: number,
  height: number,
  map: 'matrix' | 'alternating-matrix',
  dma: number,
  brightness: number,
  gpio: number,
  type: 'rgb'|'rbg'|'grb'|'gbr'|'bgr'|'brg'
}

declare function render(pixels: Uint32Array): void
declare function configure(options: StripConfig | MatrixConfig): void
declare function reset(): void
declare function sleep(ms: number): void
