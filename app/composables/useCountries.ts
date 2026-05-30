import type { Country } from '~/types/country'

export const useCountries = () => {
  const getAllCountries = () => {
    return useFetch<Country[]>('https://restcountries.com/v3.1/all?fields=name,cca2,cca3,flags,population,region,capital,maps')
  }

  const getCountryByCode = (code: string) => {
    return useFetch<Country[]>(`https://restcountries.com/v3.1/alpha/${code}`)
  }

  return {
    getAllCountries,
    getCountryByCode
  }
}
