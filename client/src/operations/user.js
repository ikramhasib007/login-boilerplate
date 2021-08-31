import { gql } from '@apollo/client'
import {
  PUBLIC_USER_FIELDS
} from './fragments'

export const CREATE_USER = gql`
  mutation CREATE_USER (
    $name: String!
    $email: String!
    $password: String
    $authProvider: String!
    $authProviderId: String
    ) {
      createUser(data: {
        name: $name, email: $email, password: $password,
        authProvider: $authProvider, authProviderId: $authProviderId
      }) {
        token
      }
    }
`

export const LOGIN = gql`
  mutation LOGIN (
    $email: String!
    $password: String
    ) {
      login (data: {
        email: $email,
        password: $password,
      }) {
        token
      }
    }
`

export const SOCIAL_LOGIN = gql`
  mutation SOCIAL_LOGIN (
    $name: String
    $email: String!
    $authProvider: String!
    $authProviderId: String!
    $imageUrl: String
    ) {
      socialLogin (data: {
        name: $name,
        email: $email,
        authProvider: $authProvider,
        authProviderId: $authProviderId,
        imageUrl: $imageUrl
      }) {
        token
      }
    }
`

export const GET_USER = gql`
  query GET_USER ($email: String!) {
    user(email: $email) {
      id
      name
      email
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD (
    $id: ID!,
    $token: String!,
    $password: String!)
    {
    resetPassword(id: $id, token: $token, data: {
      password: $password
    }) {
      name
      email
    }
  }
`

export const EMAIL_VERIFY = gql`
  mutation EMAIL_VERIFY {
    emailVerify {
      name
    }
  }
`

export const ME = gql`
  ${PUBLIC_USER_FIELDS}
  
  query ME {
    me {
      ...PublicUserFields
    }
  }
`