import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
//   const session = await getServerSession(event, authOptions);

  let salon = null;

  try {
    if (!id) {
      return {
        error: "Id is required",
      };
    }

    salon = await prisma.salon.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!salon) {
      return {
        error: "Salon not found",
      };
    }

    return salon;
  } catch (error) {
    return {
      error: err.message,
    };
  }
});
