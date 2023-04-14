import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}
export default function send(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({ message: req.body });
}