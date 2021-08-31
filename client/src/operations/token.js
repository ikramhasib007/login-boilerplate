import { gql } from '@apollo/client'
import { CORE_ACCESS_TOKEN_FIELDS } from './fragments/core'

export const GET_TOKEN = gql`
  ${CORE_ACCESS_TOKEN_FIELDS}
  
  query GET_TOKEN($id: ID!, $type: String!) {
    opsToken(id: $id, type: $type) {
      ...CoreAccessTokenFields
    }
  }
`

export const CREATE_TOKEN = gql`
  ${CORE_ACCESS_TOKEN_FIELDS}
  
  mutation CREATE_TOKEN(
    $creatorId: String
    $type: String!
    $expireAt: String!
  ) {
    createToken(data: {
      creatorId: $creatorId,
      type: $type,
      expireAt: $expireAt
    }) {
      ...CoreAccessTokenFields
    }
  }
`

export const DELETE_TOKEN = gql`
  ${CORE_ACCESS_TOKEN_FIELDS}
  
  mutation DELETE_TOKEN(
    $id: ID!
  ) {
    deleteToken(id: $id) {
      ...CoreAccessTokenFields
    }
  }
`