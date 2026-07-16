import type { QueryParams } from 'next-sanity'
import { client } from '../client'

type SanityFetchArgs = {
  query: string
  params?: QueryParams
  tags?: string[]
}

export async function sanityFetch<TQueryResult>({
  query,
  params = {},
  tags = [],
}: SanityFetchArgs): Promise<TQueryResult> {
  // Produção: ISR de 60s — quedas transitórias do Sanity servem cache em vez de 500.
  // Dev: sem cache, para ver mudanças de conteúdo na hora.
  if (process.env.NODE_ENV === 'production') {
    return client.fetch<TQueryResult>(query, params, {
      next: { tags, revalidate: 60 },
    })
  }
  return client.fetch<TQueryResult>(query, params, {
    next: { tags },
    cache: 'no-store',
  })
}
