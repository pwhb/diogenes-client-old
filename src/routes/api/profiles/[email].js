import { clientPromise } from "$lib/mongodb/db"

// @ts-ignore
export async function get({ params }) {
  const { email } = params
  const client = await clientPromise
  const db = client.db(import.meta.env.VITE_DBNAME)
  const col = db.collection("profiles")
  try {

    const profile = await col.findOne({ email })
    if (profile) {
      return {
        status: 200,
        body: {
          profile
        }
      }
    }

    return {
      status: 404
    }
  } catch (e) {
    return {
      status: 400,
      body: e
    }
  }
}
