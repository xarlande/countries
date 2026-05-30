<script setup lang="ts">
const props = defineProps<{
  city: string
}>()

const { getWeatherByCity } = useWeather()
const { data: weather, pending, error } = await getWeatherByCity(props.city)
</script>

<template>
  <div v-if="error" class="text-xs text-red-500 p-2 bg-red-50 dark:bg-red-900/10 rounded">
    Не вдалося завантажити погоду. Перевірте API ключ.
  </div>

  <div v-else-if="pending" class="animate-pulse space-y-3">
    <div class="h-10 bg-gray-200 dark:bg-gray-800 rounded" />
    <div class="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
  </div>

  <div v-else-if="weather" class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <img
          v-if="weather.weather[0]"
          :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
          :alt="weather.weather[0].description"
          class="w-12 h-12"
        >
        <div>
          <p class="text-2xl font-bold">{{ Math.round(weather.main.temp) }}°C</p>
          <p class="text-sm text-gray-500 capitalize">{{ weather.weather[0]?.description }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2 text-xs">
      <div class="p-2 bg-white/50 dark:bg-black/20 rounded">
        <p class="text-gray-500 mb-1">Відчувається як</p>
        <p class="font-semibold">{{ Math.round(weather.main.feels_like) }}°C</p>
      </div>
      <div class="p-2 bg-white/50 dark:bg-black/20 rounded">
        <p class="text-gray-500 mb-1">Вологість</p>
        <p class="font-semibold">{{ weather.main.humidity }}%</p>
      </div>
      <div class="p-2 bg-white/50 dark:bg-black/20 rounded">
        <p class="text-gray-500 mb-1">Вітер</p>
        <p class="font-semibold">{{ weather.wind.speed }} м/с</p>
      </div>
      <div class="p-2 bg-white/50 dark:bg-black/20 rounded">
        <p class="text-gray-500 mb-1">Тиск</p>
        <p class="font-semibold">{{ weather.main.pressure }} hPa</p>
      </div>
    </div>
  </div>
</template>
