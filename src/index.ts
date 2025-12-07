import ws281x from 'rpi-ws281x'

import {FrameBuffer} from './framebuffer'
import {Surface} from './surface'

import {AppManager} from './app'
import {Calendar} from './apps/calendar/calendar'
import {Rainbow} from './apps/rainbow/rainbow'
import {Weather, WeatherHourly, WeatherJob} from './apps/weather/weather'

import {loadConfig} from './config'

const second = 1000
const minute = 60 * second

class Matrix {
  apps: AppManager
  buffer: FrameBuffer
  config: Config
  surface: Surface

  constructor() {
    const width = 64
    const height = 8
    const brightness = 128 // 0 - 255

    this.surface = new Surface(width, height, brightness)
    this.buffer = new FrameBuffer(width, height)

    const config = this.config = loadConfig('../config.json')

    this.apps = new AppManager()
    // this.apps.addJob('weather', new WeatherJob(config.weather), 5 * minute)

    // this.apps.addApp('weatherHourly', new WeatherHourly(), 'weather')
    // this.apps.addApp('weather', new Weather(), 'weather')
    // this.apps.addApp('calendar', new Calendar(config.calendar))
    this.apps.addApp('rainbow', new Rainbow())
  }

  run() {
    this.apps.startJobs()
    setInterval(() => this.loop(Date.now()), 33)
  }

  loop(ts: number) {
    this.update(ts)
    this.draw()
  }

  update(ts: number) {
    this.apps.update(ts)
  }

  draw() {
    this.buffer.clear()
    this.apps.draw(this.buffer)
    this.surface.draw(this.buffer)
  }
}

const matrix = new Matrix()
matrix.run()

process.on('SIGINT', () => {
  ws281x.render(new Uint32Array(512))
  process.exit()
})
