import { Button } from '@/components/buttons/button'
import { Block } from '@/components/containers/block'
import { ButtonsContainer } from '@/components/containers/buttonsContainer'
import { useCardsSettings } from '@/hooks/useCardsSettings'
import { useDebugMode } from '@/hooks/useDebugMode'
import { useGeneralSettings } from '@/hooks/useGeneralSettings'
import { useScreensaver } from '@/hooks/useScreensaver'
import { useTheme } from 'next-themes'
import { toast } from 'react-toastify'

export const ResetSettings = () => {
  const { resetGeneralSettings } = useGeneralSettings()
  const { resetDebugMode } = useDebugMode()
  const { resetCardsSettings } = useCardsSettings()
  const { resetScreensaver } = useScreensaver()
  const { theme } = useTheme()

  const clearSessionStorage = () => {
    sessionStorage.clear()
    toast('Session storage cleared', { theme, type: 'info' })
  }

  const clearLocalStorage = () => {
    localStorage.clear()
    toast('Local storage cleared', { theme, type: 'info' })
  }

  const onReset = () => {
    resetGeneralSettings()
    resetDebugMode()
    resetCardsSettings()
    resetScreensaver()
    toast('All settings are reset to defaults', { theme, type: 'info' })
  }

  return (
    <Block heading='Reset' inColumns>
      <ButtonsContainer>
        <Button isStretched onClick={clearSessionStorage}>
          Clear session storage
        </Button>
        <Button isStretched onClick={clearLocalStorage}>
          Clear local storage
        </Button>
      </ButtonsContainer>
      <Button isDanger onClick={onReset}>
        Reset all settings to defaults
      </Button>
    </Block>
  )
}