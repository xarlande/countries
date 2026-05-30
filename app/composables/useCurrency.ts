export const useCurrency = () => {
  const getExchangeRates = (baseCurrency: MaybeRefOrGetter<string> = 'USD') => {
    return useFetch<{ rates: Record<string, number>, base: string, date: string }>(
      () => `https://api.exchangerate-api.com/v4/latest/${toValue(baseCurrency)}`,
      { key: `rates-${toValue(baseCurrency)}` }
    )
  }

  return {
    getExchangeRates
  }
}
