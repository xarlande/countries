<script setup lang="ts">
import type { Country } from '~/types/country'

defineProps<{
  country: Country
}>()
</script>

<template>
  <ULink
    :to="`/country/${country.cca3}`"
    class="group block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500"
  >
    <div class="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
      <img
        :src="country.flags.svg"
        :alt="country.flags.alt || country.name.common"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      >
    </div>

    <div class="p-4">
      <h3 class="font-bold text-lg mb-2 truncate">{{ country.name.common }}</h3>

      <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
        <p
          v-if="country.capital?.length"
          class="flex items-center gap-2"
        >
          <UIcon
            name="i-lucide-map-pin"
            class="w-4 h-4"
          />
          {{ country.capital[0] }}
        </p>
        <p class="flex items-center gap-2">
          <UIcon
            name="i-lucide-users"
            class="w-4 h-4"
          />
          {{ country.population.toLocaleString() }}
        </p>
        <p class="flex items-center gap-2">
          <UIcon
            name="i-lucide-globe"
            class="w-4 h-4"
          />
          {{ country.region }}
        </p>
      </div>
    </div>
  </ULink>
</template>
