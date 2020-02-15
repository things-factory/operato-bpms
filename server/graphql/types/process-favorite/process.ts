import gql from 'graphql-tag'

export const Process = gql`
  extend type Process {
    favoriteId: String
  }
`
