import { PrismaClient } from '@prisma/client';
import { membersData } from './membersData';
import { hash } from 'bcryptjs';
import { casesData } from './casesData';

const prisma = new PrismaClient();

async function seedMembers() {
  return membersData.map(async (member) =>
    prisma.user.create({
      data: {
        email: member.email,
        emailVerified: new Date(),
        name: member.name,
        passwordHash: await hash('password', 10),
        image: member.image,
        profileComplete: true,
        member: {
          create: {
            name: member.name,
            created: new Date(member.created),
            updated: new Date(member.lastActive),
            description: member.description,
            image: member.image,
            photos: {
              create: {
                url: member.image,
              },
            },
          },
        },
      },
    })
  );
}

async function seedConflitsCases() {
  return casesData.map(async (c) =>
    prisma.case.create({
      data: {
        name: c.name,
        status: c.status,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    })
  );
}

async function main() {
  await seedMembers();
  await seedConflitsCases();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
