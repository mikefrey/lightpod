import {
  addDays,
  set as dateSet,
  endOfMonth,
  getDay,
  getDaysInYear,
  isSameDay,
  isPast,
  isSaturday,
  isToday,
  startOfToday,
  startOfYear,
} from 'date-fns'

import {FrameBuffer} from '../../framebuffer'
import {App} from '../../app'

enum Colors {
  off = 0x0,
  past = 0xFFFFFF,
  today = 0xFF0000,
  future = 0x777777,
  birthday = 0x00FF00,
  anniversary = 0xFFFF00
}

export class Calendar extends App {
  today = new Date(0)
  dates: ImportantDate[]
  cache = new FrameBuffer(64, 8)

  constructor(cfg: CalendarConfig) {
    super()
    this.dates = cfg.dates
  }

  update(ts: number) {
    const today = startOfToday()
    if (isSameDay(this.today, today)) {
      return
    }

    this.cache.clear()
    this.today = today

    this.dates.forEach(d => d.date = dateSet(new Date(), {month: d.month-1, date: d.day}))

    const start = startOfYear(this.today)
    const count = getDaysInYear(this.today)
    let column = 0
    for (let d = 0; d < count; d++) {
      let day = addDays(start, d)

      let color = Colors.future
      if (isPast(day)) {
        color = Colors.past
      }

      const important = this.dates.find(id => isSameDay(id.date, day))
      if (important) {
        switch (important.type) {
          case 'birthday': color = Colors.birthday; break
          case 'anniversary': color = Colors.anniversary; break
        }
      }

      if (isToday(day)) {
        color = Colors.today
      }

      this.cache.set(column, getDay(day), color)

      if (isSameDay(endOfMonth(day), day)) {
        column += 1
      }
      if (isSaturday(day)) {
        column += 1
      }
    }
  }

  draw(buf: FrameBuffer) {
    buf.each((x, y) => this.cache.get(x, y))
  }
}
