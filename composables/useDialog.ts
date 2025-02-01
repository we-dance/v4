import { ref } from 'vue'

interface DialogOptions {
  component: string
  props?: Record<string, any>
}

export function useDialog() {
  const isOpen = useState('dialog-is-open', () => false)
  const currentDialog = useState<DialogOptions | null>(
    'dialog-current',
    () => null
  )

  const open = (options: DialogOptions) => {
    currentDialog.value = options
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
    currentDialog.value = null
  }

  return {
    isOpen,
    currentDialog,
    open,
    close,
  }
}
