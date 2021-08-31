import { gql } from '@apollo/client'

export const CORE_ACCESS_TOKEN_FIELDS = gql`
  fragment CoreAccessTokenFields on Token {
    id
    creatorId
    type
    expireAt
  }
`

export const CORE_FILE_FIELDS = gql`
  fragment CoreFileFields on File {
    id
    filename
    path
  }
`