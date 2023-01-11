import { prisma } from "db";
import { SigninUserProps } from "types/nextauth/SigninCallbackProps";

export const create = async (user: SigninUserProps) => {
  const {name, email, image} = user;
  let newUser = null;

  try {
    newUser = await prisma.user.create({
      data: {
        name,
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
    return false;
  }

  console.log({user});

  return true;
}