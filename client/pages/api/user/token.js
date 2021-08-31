import { getLoginSession } from "libs/auth";

export default async function handler(req, res) {
  try {
    const session = await getLoginSession(req)
    const token = (session && session.token) ?? null
    if(!token) throw Error
    res.status(200).json({ token })
  } catch (error) {
    res.status(400).end('Authentication token not found, please log in')
  }
}