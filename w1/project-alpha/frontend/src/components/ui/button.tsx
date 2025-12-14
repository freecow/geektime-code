import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium",
  "transition-all duration-200 ease-out",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2",
  "disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#0071e3] text-white rounded-xl hover:bg-[#0077ed] active:scale-[0.98] shadow-sm hover:shadow-md",
        destructive: "bg-[#ff3b30] text-white rounded-xl hover:bg-[#ff453a] active:scale-[0.98] shadow-sm hover:shadow-md",
        outline: "border border-[#d2d2d7] bg-white text-[#1d1d1f] rounded-xl hover:bg-[#f5f5f7] hover:border-[#86868b] active:scale-[0.98]",
        secondary: "bg-[#f5f5f7] text-[#1d1d1f] rounded-xl hover:bg-[#e8e8ed] active:scale-[0.98]",
        ghost: "text-[#1d1d1f] rounded-lg hover:bg-[#f5f5f7] active:scale-[0.98]",
        link: "text-[#0071e3] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

