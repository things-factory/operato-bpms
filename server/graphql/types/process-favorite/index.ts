import { Filter, Pagination, Sorting } from '@things-factory/shell'
import { FavoriteProcessList } from './favorite-process-list'
import { Process } from './process'

export const Mutation = `
`

export const Query = /* GraphQL */ `
  favoriteProcesses(filters: [Filter], pagination: Pagination, sortings: [Sorting]): FavoriteProcessList
`

export const Types = [Filter, Pagination, Sorting, FavoriteProcessList, Process]
