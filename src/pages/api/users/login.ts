import { LoginType } from '@/types';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const loginUser = async (values: LoginType) => {
  const user = await prisma.users.findFirst({
    where: {
      email_address: 'emma@prisma.io',
    },
    select: {
      email_address: true,
      username: true,
    },
  })
  return user
}

type Data = {
  email_address?: string | undefined
  username?: string | undefined
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  loginUser(req.body).then(response => {
    res.status(200).json({ ...response })

  })
}
