'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function getCases() {
  // Verify authenticated
  const session = await auth();
  if (!session?.user) return null;

  try {
    return prisma.case.findMany();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCaseById(id: string) {
  try {
    return prisma.case.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
