import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
  message?: string
}

export default async function login(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const requestJWT = await axios.request({
      url: `${process.env.NEXT_PUBLIC_API}keycloak/login`,
      method: "GET"
    })

    if (requestJWT) {
      const userCheck = await axios.request({
        url: `${process.env.KEYCLOAK_REALM_LINK}users`,
        params: { username: req.body.username },
        method: "GET",
        headers: { "Authorization": `Bearer ${requestJWT.data.access_token}` }
      })
      return res.status(200).json({ message: 'logged in', ...userCheck.data[0] })
    }
    else
      throw new Error('Account not found')

    // return res.status(400)
    // const regCookies = JSON.parse(decodeBase64(req.body.cookies))
    // const bodyUsername = req.body.username
    // const bodyPassword = req.body.password
    // const checkIfExist = regCookies.filter((reg: { username: string, password: string }) => reg.username === bodyUsername && bodyPassword === reg.password)
    // if (checkIfExist.length === 1) {
    //   return res.status(200).json({ message: 'logged in', user: checkIfExist[0] })
    // }
    // else {
    //   throw new Error('Account not found')
    // }
  } catch (e: any) {
    return res.status(400).json(e?.message)
  }
}
