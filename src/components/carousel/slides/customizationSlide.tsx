import { Container } from '@/components/containers/container'
import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import { Link } from 'next-view-transitions'

export const CustomizationSlide = () => {
  return (
    <Container className='flex flex-col gap-5 p-x-20 text-large text-stone-700 dark:text-stone-400'>
      <Heading as='h3' isSemiBold className='font-bold text-2xl'>
        User friendly and highly customizable
      </Heading>
      <List hasIndent hasDisc className='flex flex-col gap-5'>
        <li>
          Simple, flexible design that scales seamlessly to any device or
          browser.
        </li>
        <li>
          Navigation experience is outstanding with featured category
          multi-select, pagination and multiple sort options.
        </li>
        <li>
          Detailed view lets you zoom-in on a flashcard and easily move between
          the previous and the next — or roll the dice with the built-in
          randomizer.
        </li>
        <li>
          All cards are titled and automatically numbered which proves
          especially useful when following along playlist position.
        </li>
        <li>
          Critical actions, such as deleting items, are highlighted by color and
          trigger confirmation dialogs to provide safe delete options and
          prevent accidental data loss.
        </li>
        <li>
          Full-on <Link href='/manual'>user manual</Link> is readily available.
        </li>
      </List>
    </Container>
  )
}