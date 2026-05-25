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
  return client.fetch<TQueryResult>(query, params, {
    next: { tags },
    cache: 'no-store',
  })
}
