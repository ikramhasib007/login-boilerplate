import { InMemoryCache } from '@apollo/client'
import { concatPagination, relayStylePagination } from '@apollo/client/utilities'
import { searchQueryVar, categoriesVar } from '.'
import { cursorTakePaginatedFieldPolicy } from './utilities'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        _searchQuery: {
          read() { return searchQueryVar() }
        },
        _categories: {
          read() { return categoriesVar() }
        },
        notifications: cursorTakePaginatedFieldPolicy()
      }
    },

    Notification: {
      fields: {
        createdAt(date) { return parseInt(date, 10) },
        id(id) { return parseInt(id, 10) }
      }
    }
  }
})