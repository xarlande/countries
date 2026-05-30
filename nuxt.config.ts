// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: false
  },

  app: {
    rootId: 'app',
    head: {
      meta: [
        { name: 'generator', content: 'World Explorer' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      openWeatherApiKey: '' // Default to empty string, can be overridden by NUXT_PUBLIC_OPEN_WEATHER_API_KEY env var
    }
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
