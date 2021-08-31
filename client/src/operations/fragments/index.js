import { gql } from '@apollo/client'

export const IMAGE_FIELDS = gql`
  fragment ImageFields on File {
    id
    filename
    path
  }
`

export const PUBLIC_USER_FIELDS = gql`
  ${IMAGE_FIELDS}

  fragment PublicUserFields on User {
    id
    name
    imageUrl
    image {
      ...ImageFields
    }
  }
`