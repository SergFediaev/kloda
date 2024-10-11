import { Button } from '@/components/button'
import { Input } from '@/components/forms/input'
import { Select, SelectItem } from '@nextui-org/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTransitionRouter } from 'next-view-transitions'
import { usePathname, useSearchParams } from 'next/navigation'
import type { ChangeEvent } from 'react'

const ORDERS = {
  asc: 'Ascending',
  desc: 'Descending',
} as const

// ToDo: string[]
const QUANTITIES = [5, 10, 15, 20, 25, 30, 50, 70, 100] as const

type Key = 'page' | 'limit' | 'order' | 'sort'

type Props = {
  itemsName?: string
  page: number
  limit: number
  order: string
  sort: string
  sorts: Record<string, string>
  totalItems: number
  totalPages: number
  itemsCount: number
}

export const Pagination = ({
  itemsName = 'Items',
  page,
  limit,
  order,
  sort,
  sorts,
  totalItems,
  totalPages,
  itemsCount,
}: Props) => {
  const { replace } = useTransitionRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const hasPages = page > 1
  const isNotLastPage = page < totalPages
  const hasNotItems = itemsCount < 2
  const hasNotPages = totalPages < 2
  const hasSearchParams = searchParams.toString() !== ''

  const onChangeParams = (key: Key, value: string) => {
    const params = new URLSearchParams(searchParams)

    if (key === 'limit') params.set('page', String(1))

    params.set(key, value)
    replace(`?${params}`)
  }

  const onChangePage = (page: number) => onChangeParams('page', String(page))

  const onGoTo = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    const pageNumber = Number(value)

    if (pageNumber < 1 || pageNumber > totalPages) {
      return
    }

    onChangePage(pageNumber)
  }

  const onReset = () => replace(pathname)

  if (!itemsCount) {
    return null
  }

  return (
    <div className='flex flex-wrap items-center justify-around gap-4 rounded-3xl border-2 border-accent bg-ground bg-opacity-70 p-6 shadow-inner backdrop-blur-xl dark:border-accent-dark dark:bg-ground-dark dark:bg-opacity-70'>
      <span className='text-center'>
        <p>{itemsName}</p>
        <p>
          {itemsCount} / {totalItems}
        </p>
      </span>
      {hasPages && (
        <>
          <Button variant='round' onClick={() => onChangePage(1)}>
            1
          </Button>
          <Button variant='round' onClick={() => onChangePage(page - 1)}>
            <ChevronLeft />
          </Button>
        </>
      )}
      <span className='text-center'>
        <p>Pages</p>
        <p>
          {page} / {totalPages}
        </p>
      </span>
      {isNotLastPage && (
        <>
          <Button variant='round' onClick={() => onChangePage(page + 1)}>
            <ChevronRight />
          </Button>
          <Button variant='round' onClick={() => onChangePage(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}
      <Input
        label='Go to page'
        value={page}
        type='number'
        min={1}
        max={totalPages}
        onChange={onGoTo}
        disabled={hasNotPages}
      />
      <Select
        label='Order by'
        selectedKeys={[order]}
        onChange={({ target: { value } }) => onChangeParams('order', value)}
        className='w-auto min-w-36'
        color='warning'
        items={Object.entries(ORDERS)}
        isDisabled={hasNotItems}
      >
        {([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        )}
      </Select>
      <Select
        label='Sort by'
        selectedKeys={[sort]}
        onChange={({ target: { value } }) => onChangeParams('sort', value)}
        className='w-auto min-w-36'
        color='warning'
        items={Object.entries(sorts)}
        isDisabled={hasNotItems}
      >
        {([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        )}
      </Select>
      <Select
        label={`${itemsName} per page`}
        selectedKeys={[String(limit)]}
        onChange={({ target: { value } }) => onChangeParams('limit', value)}
        className='w-auto min-w-36'
        color='warning'
        isDisabled={hasNotItems}
      >
        {QUANTITIES.map(quantity => (
          <SelectItem
            key={quantity}
            value={quantity}
            textValue={String(quantity)}
          >
            {quantity}
          </SelectItem>
        ))}
      </Select>
      {hasSearchParams && <Button onClick={onReset}>Reset</Button>}
    </div>
  )
}
