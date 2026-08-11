<script setup lang="ts">
const { state, respond } = useConfirm()
</script>

<template>
  <Teleport to="body">
    <div v-if="state.visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div class="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-5">
        <div>
          <h3 class="font-semibold text-zinc-100 text-lg">{{ state.title }}</h3>
          <p class="text-sm text-zinc-400 mt-1.5 leading-relaxed">{{ state.message }}</p>
        </div>
        <div class="flex gap-2 justify-end">
          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-zinc-600 hover:bg-zinc-800 transition cursor-pointer"
            @click="respond(false)"
          >
            {{ state.cancelText }}
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer"
            :class="state.danger ? 'bg-red-500 hover:bg-red-400 text-zinc-950' : 'bg-amber-500 hover:bg-amber-400 text-zinc-950'"
            @click="respond(true)"
          >
            {{ state.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
