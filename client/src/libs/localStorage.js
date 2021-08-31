import localforage from 'localforage'

const storage = localforage.createInstance({
  name: 'cag'
})

export const authTokenKey = 'cagToken'

export default storage;