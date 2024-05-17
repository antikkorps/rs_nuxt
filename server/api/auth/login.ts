export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  //define function to post the login credentials to the backend server and return the response
  const response = await fetch("http://inkagram.mimach.cloud/api/v1/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  const data = await response.json()
  const accessToken = data.access_token

  console.log(accessToken)
  return { token: accessToken }
})
