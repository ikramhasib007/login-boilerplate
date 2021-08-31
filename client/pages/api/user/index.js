import { getLoginSession } from 'libs/auth'
import getClient from 'apollo'
import { ME } from 'src/operations/user'

export default async function user(req, res) {
  try {
    const session = await getLoginSession(req)
    const client = getClient(session.token)
    const user = (session && (await client.query({query: ME})).data.me) ?? null
    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(400).end('Authentication token is invalid, please log in')
  }
}