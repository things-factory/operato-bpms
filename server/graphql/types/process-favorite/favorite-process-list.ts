import gql from 'graphql-tag'

export const FavoriteProcessList = gql`
  type FavoriteProcessList {
    items: [Process]
    total: Int
  }
`
