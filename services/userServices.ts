import type { User } from "@prisma/client"
import type { UserRegistration } from "~/types/types"

export const register = async (email: string, password: string) => {
  const user: UserRegistration = { email, password }
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  return response.ok
}
