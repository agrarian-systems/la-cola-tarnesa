'use server';

import { auth, signIn, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';
import { LoginSchema } from '@/lib/schemas/loginSchema';
import {
  combinedRegisterSchema,
  RegisterSchema,
} from '@/lib/schemas/registerSchema';
import { generateToken } from '@/lib/token';
import { ActionResult } from '@/types';
import { user } from '@nextui-org/react';
import { TokenType, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const existingUser = await getUserByEmail(data.email);

    if (!existingUser || !existingUser.email)
      return { status: 'error', error: 'Invalid credentials' };

    // if (!existingUser.emailVerified) {
    //   const token = await generateToken(
    //     existingUser.email,
    //     TokenType.VERIFICATION
    //   );

    //   // Send an email

    //   return {
    //     status: 'error',
    //     error:
    //       "Merci de vérifier le lien d'activation dans votre boîte mail avant de vous connecter",
    //   };

    // }

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(result);

    return { status: 'success', data: 'Logged in' };
  } catch (error) {
    console.log(error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { status: 'error', error: 'Invalid credentials' };
        default:
          return { status: 'error', error: 'Something went wrong' };
      }
    } else {
      return { status: 'error', error: 'Something else went wrong' };
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: '/' });
}

export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    const validated = combinedRegisterSchema.safeParse(data);

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors };
    }

    const { name, email, password, instrument, description, department } =
      validated.data;

    // Encrypting the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Does this user already exist ?
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) return { status: 'error', error: 'User already exists' };

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        member: { create: { name, instrument, description, department } },
      },
    });

    // Création d'un token de vérification de l'authenticité de l'adresse email
    // const verificationToken = await generateToken(
    //   email,
    //   TokenType.VERIFICATION
    // );

    // Send an email

    return { status: 'success', data: user };
  } catch (error) {
    console.log(error);
    return { status: 'error', error: 'Something went wrong' };
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getAuthUserId() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error('Unauthorized');

  return userId;
}
