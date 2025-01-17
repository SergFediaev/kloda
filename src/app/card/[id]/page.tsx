import { CardDetails } from '@/components/cards/cardDetails'
import { Container } from '@/components/containers/container'
import type { ParamsIdProps } from '@/types/paramsIdProps'
import type { Metadata } from 'next'

export const generateMetadata = ({
  params: { id },
}: ParamsIdProps): Metadata => ({
  title: `Card #${id}`,
})

export default function CardPage({ params: { id } }: ParamsIdProps) {
  return (
    <Container isCentered>
      <CardDetails id={id} />
    </Container>
  )
}
