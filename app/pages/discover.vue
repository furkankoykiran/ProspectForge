<script setup lang="ts">
const pinnedCoords = ref<{ lat: number; lng: number } | null>(null)
const radiusMeters = ref(3000)
const category = ref('')
const discovering = ref(false)
const discoverMessage = ref<string | null>(null)

const categoryOptions = categoryOptionsList()

async function discover() {
  discovering.value = true
  discoverMessage.value = null
  try {
    const result = await $fetch<{ count: number; message?: string }>('/api/discover', {
      method: 'POST',
      body: {
        lat: pinnedCoords.value?.lat,
        lng: pinnedCoords.value?.lng,
        radiusMeters: radiusMeters.value,
        category: category.value || undefined,
      },
    })
    if (result.count > 0) {
      await navigateTo('/businesses')
    } else {
      discoverMessage.value = result.message ?? null
    }
  } catch {
    discoverMessage.value = 'Keşif başarısız oldu, tekrar dene.'
  } finally {
    discovering.value = false
  }
}
</script>

<template>
  <div class="h-full flex flex-col gap-4">
    <div>
      <h1 class="text-2xl font-bold text-zinc-100 tracking-tight">Yeni Keşif</h1>
      <p class="text-zinc-500 text-sm mt-0.5">Haritadan bir nokta seç, çevredeki işletmeleri bul.</p>
    </div>

    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col flex-1 min-h-0 gap-4">
      <LocationPicker v-model:coords="pinnedCoords" :radius-meters="radiusMeters" class="flex-1 min-h-0 flex flex-col" />

      <div class="flex items-center gap-3 flex-wrap">
        <div class="relative">
          <select
            v-model.number="radiusMeters"
            class="appearance-none bg-zinc-800/50 border border-zinc-700 rounded-xl pl-3 pr-9 py-2.5 text-sm text-zinc-100 cursor-pointer"
          >
            <option :value="1000">1 km</option>
            <option :value="3000">3 km</option>
            <option :value="5000">5 km</option>
          </select>
          <AppIcon name="chevron-down" class="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div class="relative w-64">
          <select
            v-model="category"
            class="w-full appearance-none bg-zinc-800/50 border border-zinc-700 rounded-xl pl-3 pr-9 py-2.5 text-sm text-zinc-100 cursor-pointer"
          >
            <option value="">Tüm kategoriler</option>
            <option v-for="opt in categoryOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
          <AppIcon name="chevron-down" class="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <button
          type="button"
          class="px-8 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold disabled:opacity-50 transition cursor-pointer disabled:cursor-not-allowed"
          :disabled="discovering || !pinnedCoords"
          @click="discover"
        >
          {{ discovering ? 'Aranıyor…' : 'Keşfet' }}
        </button>

        <p v-if="discoverMessage" class="text-sm text-zinc-400">{{ discoverMessage }}</p>
      </div>
    </div>
  </div>
</template>
