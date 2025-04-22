interface AlertDialogOptions {
  title: string
  description: string
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  onCancel: () => void
}

export function useAlertDialog() {
  const isOpen = useState('alert-dialog-is-open', () => false)
  const currentDialog = useState<AlertDialogOptions | null>(
    'alert-dialog-current',
    () => null
  )

  const open = (options: AlertDialogOptions) => {
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
