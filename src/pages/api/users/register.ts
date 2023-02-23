import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { CreateUserType } from '@/types'

const prisma = new PrismaClient()

const createUser = async (values: CreateUserType) => {
  const { username, first_name, middle_name, last_name, email, number, password } = values
  const newUser = await prisma.users.create({
    data: {
      first_name,
      middle_name,
      last_name,
      email_address: email,
      mobile_number: parseInt(number),
      username,
      password
    },
  })

  return newUser
}
type Data = {
  user_id: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  createUser(req.body).then(response => {
    if (response.user_id) {
      res.status(200).json({ user_id: response.user_id })
    }
    else
      res.status(400)
  })
}
