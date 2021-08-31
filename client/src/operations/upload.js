import { gql } from '@apollo/client'
import { CORE_FILE_FIELDS } from './fragments/core'


export const UPLOAD_FILE = gql`
  ${CORE_FILE_FIELDS}
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      ...CoreFileFields
    }
  }
`

export const UPLOAD_FILES = gql`
  ${CORE_FILE_FIELDS}
  mutation UploadFiles($files: [Upload!]!) {
    uploadFiles(files: $files) {
      ...CoreFileFields
    }
  }
`

export const DELETE_FILE = gql`
  ${CORE_FILE_FIELDS}
  mutation DeleteFile(
    $id: String!
    $filename: String!
    ) {
    deleteFile(file: {
      id: $id,
      filename: $filename
    }) {
      ...CoreFileFields
    }
  }
`