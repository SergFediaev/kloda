import { Button } from '@/components/button'
import type { ColumnsCount } from '@/components/containers/columns'
import { Input } from '@/components/forms/input'
import { setFirstPage } from '@/utils/setFirstPage'
import { Radio, RadioGroup } from '@nextui-org/radio'
import { Select, SelectItem } from '@nextui-org/select'
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Columns3,
  Rows4,
} from 'lucide-react'
import { useTransitionRouter } from 'next-view-transitions'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

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
  columnsCount: ColumnsCount
  setColumnsCount: (columnsCount: ColumnsCount) => void
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
  columnsCount,
  setColumnsCount,
}: Props) => {
  const { replace } = useTransitionRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const isLastPage = page === totalPages
  const hasSearchParams = searchParams.toString() !== ''
  const hasNotItems = itemsCount < 2
  const hasNotPages = page < 2
  const hasNotTotalPages = totalPages < 2

  const onChangeParams = useCallback(
    (key: Key, value: string) => {
      const params = new URLSearchParams(searchParams)

      if (key === 'limit') setFirstPage(params)

      params.set(key, value)
      replace(`?${params}`)
    },
    [searchParams, replace],
  )

  const onChangePage = useCallback(
    (pageNumber: number, event?: KeyboardEvent) => {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        event?.preventDefault()
        onChangeParams('page', String(pageNumber))
      }
    },
    [totalPages, onChangeParams],
  )

  const onReset = () => replace(pathname)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'Home':
            onChangePage(1, event)
            break
          case 'ArrowLeft':
            onChangePage(page - 1, event)
            break
          case 'ArrowRight':
            onChangePage(page + 1, event)
            break
          case 'End':
            onChangePage(totalPages, event)
            break
          default: {
            const keyNumber = Number(event.key)

            if (!Number.isNaN(keyNumber)) onChangePage(keyNumber, event)
          }
        }
      }
    }

    addEventListener('keydown', onKeyDown)
    return () => removeEventListener('keydown', onKeyDown)
  }, [page, totalPages, onChangePage])

  return (
    <div className='mx-auto mb-6 flex w-fit flex-wrap items-center justify-around gap-4'>
      <Button
        variant='round'
        onClick={() => onChangePage(1)}
        disabled={hasNotPages}
        title='Ctrl + Home'
      >
        <ChevronFirst />
      </Button>
      <Button
        variant='round'
        onClick={() => onChangePage(page - 1)}
        disabled={hasNotPages}
        title='Ctrl + Left arrow'
      >
        <ChevronLeft />
      </Button>
      <span className='text-center'>
        <p>Pages</p>
        <p>
          {page} / {totalPages}
        </p>
      </span>
      <Button
        variant='round'
        onClick={() => onChangePage(page + 1)}
        disabled={isLastPage}
        title='Ctrl + Right arrow'
      >
        <ChevronRight />
      </Button>
      <Button
        variant='round'
        onClick={() => onChangePage(totalPages)}
        disabled={isLastPage}
        title='Ctrl + End'
      >
        <ChevronLast />
      </Button>
      <Input
        label='Go to page'
        value={page}
        type='number'
        min={1}
        max={totalPages}
        onChange={({ currentTarget: { value } }) => onChangePage(Number(value))}
        disabled={hasNotTotalPages}
        title='Ctrl + Page number'
      />
      <span className='text-center'>
        <p>{itemsName}</p>
        <p>
          {itemsCount} / {totalItems}
        </p>
      </span>
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
      <RadioGroup
        label='Columns'
        orientation='horizontal'
        value={columnsCount}
        onValueChange={value => setColumnsCount(value as ColumnsCount)}
        color='warning'
        className='text-center'
      >
        <Radio value='1' title='1'>
          <Rows4 />
        </Radio>
        <Radio value='2' title='2'>
          <Columns2 />
        </Radio>
        <Radio value='3' title='3'>
          <Columns3 />
        </Radio>
      </RadioGroup>
      {hasSearchParams && <Button onClick={onReset}>Reset</Button>}
    </div>
  )
}
