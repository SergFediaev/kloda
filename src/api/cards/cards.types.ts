export type CardArgs = {
  title: string
  content: string
  categories: string[]
  likes: number
  dislikes: number
  authorId: string
}

export type CardResponse = {
  id: number
  title: string
  content: string
  categories: string[]
  likes: number
  dislikes: number
  authorId: string
  createdAt: string
  updatedAt: string
}

export type CardsArgs = {
  search: string
  page: number
  limit: number
  order: string
  sort: string
}

export type CardsResponse = {
  cards: CardResponse[]
  totalCards: number
  totalPages: number
}
