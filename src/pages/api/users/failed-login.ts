import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {

}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  delete req.body.confirm_password
  const cookie = serialize("failed_login", JSON.stringify(req.body), {
    httpOnly: true,
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ message: "Successfully set cookie!" });
}
