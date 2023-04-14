import { RegistrationType } from "@/types";
import { decodeBase64 } from "@/utils/base64";
import { HttpStatusCode } from "axios";
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from "next/dist/server/api-utils";
type Data = {
    data?: any
}

export default function get(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const registrationCookie = JSON.parse(decodeBase64(req.body.cookie))
        if (registrationCookie) {
            const requestId = req.body.id
            let result = registrationCookie.filter(({ id }: RegistrationType) => id === requestId)
            return res.status(200).json({ data: result[0] })
        }
        throw new ApiError(HttpStatusCode.BadRequest, "Failed to fetch")
    } catch (e: any) {
        return res.status(400).json(e?.message)
    }
}
