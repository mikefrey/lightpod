import {FrameBuffer} from './framebuffer'

const second = 1000

export abstract class App {
  abstract update(ts: number, data: any): void
  abstract draw(buf: FrameBuffer): void
}

export abstract class Job {
  abstract async run(): Promise<any>
}

interface JobEntry {
  job: Job
  interval: number
  data?: any
  timeout?: NodeJS.Timeout
}

interface AppEntry {
  name: string
  app: App
  job?: string
  duration: number
}

export class AppManager {
  #jobs: {[name:string]: JobEntry}
  #apps: AppEntry[]
  activeApp: number = 0
  nextApp: number = -1
  viewStart: number
  yOffset: number = 0

  constructor() {
    this.#jobs = {}
    this.#apps = []
    this.viewStart = Date.now()
  }

  addJob(name: string, job: Job, interval: number) {
    this.#jobs[name] = {job, interval}
  }

  addApp(name: string, app: App, job?: string, duration?: number) {
    duration = duration || 10 * second
    this.#apps.push({name, app, job, duration})
  }

  startJobs() {
    const run = async (ent: JobEntry) => {
      ent.timeout = setTimeout(() => run(ent), ent.interval)
      const data = await ent.job.run()
      ent.data = data
    }

    Object.values(this.#jobs).forEach(ent => run(ent))
  }

  stopJobs() {
    Object.values(this.#jobs).forEach(ent => ent.timeout && clearTimeout(ent.timeout))
  }

  update(ts: number) {
    if (this.nextApp > -1) {
      const next = this.#apps[this.nextApp]
      this.updateApp(ts, next)

      this.yOffset = Math.floor((ts - this.viewStart) / second * 8)

      if (ts - this.viewStart > second) {
        this.viewStart = ts
        this.activeApp = this.nextApp
        this.nextApp = -1
        this.yOffset = 0
      }
    }

    let entry = this.#apps[this.activeApp]
    this.updateApp(ts, entry)

    if (ts - this.viewStart > entry.duration) {
      this.nextApp = (this.activeApp + 1) % this.#apps.length
      this.viewStart = ts
    }
  }

  updateApp(ts: number, entry: AppEntry) {
    let data: any = {}
    if (entry.job) {
      const jobEntry = this.#jobs[entry.job]
      if (!jobEntry) {
        console.log(`job entry '${entry.job}' missing`)
      }
      data = jobEntry.data
    }
    entry.app.update(ts, data)
  }

  draw(buf: FrameBuffer) {
    buf.setTransform(0, this.yOffset)
    const entry = this.#apps[this.activeApp]
    entry?.app.draw(buf)

    buf.setTransform(0, this.yOffset - 8)
    const next = this.#apps[this.nextApp]
    next?.app.draw(buf)
  }
}