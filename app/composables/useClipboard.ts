export function useClipboard() {
  const copiedKey = ref<string | null>(null)

  async function copy(text: string, key: string) {
    await navigator.clipboard.writeText(text)
    copiedKey.value = key
    setTimeout(() => {
      if (copiedKey.value === key) copiedKey.value = null
    }, 1500)
  }

  return { copiedKey, copy }
}
