import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // try {
        const keycloakUser = await axios.post(`${process.env.KEYCLOAK_TOKEN_GEN}`,
            [{
                "grant_type": "password",
                "username": "ellen",
                "password": "ellen",
                "client_id": "admin-cli"
            }], { headers: { "Content-Type": "application/x-www-form-urlencoded" } })

        return res.status(200).json({ ...keycloakUser })
    // }
    // catch (e) {
    //     return res.status(400).json(e)
    // }
}