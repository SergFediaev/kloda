import { Heading } from '@/components/heading'
import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

const DEFAULT_TYPE = 'div'

export type BlockProps<T extends ElementType = typeof DEFAULT_TYPE> = {
  as?: T
  heading?: ReactNode
  isHeadingCentered?: boolean
  isConstrained?: boolean
  inColumns?: boolean
} & ComponentPropsWithoutRef<T>

export const Block = <T extends ElementType = typeof DEFAULT_TYPE>({
  as,
  children,
  heading,
  isHeadingCentered,
  isConstrained,
  inColumns,
  className,
  ...restProps
}: BlockProps<T>) => {
  const Component = as ?? DEFAULT_TYPE

  return (
    <Component
      className={cn(
        'flex flex-col gap-8 rounded-3xl bg-surface p-6 shadow-lg dark:bg-surface-dark',
        isConstrained && 'w-full',
        inColumns && 'break-inside-avoid',
        className,
      )}
      {...restProps}
    >
      {heading && <Heading isCentered={isHeadingCentered}>{heading}</Heading>}
      {children}
    </Component>
  )
}
