import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  hasIndent?: boolean
  hasGaps?: boolean
  isMarkersAccent?: boolean
  isMono?: boolean
} & ComponentPropsWithoutRef<'ol'>

export const OrderedList = ({
  hasIndent,
  hasGaps,
  isMarkersAccent = true,
  isMono,
  className,
  ...restProps
}: Props) => (
  <ol
    className={cn(
      'list-decimal',
      hasIndent && 'ml-6',
      hasGaps && 'flex flex-col gap-6',
      isMarkersAccent && 'marker:text-accent dark:marker:text-accent-dark',
      isMono && 'font-mono',
      className,
    )}
    {...restProps}
  />
)
