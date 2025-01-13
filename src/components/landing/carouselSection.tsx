import Carousel from '@/components/carousel/carousel'
import { Container } from '@/components/containers/container'
import { Section } from '@/components/landing/section'
import type { EmblaOptionsType } from 'embla-carousel'
import React from 'react'

const OPTIONS: EmblaOptionsType = { loop: false }
const SLIDE_COUNT = 7
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export function CarouselSection() {
  return (
    <Section>
      <Container>
        <Carousel slides={SLIDES} options={OPTIONS} />
      </Container>
    </Section>
  )
}