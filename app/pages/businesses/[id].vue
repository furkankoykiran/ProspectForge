<script setup lang="ts">
import type { Business } from '#shared/types/business'

const route = useRoute()
const id = Number(route.params.id)

const business = ref<Business | null>(null)
const notFound = ref(false)

async function load() {
  try {
    business.value = await $fetch<Business>(`/api/businesses/${id}`)
  } catch {
    notFound.value = true
  }
}

function handleUpdated(updated: Business) {
  business.value = updated
}

onMounted(load)
</script>

<template>
  <div class="max-w-4xl space-y-6">
    <NuxtLink
      to="/businesses"
      class="inline-flex items-center gap-2 -ml-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/60 transition cursor-pointer"
    >
      <AppIcon name="arrow-left" class="w-4 h-4" />
      İşletmelere dön
    </NuxtLink>

    <p v-if="notFound" class="text-zinc-500">İşletme bulunamadı.</p>
    <BusinessDetail
      v-else-if="business"
      :business="business"
      @processed="handleUpdated"
      @status-changed="handleUpdated"
    />
  </div>
</template>
