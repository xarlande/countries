export const useCurrency = () => {
  const getExchangeRates = (baseCurrency: string = 'USD') => {
    return useFetch<{ rates: Record<string, number>, base: string, date: string }>(
      `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`,
      { key: `rates-${baseCurrency}` }
    )
  }

  return {
    getExchangeRates
  }
}
