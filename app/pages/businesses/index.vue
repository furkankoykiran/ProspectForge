<script setup lang="ts">
import type { Business, BusinessStatus } from '#shared/types/business'

const businesses = ref<Business[]>([])
const statusFilter = ref<'all' | BusinessStatus>('all')
const categoryFilter = ref<string>('all')
const searchQuery = ref('')

const STATUS_FILTERS: Array<{ value: 'all' | BusinessStatus; label: string }> = [
  { value: 'all', label: 'Tümü' },
  ...(Object.entries(STATUS_LABELS) as Array<[BusinessStatus, string]>).map(([value, label]) => ({ value, label })),
]

const statCounts = computed(() => {
  const counts: Record<BusinessStatus, number> = { discovered: 0, processed: 0, visited: 0, won: 0, lost: 0 }
  for (const b of businesses.value) counts[b.status]++
  return counts
})

const categoryOptions = computed(() => {
  const counts = new Map<string, number>()
  for (const b of businesses.value) {
    const key = b.category ?? '__other__'
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([value, count]) => ({ value, count, label: categoryLabel(value === '__other__' ? null : value) }))
})

const filteredBusinesses = computed(() => {
  return businesses.value.filter((b) => {
    if (statusFilter.value !== 'all' && b.status !== statusFilter.value) return false
    if (categoryFilter.value !== 'all' && (b.category ?? '__other__') !== categoryFilter.value) return false
    if (searchQuery.value && !b.name.toLowerCase().includes(searchQuery.value.toLowerCase())) return false
    return true
  })
})

async function loadBusinesses() {
  businesses.value = await $fetch<Business[]>('/api/businesses')
}

async function handleRemove(id: number) {
  await $fetch(`/api/businesses/${id}`, { method: 'DELETE' })
  businesses.value = businesses.value.filter(b => b.id !== id)
}

onMounted(loadBusinesses)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-zinc-100 tracking-tight">İşletmeler</h1>
        <p class="text-zinc-500 mt-1">{{ businesses.length }} işletme kayıtlı</p>
      </div>
      <NuxtLink
        to="/discover"
        class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-semibold transition"
      >
        + Yeni Keşif
      </NuxtLink>
    </div>

    <div v-if="businesses.length > 0" class="grid grid-cols-5 gap-3">
      <div
        v-for="f in STATUS_FILTERS.slice(1)"
        :key="f.value"
        class="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
      >
        <p class="text-2xl font-bold text-zinc-100">{{ statCounts[f.value as BusinessStatus] }}</p>
        <p class="text-xs text-zinc-500 mt-1">{{ f.label }}</p>
      </div>
    </div>

    <div v-if="businesses.length > 0" class="space-y-3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="İsme göre ara…"
        class="w-full sm:w-96 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50"
      >

      <div class="flex gap-2 flex-wrap">
        <button
          v-for="f in STATUS_FILTERS"
          :key="f.value"
          type="button"
          class="px-3.5 py-1.5 rounded-full border text-sm whitespace-nowrap transition cursor-pointer"
          :class="statusFilter === f.value ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-semibold' : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'"
          @click="statusFilter = f.value"
        >
          {{ f.label }}
        </button>
      </div>

      <div class="flex gap-2 flex-wrap">
        <button
          type="button"
          class="px-3 py-1.5 rounded-full border text-sm whitespace-nowrap transition"
          :class="categoryFilter === 'all' ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-semibold' : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'"
          @click="categoryFilter = 'all'"
        >
          Tüm Türler
        </button>
        <button
          v-for="c in categoryOptions"
          :key="c.value"
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm whitespace-nowrap transition cursor-pointer"
          :class="categoryFilter === c.value ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-semibold' : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'"
          @click="categoryFilter = c.value"
        >
          <AppIcon :name="categoryIconName(c.value === '__other__' ? null : c.value)" class="w-3.5 h-3.5" />
          {{ c.label }} · {{ c.count }}
        </button>
      </div>
    </div>

    <div v-if="businesses.length === 0" class="text-center py-24 text-zinc-500 space-y-3">
      <AppIcon name="search" class="w-10 h-10 mx-auto text-zinc-700" />
      <p>Henüz işletme yok.</p>
      <NuxtLink to="/discover" class="text-amber-400 font-medium hover:underline">İlk keşfi yap →</NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <BusinessCard
        v-for="business in filteredBusinesses"
        :key="business.id"
        :business="business"
        @select="navigateTo(`/businesses/${$event}`)"
        @remove="handleRemove"
      />
    </div>

    <p v-if="businesses.length > 0 && filteredBusinesses.length === 0" class="text-sm text-zinc-500 text-center py-12">
      Filtreye uyan işletme yok.
    </p>
  </div>
</template>
