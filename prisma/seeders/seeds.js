import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Create roles
  let adminRole = await prisma.role.findUnique({
    where: {
      slug: "ADMIN",
    },
  })

  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        slug: "ADMIN",
        name: "Admin",
      },
    })
  }

  let userRole = await prisma.role.findUnique({
    where: {
      slug: "USER",
    },
  })

  if (!userRole) {
    userRole = await prisma.role.create({
      data: {
        slug: "USER",
        name: "User",
      },
    })
  }

  // Create an admin user
  let adminUser = await prisma.user.findUnique({
    where: {
      email: "admin@example.com",
    },
  })
  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        email: "admin@example.com",
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
        roles: {
          create: {
            role: {
              connect: {
                slug: "ADMIN",
              },
            },
          },
        },
        avatar: faker.image.avatar(),
        pseudo: "admin@example.com",
      },
    })
  }
  // Create a simple user for testing purposes
  let testUser = await prisma.user.findUnique({
    where: {
      email: "user@example.com",
    },
  })

  if (!testUser) {
    testUser = await prisma.user.create({
      data: {
        email: "user@example.com",
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
        roles: {
          create: {
            role: {
              connect: {
                slug: "USER",
              },
            },
          },
        },
        avatar: faker.image.avatar(),
        pseudo: "user@example.com",
      },
    })
  }

  //Create 10 posts
  for (let i = 0; i < 10; i++) {
    await prisma.post.create({
      data: {
        userId: testUser.id,
        views: faker.number.int({ min: 0, max: 10000 }),
        repost: faker.number.int({ min: 0, max: 10000 }),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(),
        mediaPosts: {
          create: {
            url: faker.image.urlPicsumPhotos({ width: 480, height: 640 }),
          },
        },
      },
    })
  }

  //   // Create 10 regular users
  //   for (let i = 0; i < 10; i++) {
  //     await prisma.user.create({
  //       data: {
  //         email: faker.internet.email(),
  //         password: await bcrypt.hash(faker.internet.password(), 10),
  //         avatar: faker.image.avatar(),
  //         role: "USER",
  //         pseudo: user.email,
  //       },
  //     })
  //   }

  //   // Create 10 companies
  //   for (let i = 0; i < 10; i++) {
  //     await prisma.company.create({
  //       data: {
  //         name: faker.company.name(),
  //         address: faker.location.streetAddress(),
  //         city: faker.location.city(),
  //         zipcode: faker.location.zipCode(),
  //         country: faker.location.country(),
  //         logo: faker.image.urlPlaceholder({ width: 128, height: 128 }),
  //       },
  //     })
  //   }

  //message during seed process
  console.log("Seeding finished. It's all good!")
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
