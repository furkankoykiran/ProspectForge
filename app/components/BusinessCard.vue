<script setup lang="ts">
import type { Business } from '#shared/types/business'

const props = defineProps<{ business: Business }>()
const emit = defineEmits<{ select: [id: number]; remove: [id: number] }>()

const { confirmDialog } = useConfirm()

async function handleRemove() {
  const ok = await confirmDialog('Bu işletmeyi listeden kaldırmak istediğine emin misin?', {
    confirmText: 'Kaldır',
    danger: true,
  })
  if (ok) emit('remove', props.business.id)
}
</script>

<template>
  <div
    class="group relative flex gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors cursor-pointer"
    @click="emit('select', business.id)"
  >
    <button
      type="button"
      class="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-lg text-zinc-600 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400 transition cursor-pointer"
      title="Listeden kaldır"
      @click.stop="handleRemove"
    >
      <AppIcon name="close" class="w-4 h-4" />
    </button>

    <div class="w-12 h-12 shrink-0 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
      <AppIcon :name="categoryIconName(business.category)" class="w-6 h-6" />
    </div>

    <div class="flex-1 min-w-0 pr-8">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="font-semibold text-zinc-100 text-base truncate">{{ business.name }}</p>
          <p class="text-sm text-amber-400 font-medium mt-0.5">{{ categoryLabel(business.category) }}</p>
        </div>
        <div class="shrink-0 flex items-center gap-2">
          <span
            v-if="!business.website_url"
            class="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full font-semibold bg-amber-500 text-zinc-950"
          >
            <AppIcon name="globe" class="w-3 h-3" /> Fırsat
          </span>
          <span class="text-[11px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap" :class="STATUS_BADGE_CLASSES[business.status]">
            {{ STATUS_LABELS[business.status] }}
          </span>
        </div>
      </div>

      <p class="text-sm text-zinc-500 mt-2 truncate">{{ business.address }}</p>

      <div class="flex items-center gap-4 mt-3 pt-3 border-t border-zinc-800 text-xs text-zinc-500">
        <span v-if="business.rating" class="flex items-center gap-1 text-zinc-300">
          <AppIcon name="star" class="w-3.5 h-3.5 text-amber-400" />
          {{ business.rating }}
          <span class="text-zinc-500">({{ business.review_count }})</span>
        </span>
        <span v-else class="text-zinc-600">Puan yok</span>

        <a
          v-if="business.website_url"
          :href="business.website_url"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-1 hover:text-amber-400 transition cursor-pointer"
          @click.stop
        >
          <AppIcon name="globe" class="w-3.5 h-3.5" /> Site
        </a>

        <a
          v-if="business.phone"
          :href="`tel:${business.phone}`"
          class="flex items-center gap-1 hover:text-amber-400 transition cursor-pointer"
          @click.stop
        >
          <AppIcon name="phone" class="w-3.5 h-3.5" /> {{ business.phone }}
        </a>

        <a
          :href="googleMapsUrl(business)"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-1 hover:text-amber-400 transition cursor-pointer ml-auto"
          @click.stop
        >
          <AppIcon name="pin" class="w-3.5 h-3.5" /> Haritada gör
        </a>
      </div>
    </div>
  </div>
</template>
