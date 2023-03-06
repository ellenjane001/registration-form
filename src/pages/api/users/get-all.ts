import { RegistrationType } from "@/types";
import { decodeBase64 } from "@/utils/base64";
import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
    data?: any
}

export default function get(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const registrationCookie = JSON.parse(decodeBase64(req.body.cookie))
        return res.status(200).json(registrationCookie)
    } catch (e) {
        return res.status(400).json(e?.message)
    }
}
