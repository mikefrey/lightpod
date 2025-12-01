interface CalendarConfig {
  dates: ImportantDate[]
}

interface ImportantDate {
  month: number
  day: number
}

interface WeatherConfig {
  url: string
  params: {
    appid: string
    lat: string
    lon: string
    units: string
  }
}

interface NewsConfig {
  url: string
  apiKey: string
  sources: string
}

interface CovidConfig {
  mn: string
  us: string
  world: string
}

interface Config {
  weather: WeatherConfig
  news: NewsConfig
  covid: CovidConfig
  calendar: CalendarConfig
}
