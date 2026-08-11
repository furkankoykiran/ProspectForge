interface ConfirmOptions {
  title?: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
}

const state = reactive({
  visible: false,
  message: '',
  title: 'Emin misin?',
  confirmText: 'Onayla',
  cancelText: 'Vazgeç',
  danger: false,
})

let resolver: ((value: boolean) => void) | null = null

// Singleton state (module scope) so every caller shares one dialog instance,
// mounted once in app.vue, instead of native window.confirm().
export function useConfirm() {
  function confirmDialog(message: string, options: ConfirmOptions = {}): Promise<boolean> {
    state.message = message
    state.title = options.title ?? 'Emin misin?'
    state.confirmText = options.confirmText ?? 'Onayla'
    state.cancelText = options.cancelText ?? 'Vazgeç'
    state.danger = options.danger ?? false
    state.visible = true
    return new Promise((resolve) => {
      resolver = resolve
    })
  }

  function respond(value: boolean) {
    state.visible = false
    resolver?.(value)
    resolver = null
  }

  return { state, confirmDialog, respond }
}
