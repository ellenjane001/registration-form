import axios from "axios";
import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
  message: string, value?: any
}

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let token
  const requestJWT = await axios.request({
    url: `${process.env.NEXT_PUBLIC_API}keycloak/login`,
    method: "GET"
  })
  if (requestJWT)
    token = requestJWT.data.access_token

  const { number, password, first_name, last_name, middle_name, username, email } = req.body
  let data = {
    username, email,
    "enabled": true,
    "firstName": first_name,
    "lastName": last_name,
    "attributes": {
      "number": [
        number
      ], "middle_name": [
        middle_name
      ]
    },
    "credentials": [
      {
        "type": "password",
        "value": password,
        "temporary": false
      }
    ]
  }

  const registerUser = await axios.request({
    url: `${process.env.KEYCLOAK_REALM_LINK}users`,
    method: "POST",
    data,
    headers: { "Authorization": `Bearer ${token}` }
  })
  if (registerUser.status === 409)
    throw new Error("Failed")
  else
    res.status(200).json({ message: "Success!" });

  // const { registration } = cookie.parse(req.headers.cookie!)
  // let regCookie = []

  // if (registration) {
  //   regCookie = JSON.parse(decodeBase64(registration))
  //   req.body.id = regCookie.length + 1
  //   regCookie.push(req.body)
  // } else {
  //   req.body.id = 1
  //   regCookie.push(req.body)
  // }
  // const cookies = serialize("registration", encodeBase64(JSON.stringify(regCookie)), {
  //   httpOnly: true,
  //   path: "/",
  // });
  // res.setHeader("Set-Cookie", cookies);
  // res.status(200).json({ message: "Successfully set cookie!" });
}
