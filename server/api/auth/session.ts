export default defineEventHandler(async (event) => {
  const { access_token: accessToken } = await readBody(event)
  const response = await fetch("http://inkagram.mimach.cloud/api/v1/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
  console.log("accesstoken dans /session", accessToken)

  const session = await response.json()
  return session
})
