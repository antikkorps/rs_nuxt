import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";
import { isUserSalonOwner } from "~/services/salonServices";
import { SalonSchema } from "~/schemas/salon-schema";
import { z } from "zod";
import { slugServices } from "@/services";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const session = await getServerSession(event, authOptions);

  if (event.method == "GET") {
  }

  if (event.method == "POST") {
    if (!session || !session?.user) {
      return;
    }
    const user = session.user;
    
    const body: z.infer<typeof SalonSchema> = await readBody(event)
    const validateData = SalonSchema.safeParse(body);
    if (!validateData.success) {
      return {
        statusCode: 422,
        body: "Invalid Field",
      };
    }
 
    if (validateData.data.id) {
      const checkOwner = isUserSalonOwner({ salonId: Number(validateData.data.id), user });
      if (!checkOwner) {
        return {
          statusCode: 403,
          body: "You are not the owner of this salon",
        };
      }
    }
    const slug = await slugServices.generateUniqueSlug(validateData.data.name, "salon");
    const salon = await prisma.salon.upsert({
      where: { id: validateData.data.id ?? 0 },
      create: {
        ...validateData.data,
        slug,
        userId: user.id,
      },
      update: {
        ...validateData.data,
        slug,
        userId: user.id,
      },
    });

    return salon;
  }


  if (event.method == "DELETE") {
  }
});
