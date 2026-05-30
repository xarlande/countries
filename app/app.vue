<script setup>
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Куди полетіти? — Досліджуй світ'
const description = 'Сервіс для пошуку цікавих країн, перевірки погоди та конвертації валют.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})

const toast = useToast()

const shareSite = async () => {
  const shareData = {
    title: 'Explorer — Досліджуй світ',
    text: 'Крутий сервіс для пошуку країн та планування подорожей!',
    url: window.location.origin
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      await navigator.clipboard.writeText(window.location.origin)
      toast.add({
        title: 'Посилання скопійовано!',
        description: 'Тепер ви можете поділитися ним з друзями.',
        color: 'success'
      })
    }
  } catch (err) {
    console.error('Помилка при спробі поділитися:', err)
  }
}
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink
          to="/"
          class="flex items-center gap-2"
        >
          <AppLogo class="w-auto h-6 shrink-0" />
          <span class="font-bold text-xl hidden sm:inline-block">Explorer</span>
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          icon="i-lucide-share-2"
          aria-label="Share"
          color="neutral"
          variant="ghost"
          @click="shareSite"
        />

        <UButton
          to="https://github.com/xarlande"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-gray-500">
          © {{ new Date().getFullYear() }} •
          <ULink
            to="https://github.com/xarlande"
            target="_blank"
            class="hover:text-primary-500 transition-colors"
          >
            xarlande
          </ULink>
        </p>
      </template>

      <template #right>
        <span class="text-xs text-gray-400">Досліджуй світ разом з нами</span>
      </template>
    </UFooter>
  </UApp>
</template>
