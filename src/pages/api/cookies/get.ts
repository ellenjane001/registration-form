import { NextApiRequest, NextApiResponse } from "next";

export default async function cookieHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.headers.cookie) {
        return res.status(200).json("cookie not found")
    }
    else
        return res.status(200).json({ ...req.headers })
}