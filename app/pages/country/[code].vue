<script setup lang="ts">
const route = useRoute()
const code = route.params.code as string

const { getCountryByCode } = useCountries()
const { data: countries, pending, error } = await getCountryByCode(code)

const country = computed(() => countries.value?.[0])

const breadcrumbs = computed(() => [
  { label: 'Головна', to: '/' },
  { label: country.value?.name.common || 'Країна' }
])
</script>

<template>
  <UContainer class="py-10">
    <UBreadcrumb
      :items="breadcrumbs"
      class="mb-6"
    />

    <div
      v-if="error"
      class="text-center py-10"
    >
      <p class="text-red-500 text-lg">
        Помилка завантаження даних про країну.
      </p>
      <UButton
        to="/"
        class="mt-4"
        variant="ghost"
      >
        Повернутися на головну
      </UButton>
    </div>

    <div
      v-else-if="pending || !country"
      class="space-y-8 animate-pulse"
    >
      <div class="h-12 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 h-96 bg-gray-100 dark:bg-gray-800 rounded-xl" />
        <div class="space-y-6">
          <div class="h-48 bg-gray-100 dark:bg-gray-800 rounded-xl" />
          <div class="h-48 bg-gray-100 dark:bg-gray-800 rounded-xl" />
        </div>
      </div>
    </div>

    <div
      v-else
      class="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-8">
        <section class="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
          <div class="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <img
              :src="country.flags.svg"
              :alt="country.flags.alt || country.name.common"
              class="w-32 h-20 object-cover rounded shadow-sm border border-gray-100 dark:border-gray-800"
            >
            <div>
              <h1 class="text-4xl font-bold mb-2">
                {{ country.name.common }}
              </h1>
              <p class="text-gray-500 dark:text-gray-400 text-lg">
                {{ country.name.official }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p class="text-xs text-gray-500 uppercase font-semibold mb-1">
                Столиця
              </p>
              <p class="font-bold">
                {{ country.capital?.[0] || 'N/A' }}
              </p>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p class="text-xs text-gray-500 uppercase font-semibold mb-1">
                Населення
              </p>
              <p class="font-bold">
                {{ country.population.toLocaleString() }}
              </p>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p class="text-xs text-gray-500 uppercase font-semibold mb-1">
                Регіон
              </p>
              <p class="font-bold">
                {{ country.region }}
              </p>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p class="text-xs text-gray-500 uppercase font-semibold mb-1">
                Валюта
              </p>
              <p class="font-bold">
                {{ Object.values(country.currencies || {})[0]?.name || 'N/A' }}
                ({{ Object.values(country.currencies || {})[0]?.symbol || '' }})
              </p>
            </div>
          </div>

          <div class="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="font-semibold mb-3 flex items-center gap-2">
                <UIcon name="i-lucide-languages" />
                Мови
              </h3>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="lang in Object.values(country.languages || {})"
                  :key="lang"
                  variant="soft"
                >
                  {{ lang }}
                </UBadge>
              </div>
            </div>
            <div>
              <h3 class="font-semibold mb-3 flex items-center gap-2">
                <UIcon name="i-lucide-map" />
                Субрегіон
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                {{ country.subregion || 'N/A' }}
              </p>
            </div>
          </div>

          <!-- Map Section -->
          <div class="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
            <h3 class="font-bold text-xl mb-4 flex items-center justify-between">
              <span class="flex items-center gap-2">
                <UIcon
                  name="i-lucide-map-pinned"
                  class="text-primary-500"
                />
                Карта
              </span>
              <UButton
                :to="country.maps.googleMaps"
                target="_blank"
                size="xs"
                variant="ghost"
                icon="i-lucide-external-link"
              >
                Відкрити в Google Maps
              </UButton>
            </h3>

            <div class="aspect-video w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <iframe
                width="100%"
                height="100%"
                frameborder="0"
                style="border:0"
                :src="`https://www.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&z=4&output=embed`"
                allowfullscreen
              />
            </div>
          </div>
        </section>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Weather Widget -->
        <section class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/20">
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <UIcon name="i-lucide-cloud-sun" />
            Погода в {{ country.capital?.[0] || country.name.common }}
          </h3>
          <WeatherWidget :city="country.capital?.[0] || country.name.common" />
        </section>

        <!-- Currency Widget -->
        <section class="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-100 dark:border-green-900/20">
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-green-700 dark:text-green-300">
            <UIcon name="i-lucide-banknote" />
            Конвертор валют
          </h3>
          <CurrencyConverter :target-currency="Object.keys(country.currencies || {})[0] || 'USD'" />
        </section>
      </div>
    </div>
  </UContainer>
</template>
