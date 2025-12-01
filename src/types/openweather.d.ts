interface OpenWeatherData {
  current: OWCurrentConditions
  hourly: OWHourlyForecast[]
  daily: OWDailyForecast[]
}

interface OWConditionCodes {
  id: number
  main: string
  description: string
  icon: string
}

interface OWCurrentConditions {
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: OWConditionCodes[]
}

interface OWHourlyForecast {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  clouds: number
  wind_speed: number
  wind_deg: number
  weather: OWConditionCodes[]
}

interface OWDailyForecast {
  dt: number
  sunrise: number
  sunset: number
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  feels_like: {
    day: number
    night: number
    eve: number
    morn: number
  }
  pressure: number
  humidity: number
  dew_point: number
  clouds: number
  uvi: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: OWConditionCodes[]
}
