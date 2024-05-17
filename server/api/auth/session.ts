export default defineEventHandler(async (event) => {
  const { access_token: accessToken } = await readBody(event)
  console.log("accesstoken dans /session", accessToken)
  const response = await fetch("http://inkagram.mimach.cloud/api/v1/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const session = await response.json()
  return session
})
