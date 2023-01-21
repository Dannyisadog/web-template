import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { isEmail } from 'utils/util';
import { findUserByEmail } from '../service/User';
import jwt from "jsonwebtoken";

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const mailer = nodemailer.createTransport({
    host: 'mailhog',
    port: 1025,
    ignoreTLS: true
  });

  const body = JSON.parse(req.body)
  
  try {

    if (req.method !== 'POST') {
      throw new Error("post method allowed");
    }

    const { email } = body;

    if (!isEmail(email)) {
      throw new Error("email type incorrect");
    }

    const existUser = await findUserByEmail(email);

    if (!existUser) {
      throw new Error("user not existed");
    }

    const KEY = process.env.NEXTAUTH_SECRET;

    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email
    }, KEY);

    await mailer.sendMail({
      from: 'no-reply@web_template.com',
      to: email,
      subject: 'Reset Password in web-template',
      html: `<a href='http://localhost:3000/reset/password?token=${token}'>Link</a>`
    });

    res.status(200).send({
      "data": {
        "msg": "reset password link sent successfully"
      }
    })
  } catch (e) {
    if (e instanceof Error) {
      res.status(200).send({
        "data": {
          "msg": e.message
        }
      })
    }
  }
}