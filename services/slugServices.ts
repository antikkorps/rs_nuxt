import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateUniqueSlug = async (
  sluggable: string,
  model: string
) => {
  let counter = 0;
  let uniqueSlug = "";

  const baseSlug = sluggable
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/'/g, "")
    .toLowerCase()
    .replace(/ /g, "-");

  while (true) {
    uniqueSlug = counter === 0 ? baseSlug : `${baseSlug}_${counter}`;
    const existingSlug = await getExistingSlug(uniqueSlug, model);
    if (!existingSlug) {
      break;
    }
    counter++;
  }
  return uniqueSlug;
};

const getExistingSlug = async (slug: string, model: string) => {
  // Utilisation de l'indexation dynamique pour accéder au modèle
  //@ts-ignore
  return await prisma[model].findFirst({
    where: {
      slug,
    },
  });
};
