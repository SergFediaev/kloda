import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

const DEFAULT_TYPE = 'span'

type Props<T extends ElementType = typeof DEFAULT_TYPE> = {
  as?: T
  hasGaps?: boolean
} & ComponentPropsWithoutRef<T>

export const Wrapper = <T extends ElementType = typeof DEFAULT_TYPE>({
  as,
  hasGaps,
  className,
  ...restProps
}: Props<T>) => {
  const Component = as ?? DEFAULT_TYPE

  return (
    <Component
      className={cn(
        'flex flex-wrap items-center',
        hasGaps && 'gap-4',
        className,
      )}
      {...restProps}
    />
  )
}