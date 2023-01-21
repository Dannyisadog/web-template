import { NextApiRequest, NextApiResponse } from "next"
import { isEmail } from "utils/util";
import { create as createUser, findUserByEmail } from "../service/User";
import bcrypt from "bcryptjs";
import { isPasswordValid } from "../service/password";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({
      "error": "post method allowed"
    });
  }
  const body = JSON.parse(req.body)
  const {
    username,
    email,
    password,
    passwordConfirm
  } = body;

  try {
    if (!username) {
      throw new Error("username should not be empty");
    }

    if (!isEmail(email)) {
      throw new Error("email is invalid");
    }

    const existUser = await findUserByEmail(email);

    if (existUser) {
      throw new Error("user existed");
    }

    if (password !== passwordConfirm) {
      throw new Error("password should be the same");
    }

    isPasswordValid(password);

    const passwordHash = bcrypt.hashSync(password, 10);

    const newUser = {
      name: username,
      password: passwordHash,
      email,
      image: ""
    };

    await createUser(newUser);

    res.status(200).send({
      "success": "register successfully"
    });
    
  } catch (e) {
    if (e instanceof Error) {
      res.status(200).send({
        "error": e.message
      });  
    } else {
      res.status(200).send({
        "error": "something's crash"
      });  
    }
  }
}