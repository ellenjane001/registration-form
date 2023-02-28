import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string
  user?: {
    username?: string,
    password?: string
  }
  e?: unknown

}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { username, password, first_name, middle_name, last_name, email } = req.body.cookies
    const bodyUsername = req.body.username
    const bodyPassword = req.body.password
    if (bodyUsername === username && bodyPassword === password)
      return res.status(200).json({ message: 'logged in', user: { username, password, first_name, middle_name, last_name, email } })
    else
      throw new Error('Account not found')
  } catch (e) {
    return res.status(400).json({ e })
  }
}
