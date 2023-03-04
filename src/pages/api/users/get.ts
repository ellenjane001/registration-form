import { NextApiRequest, NextApiResponse } from 'next'
import { RegistrationType } from '@/types'
import cookie from 'cookie'
import { decodeBase64 } from '@/utils/base64'
type Data = {
    account: string
}
export default function get(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { registration } = cookie.parse(req.headers.cookie!)
    console.log(registration)
    console.log(req)
    const { id } = req.body
    console.log(id)
    console.log(JSON.parse(decodeBase64(registration)).filter((data: RegistrationType) => data.id === id))
    res.status(200).json({ account: id });
}