'use client'

import { Container } from '@/components/containers/container'
import { List } from '@/components/containers/list'
import { Wrapper } from '@/components/containers/wrapper'
import { EasterEgg } from '@/components/easterEgg'
import { ExternalLink } from '@/components/links/externalLink'
import { AnimatedIcon } from '@/components/settings/animatedIcon'
import { usePaths } from '@/hooks/usePaths'
import { Copyright, Flame, Heart, Mail } from 'lucide-react'
import { Link } from 'next-view-transitions'

export const Footer = () => {
  const { homePath, manualPath, mapPath } = usePaths()

  return (
    <>
      <EasterEgg />
      <footer className='bg-surface shadow-inner dark:bg-surface-dark'>
        <Container>
          <Wrapper as='div' className='justify-between' hasGaps>
            <List hasGaps isMarkersAccent={false}>
              <li>
                <Link href={homePath}>About Kloda</Link>
              </li>
              <li>
                <Link href={manualPath}>User manual</Link>
              </li>
              <li>
                <Link href={mapPath}>Sitemap</Link>
              </li>
            </List>
            <List hasGaps isMarkersAccent={false} className='sm:items-center'>
              <Wrapper as='li'>
                <Copyright size={16} />
                &nbsp;
                {new Date().getFullYear()}
                &nbsp;
                <a href='mailto:SergFediaev@gmail.com'>Sergei Fediaev</a>
                &nbsp;
                <Mail size={16} />
              </Wrapper>
              <Wrapper as='li'>
                Made with&nbsp;
                <AnimatedIcon icon={Heart} title='Love 🥰' />
                &nbsp;and&nbsp;
                <AnimatedIcon icon={Flame} title='Soul 😇' isReversed />
              </Wrapper>
              <li>
                <em>For learners by learner</em>
              </li>
            </List>
            <List hasGaps isMarkersAccent={false} className='sm:items-end'>
              <li>
                <ExternalLink href='https://github.com/SergFediaev/kloda'>
                  Kloda GitHub
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href='https://api.kloda.fediaev.ru'>
                  Kloda API
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href='https://api.kloda.fediaev.ru/swagger'>
                  Kloda Swagger
                </ExternalLink>
              </li>
            </List>
          </Wrapper>
        </Container>
      </footer>
    </>
  )
}
