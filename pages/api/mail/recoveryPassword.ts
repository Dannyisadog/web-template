import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { getUrl, isEmail } from 'utils/util';
import { findUserByEmail } from '../service/User';
import jwt from "jsonwebtoken";
import BaseApiHandler from '../base/baseApiHandler';
import mg from 'nodemailer-mailgun-transport';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiHandler = new BaseApiHandler(req, res);
  
  try {
    const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY ?? '';
    const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN ?? '';

    const auth = {
      auth: {
        api_key: MAILGUN_API_KEY,
        domain: MAILGUN_DOMAIN
      }
    }

    const mailer = nodemailer.createTransport(mg(auth));

    const body = JSON.parse(req.body)

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

    const KEY = process.env.NEXTAUTH_SECRET || '';

    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email
    }, KEY);

    const templateDirectory = path.resolve(process.cwd(), "template");
    const emailTemplate = readFileSync(path.join(templateDirectory, "recoveryPassword.hbs"), "utf8");

    const template = Handlebars.compile(emailTemplate);

    const { name } = existUser;
    const link = `${getUrl()}/reset/password?token=${token}`;

    const html = template({ name, link });

    await mailer.sendMail({
      from: 'no-reply@template.dannyisadog.com',
      to: email,
      subject: 'Reset Password',
      html
    });

    apiHandler.json({
      "msg": "reset password link sent successfully"
    });

  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      apiHandler.send400(e.message);
    } else {
      apiHandler.send500();
    }
  }
}