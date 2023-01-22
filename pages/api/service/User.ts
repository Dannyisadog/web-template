import { prisma } from "db";
import { SigninUserProps } from "types/nextauth/SigninCallbackProps";
import User from "types/next-auth";

export const create = async (user: SigninUserProps) => {
  const {name, password, email, image} = user;
  let newUser = null;

  let userData = {
    name,
    email,
    image,
    password: ''
  }

  if (password) {
    userData.password = password;
  }

  try {
    newUser = await prisma.user.create({
      data: userData,
    })
  } catch(e) {
    console.log(e);
    throw new Error("create user fail...");
  }

  return newUser;
}

export const findUserByEmail = async (email: string | undefined): User => {
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