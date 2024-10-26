import { PrismaClient } from "@prisma/client"
import { getServerSession } from "#auth"
import { authOptions } from "../auth/[...]"
import { PostTypeZod } from "~/schemas/post-schema"

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
      const body: PostTypeZod = await readBody(event)
      
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
          user_status: body.user_status
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
