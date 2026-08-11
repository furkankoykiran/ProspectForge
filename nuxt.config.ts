import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/eslint',
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'ProspectForge',
      // Pages that set their own title render as "<page> · ProspectForge";
      // pages that don't fall back to the bare product name above.
      titleTemplate: title => (title ? `${title} · ProspectForge` : 'ProspectForge'),
      htmlAttrs: { lang: 'tr' },
      meta: [
        { name: 'theme-color', content: '#09090b' },
        {
          name: 'description',
          content: 'AI-assisted local business prospecting and sales-preparation toolkit.',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' },
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      googleMapsBrowserKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY || '',
    },
  },

  image: {
    quality: 80,
    format: ['webp'],
  },
})
