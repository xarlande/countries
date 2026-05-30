<script setup lang="ts">
const props = defineProps<{
  targetCurrency: string
}>()

const amount = ref(100)
const baseCurrency = ref('UAH')
const availableBases = ['UAH', 'USD', 'EUR']

const { getExchangeRates } = useCurrency()
const { data: exchangeData, pending, error } = await getExchangeRates(baseCurrency.value)

const rate = computed(() => {
  if (!exchangeData.value) return null
  return exchangeData.value.rates[props.targetCurrency] || null
})

const result = computed(() => {
  if (!rate.value) return null
  return (amount.value * rate.value).toFixed(2)
})

watch(baseCurrency, async (newBase) => {
  const { data } = await getExchangeRates(newBase)
  exchangeData.value = data.value
})
</script>

<template>
  <div
    v-if="error"
    class="text-xs text-red-500 p-2"
  >
    Не вдалося завантажити курси валют.
  </div>

  <div
    v-else
    class="space-y-4"
  >
    <div class="flex gap-2">
      <UInput
        v-model="amount"
        type="number"
        size="sm"
        class="flex-1"
        placeholder="Сума"
      />
      <USelect
        v-model="baseCurrency"
        :items="availableBases"
        size="sm"
        class="w-20"
      />
    </div>

    <div
      v-if="pending"
      class="h-10 bg-gray-100 dark:bg-gray-800 animate-pulse rounded"
    />

    <div
      v-else-if="rate"
      class="p-3 bg-white/50 dark:bg-black/20 rounded-lg text-center"
    >
      <p class="text-sm text-gray-500 mb-1">
        {{ amount }} {{ baseCurrency }} =
      </p>
      <p class="text-xl font-bold text-green-600 dark:text-green-400">
        {{ result }} {{ targetCurrency }}
      </p>
      <p class="text-[10px] text-gray-400 mt-2 italic">
        Курс: 1 {{ baseCurrency }} = {{ rate.toFixed(4) }} {{ targetCurrency }}
      </p>
    </div>

    <div
      v-else
      class="text-xs text-gray-500 text-center py-2"
    >
      Курс для {{ targetCurrency }} не знайдено
    </div>
  </div>
</template>
