import { decodeBase64 } from "@/utils/base64";
import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
  message?: string
  user?: {
    username?: string,
    password?: string
  }
  error?: unknown
}

export default function login(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const regCookies = JSON.parse(decodeBase64(req.body.cookies))
    const bodyUsername = req.body.username
    const bodyPassword = req.body.password
    const checkIfExist = regCookies.filter((reg: { username: string, password: string }) => reg.username === bodyUsername && bodyPassword === reg.password)
    if (checkIfExist.length === 1) {
      return res.status(200).json({ message: 'logged in', user: checkIfExist[0] })
    }
    else {
      throw new Error('Account not found')
    }
  } catch (e) {
    return res.status(400).json(e?.message)
  }
}
