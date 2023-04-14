import { decodeBase64 } from "@/utils/base64";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
    data?: any

}

export default async function get(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const requestJWT = await axios.request({
            url: `${process.env.NEXT_PUBLIC_API}keycloak/login`,
            method: "GET"
        })
        if (requestJWT) {
            const userCheck = await axios.request({
                url: `${process.env.KEYCLOAK_REALM_LINK}users`,
                method: "GET",
                headers: { "Authorization": `Bearer ${requestJWT.data.access_token}` }
            })
            return res.status(200).json({...userCheck.data})
        }
        // const registrationCookie = JSON.parse(decodeBase64(req.body.cookie))
        // return res.status(200).json(registrationCookie)
    } catch (e: any) {
        return res.status(400).json(e?.message)
    }
}
