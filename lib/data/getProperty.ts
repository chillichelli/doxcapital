import { getAuthToken } from "@/lib/data/getAuthToken"

export async function getProperty(pid: number) {
  const { access_token } = await getAuthToken()
  const res = await fetch(
    `https://app.idealista.com/api/3/es/detail/${pid}?k=55c0e92a0cb8c5b92107d3bd688e09be&language=nl&t=3AE11237-0E17-4C95-9F15-128B5BA15A33`,
    {
      headers: { authorization: `Bearer ${access_token}` },
    }
  )

  return res.json()
}
