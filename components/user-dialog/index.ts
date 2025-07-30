// Dynamically import all dialog Vue components
const dialogModules = import.meta.glob('./*.vue', { eager: true })

// Create the dialogs object by transforming filenames to component names
export const dialogs = Object.fromEntries(
  Object.entries(dialogModules)
    .filter(([path]) => {
      // Exclude provider components that aren't actual dialogs
      const excludePatterns = [
        'Provider.vue',
        'AlertDialogProvider.vue',
        'DialogProvider.vue',
      ]
      return !excludePatterns.some((pattern) => path.includes(pattern))
    })
    .map(([path, module]) => {
      // Extract component name from file path (e.g., './ArtistBookingDialog.vue' -> 'ArtistBookingDialog')
      const componentName = path.replace('./', '').replace('.vue', '')
      return [componentName, (module as any).default]
    })
)
