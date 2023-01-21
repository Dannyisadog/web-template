import { NextApiRequest, NextApiResponse } from "next";
import { isPasswordValid } from "../service/password";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "../service/User";
import { prisma } from "db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error("only post method allowed");
    }

    const body = JSON.parse(req.body)

    const {
      email,
      newPassword,
      newPasswordConfirm
    } = body;

    const existUser = findUserByEmail(email);

    if (!existUser) {
      throw new Error("user not exist");
    }

    if (newPassword !== newPasswordConfirm) {
      throw new Error("password should be the same");
    }

    isPasswordValid(newPassword);

    console.log({
      email,
      newPassword,
      newPasswordConfirm
    })

    const passwordHash = bcrypt.hashSync(newPassword, 10);

    await prisma.user.update({
      where: {
        email
      },
      data: {
        password: passwordHash
      },
    })

    res.status(200).send({
      "msg": "reset password successfully"
    });

  } catch(e) {
    if (e instanceof Error) {
      res.status(200).send({
        "errMsg": e.message
      });
    }
    res.status(500).send({
      "errMsg": "something crash"
    })
  }
}