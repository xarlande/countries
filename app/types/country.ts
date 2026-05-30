export interface Country {
  name: {
    common: string
    official: string
    nativeName?: Record<string, { official: string, common: string }>
  }
  cca2: string
  cca3: string
  currencies?: Record<string, { name: string, symbol: string }>
  capital?: string[]
  region: string
  subregion?: string
  languages?: Record<string, string>
  latlng: [number, number]
  area: number
  population: number
  flags: {
    png: string
    svg: string
    alt?: string
  }
  maps: {
    googleMaps: string
    openStreetMaps: string
  }
}
