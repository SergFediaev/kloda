'use client'

import { Columns } from '@/components/containers/columns'
import { AppInfo } from '@/components/settings/appInfo'
import { DebugModeSettings } from '@/components/settings/debugModeSettings'
import { GeneralSettings } from '@/components/settings/generalSettings'
import { ScreensaverSettings } from '@/components/settings/screensaverSettings'
import { UptimeSettings } from '@/components/settings/uptimeSettings'
import { useGeneralSettings } from '@/hooks/useGeneralSettings'

export const Settings = () => (
  <Columns count={'3'}>
    <GeneralSettings />
    {useGeneralSettings().isDebugModeEnabled && <DebugModeSettings />}
    <ScreensaverSettings />
    <UptimeSettings />
    <AppInfo />
  </Columns>
)
