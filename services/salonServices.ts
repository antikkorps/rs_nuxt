import type { User } from "@auth/core/types";
import type { z } from "zod";
import { SalonSchema } from "~/schemas/salon-schema";

export const upsertSalon = async (salon: z.infer<typeof SalonSchema>) => {
  const response = await fetch(`/api/v1/salon`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(salon),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch like count");
  }
  const data = await response.json();
  return data;
};


export const getSalonById = async (id: number) => {
  const response = await fetch(`/api/v1/salon/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch salon");
  }
  const data = await response.json();
  return data;
};
export const isUserSalonOwner = async ({
  salonId,
  user,
}: {
  salonId: number;
  user: User;
}) => {
  const salon = await getSalonById(salonId);
  return salon.userId === user.id;
};
