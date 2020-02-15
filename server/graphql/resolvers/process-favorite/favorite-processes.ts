import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Process } from '@things-factory/process-service'
import { Favorite } from '@things-factory/fav-base'

export const favoritesProcessesResolver = {
  async favoriteProcesses(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(Process).createQueryBuilder()
    buildQuery(queryBuilder, params, context)

    var qb = queryBuilder
      .innerJoin(Favorite, 'Favorite', 'Process.id = Favorite.routing')
      .select([
        'Process.id as id',
        'Process.name as name',
        'Process.description as description',
        'Process.thumbnail as thumbnail',
        'Favorite.id as favoriteId'
      ])

    const items = await qb.getRawMany()
    const total = await qb.getCount()

    return { items, total }
  }
}
