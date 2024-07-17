import { PrismaClient } from "@prisma/client"
import type { PostBody } from "~/types/posts"
import { getServerSession } from "#auth"
import { authOptions } from "../auth/[...]"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event, authOptions)
    if (!session || !session.user) {
      return {
        statusCode: 401,
        body: "Unauthorized",
      }
    }

    if (event.method === "POST") {
      const body: PostBody = await readBody(event)
      if (!body.title || !body.description) {
        return {
          statusCode: 400,
          body: "Title and description are required",
        }
      }

      const post = await prisma.post.create({
        data: {
          title: body.title,
          description: body.description,
          userId: session.user.id,
        },
      })

      return {
        statusCode: 200,
        body: { message: "Post created successfully", post },
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: "Internal Server Error",
    }
  }
})
