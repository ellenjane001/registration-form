import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import qs from 'qs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        let data = qs.stringify({
            grant_type: "password",
            username: "ellen",
            password: "ellen",
            client_id: "admin-cli"
        })
        const keycloakUser = await axios.request({
            url: `${process.env.KEYCLOAK_TOKEN_GEN}`,
            method: "POST",
            data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        return res.status(200).json(keycloakUser.data)
    }
    catch (e) {
        return res.status(400).json(e)
    }
}