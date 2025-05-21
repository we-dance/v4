import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 active:bg-primary/80',
        secondary:
          'border border-input bg-background text-foreground shadow-sm hover:bg-muted hover:text-background-foreground',
        tertiary:
          'text-blue-500 underline-offset-4 underline hover:text-blue-600',
        ghost: 'text-muted-foreground hover:bg-muted hover:text-primary',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background text-foreground shadow-sm hover:bg-muted hover:text-background-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-md px-8 text-lg',
        icon: 'h-10 w-10',
        skinny: 'h-8 px-2',
      },
      color: {
        default: '',
        success: 'bg-success text-success-foreground hover:bg-success/90',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      color: 'default',
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
