import { decodeBase64, encodeBase64 } from "@/utils/base64";
import cookie, { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
  failedLogin: number
}
type FailedLoginType = {
  failedLogin: number, account: { username: string, password: string }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let count = 0
  const { failedLogin } = cookie.parse(req.headers.cookie!)
  const { username, password } = req.body
  let account = []

  if (failedLogin) {
    const login = JSON.parse(failedLogin)
    let checker = login.filter((login: FailedLoginType) => login.account.username === username && decodeBase64(login.account.password) === password)
    if (checker.length > 0) {
      login.forEach((acc: FailedLoginType) => {
        if (acc.account.username === username && decodeBase64(acc.account.password) === password && acc.failedLogin <= 2) {
          acc.failedLogin++
          acc.lastLoginAttempt = new Date()
        }
      })
    } else {
      count = count + 1
      login.push({ failedLogin: count, account: { username: req.body.username, password: encodeBase64(req.body.password) }, lastLoginAttempt: new Date() })
    }
    account = login
  } else {
    count = count + 1
    account.push({ failedLogin: count, account: { username: req.body.username, password: encodeBase64(req.body.password) }, lastLoginAttempt: new Date() })
  }
  const cookies = serialize("failedLogin", JSON.stringify(account), {
    httpOnly: true,
    path: "/",
  });
  res.setHeader("Set-Cookie", cookies);
  return res.status(200).json({ failedLogin: account })
}
