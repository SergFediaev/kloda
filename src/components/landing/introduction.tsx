import { Button } from '@/components/buttons/button'
import { Container } from '@/components/containers/container'
import { Section } from '@/components/landing/section'
import { Link } from 'next-view-transitions'

export const Introduction = () => {
  return (
    <Section className='bg-accent-variant text-4xl text-primary-dark selection:bg-black'>
      <Container className='flex flex-col items-center gap-5'>
        <h1 className='font-extrabold text-6xl'>Kloda</h1>
        <p className='text-center'>A powerful tool to help you study smarter</p>
        <Button
          className='border-3 text-base uppercase transition-opacity hover:opacity-80'
          variant='outline'
          as={Link}
          href='/cards'
        >
          Get started
        </Button>
      </Container>
    </Section>
  )
}
