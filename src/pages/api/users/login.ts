import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
  message?: string
  username?: string
  e?: unknown
  password?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { registration } = cookie.parse(req.headers.cookie)
    const { username, password } = JSON.parse(registration)
    const bodyUsername = req.body.username
    const bodyPassword = req.body.password
    if (bodyUsername === username && bodyPassword === password)
      return res.status(200).json({ message: 'logged in', username, password })
    else
      throw 'Account not found'
  } catch (e) {
    return res.status(400).json({ e })
  }
}
