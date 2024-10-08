import { Button } from '@/components/button'
import { Wrapper } from '@/components/containers/wrapper'
import { VoiceSearch } from '@/components/header/menu/search/voiceSearch'
import { useDebounce } from '@/hooks/useDebounce'
import { useGenerateId } from '@/hooks/useGenerateId'
import { useVoice } from '@/hooks/useVoice'
import { Search as SearchIcon, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type ChangeEvent, useEffect, useState } from 'react'

const SEARCH_PARAM = 'search'

export const Search = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const searchId = useGenerateId()
  const [search, setSearch] = useState(
    searchParams.get(SEARCH_PARAM)?.toString() ?? '',
  )
  const debouncedSearch = useDebounce(search, 500)
  const { isListening, onListen, transcript, isVoiceSupported } = useVoice()

  const searchBy = pathname === '/' ? 'cards' : 'users'

  const onSearch = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => setSearch(value)

  const onReset = () => setSearch('')

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (debouncedSearch) {
      params.set(SEARCH_PARAM, debouncedSearch)
    } else {
      params.delete(SEARCH_PARAM)
    }

    replace(`${pathname}?${params}`)
  }, [debouncedSearch, replace, pathname, searchParams])

  useEffect(() => {
    if (transcript) {
      setSearch(transcript)
    }
  }, [transcript])

  if (!(pathname === '/' || pathname === '/users')) {
    return null
  }

  return (
    <Wrapper as='div' className='flex-nowrap gap-2 truncate'>
      <label title='Search' htmlFor={searchId}>
        <SearchIcon />
      </label>
      <div className='relative flex min-w-0'>
        <input
          value={search}
          type='search'
          className='min-w-0 truncate rounded-3xl border-2 border-accent py-1 pr-8 pl-3 dark:border-accent-dark'
          placeholder={`Search ${searchBy}`}
          onChange={onSearch}
          spellCheck
          id={searchId}
        />
        {search && (
          <Button
            variant='text'
            onClick={onReset}
            title='Reset search'
            className='-translate-y-1/2 absolute top-1/2 right-2'
          >
            <X />
          </Button>
        )}
      </div>
      <VoiceSearch
        isVoiceSupported={isVoiceSupported}
        onListen={onListen}
        isListening={isListening}
      />
    </Wrapper>
  )
}
