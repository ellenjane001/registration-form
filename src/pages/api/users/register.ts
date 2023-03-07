import { decodeBase64, encodeBase64 } from "@/utils/base64";
import cookie, { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
  message: string
}

export default function register(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    delete req.body.confirm_password

    const { registration } = cookie.parse(req.headers.cookie!)
    let regCookie = []

    if (registration) {
      regCookie = JSON.parse(decodeBase64(registration))
      req.body.id = regCookie.length + 1
      regCookie.push(req.body)
    } else {
      req.body.id = 1
      regCookie.push(req.body)
    }
    const cookies = serialize("registration", encodeBase64(JSON.stringify(regCookie)), {
      httpOnly: true,
      path: "/",
    });
    res.setHeader("Set-Cookie", cookies);
    res.status(200).json({ message: "Successfully set cookie!" });
  } catch (e: any) {
    res.status(400).json(e.message)
  }

}