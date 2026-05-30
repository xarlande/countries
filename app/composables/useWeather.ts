import type { Weather } from '~/types/weather'

export const useWeather = () => {
  const config = useRuntimeConfig()
  const apiKey = config.public.openWeatherApiKey

  const getWeatherByCity = (city: string) => {
    if (!apiKey) {
      console.warn('OpenWeather API Key is missing')
      return { data: ref(null), pending: ref(false), error: ref(new Error('API Key missing')) }
    }

    return useFetch<Weather>(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
        lang: 'uk'
      },
      key: `weather-${city}`
    })
  }

  return {
    getWeatherByCity
  }
}
