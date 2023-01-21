import { prisma } from "db";
import { SigninUserProps } from "types/nextauth/SigninCallbackProps";

export const create = async (user: SigninUserProps) => {
  const {name, password, email, image} = user;
  let newUser = null;

  try {
    newUser = await prisma.user.create({
      data: {
        name,
        password,
        email,
        image
      },
    })
  } catch(e) {
    console.log(e);
    throw new Error("create user fail...");
  }

  return newUser;
}

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    return null;
  }

  return user;
}