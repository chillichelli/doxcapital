import z from "zod"

const AuthTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
  jti: z.string(),
})

export async function getAuthToken() {
  const res = await fetch("https://app.idealista.com/api/oauth/token", {
    method: "POST",
    headers: {
      authorization:
        "Basic NTVjMGU5MmEwY2I4YzViOTIxMDdkM2JkNjg4ZTA5YmU6aWRlYSUzQmlwaDBuMw==",
      "content-type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    body: "grant_type=client_credentials&scope=write",
  })

  const data = await res.json()
  return AuthTokenSchema.parse(data)
}
