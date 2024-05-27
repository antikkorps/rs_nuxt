import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const posts = await prisma.post.findMany()
    return {
      posts,
    }
  } catch (err: unknown) {
    return {
      error: err.message,
    }
  }
})
