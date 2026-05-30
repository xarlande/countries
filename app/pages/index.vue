<script setup lang="ts">
const { getAllCountries } = useCountries()
const { data: countries, pending, error } = await getAllCountries()

const search = ref('')
const selectedRegion = ref('Всі')
const regions = ['Всі', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic']

const filteredCountries = computed(() => {
  if (!countries.value) return []

  return countries.value.filter((c) => {
    const matchesSearch = !search.value
      || c.name.common.toLowerCase().includes(search.value.toLowerCase())
      || c.capital?.[0]?.toLowerCase().includes(search.value.toLowerCase())

    const matchesRegion = selectedRegion.value === 'Всі' || c.region === selectedRegion.value

    return matchesSearch && matchesRegion
  })
})

const goToRandomCountry = () => {
  if (!countries.value?.length) return
  const randomIndex = Math.floor(Math.random() * countries.value.length)
  const randomCountry = countries.value[randomIndex]
  navigateTo(`/country/${randomCountry.cca3}`)
}
</script>

<template>
  <UContainer class="py-10">
    <header class="text-center mb-10">
      <h1 class="text-4xl font-bold mb-4">
        Куди полетіти?
      </h1>
      <p class="text-gray-500 dark:text-gray-400">
        Відкрийте для себе наступну подорож
      </p>
    </header>

    <div class="max-w-xl mx-auto mb-6 flex gap-4">
      <UInput
        v-model="search"
        icon="i-lucide-search"
        placeholder="Пошук країни чи столиці..."
        size="xl"
        :loading="pending"
        class="flex-1"
      />
      <UButton
        icon="i-lucide-shuffle"
        size="xl"
        color="neutral"
        variant="subtle"
        title="Вибрати випадкову країну"
        @click="goToRandomCountry"
      />
    </div>

    <div class="flex flex-wrap justify-center gap-2 mb-10">
      <UButton
        v-for="region in regions"
        :key="region"
        :label="region === 'Antarctic' ? 'Антарктика'
          : region === 'Americas' ? 'Америка'
            : region === 'Europe' ? 'Європа'
              : region === 'Africa' ? 'Африка'
                : region === 'Asia' ? 'Азія'
                  : region === 'Oceania' ? 'Океанія' : 'Всі'"
        :variant="selectedRegion === region ? 'solid' : 'ghost'"
        :color="selectedRegion === region ? 'primary' : 'neutral'"
        size="sm"
        @click="selectedRegion = region"
      />
    </div>

    <div
      v-if="error"
      class="text-center py-10"
    >
      <p class="text-red-500">
        Помилка завантаження даних. Спробуйте пізніше.
      </p>
    </div>

    <div
      v-else-if="pending"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="i in 12"
        :key="i"
        class="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"
      />
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <CountryCard
        v-for="country in filteredCountries"
        :key="country.cca3"
        :country="country"
      />
    </div>

    <div
      v-if="!pending && filteredCountries.length === 0"
      class="text-center py-10"
    >
      <p class="text-gray-500">
        Нічого не знайдено за вашим запитом.
      </p>
    </div>
  </UContainer>
</template>
