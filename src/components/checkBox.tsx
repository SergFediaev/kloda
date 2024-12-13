import { Checkbox, type CheckboxProps } from '@nextui-org/checkbox'
import { forwardRef } from 'react'

export const CheckBox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => (
    <Checkbox
      ref={ref}
      classNames={{
        base: 'max-w-full flex-row-reverse sm:flex-wrap-reverse items-start justify-between gap-x-4 sm:gap-x-6 p-0 m-0',
        wrapper:
          'before:border-accent before:dark:border-accent-dark after:bg-accent after:dark:bg-accent-dark mr-0',
        icon: 'dark:text-black text-white',
        label: 'text-primary dark:text-primary-dark',
      }}
      {...props}
    />
  ),
)

CheckBox.displayName = 'CheckBox'
