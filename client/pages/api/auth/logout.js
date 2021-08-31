import { removeTokenCookie } from 'libs/auth/cookies'

export default async function handler(req, res) {
  removeTokenCookie(res)
  res.writeHead(302, { Location: '/' })
  res.end()
}