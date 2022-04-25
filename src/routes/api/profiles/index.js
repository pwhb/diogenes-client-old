import { clientPromise } from "$lib/mongodb/db"

// @ts-ignore
export async function get() {
  const client = await clientPromise
  const db = client.db(import.meta.env.VITE_DBNAME)
  const col = db.collection("profiles")
  try {

    const profiles = await col.find({}).toArray()
    console.log(profiles)
    return {
      status: 200,
      body: {
        profiles
      }
    }
  } catch (e) {
    return {
      status: 400,
      body: e
    }
  }
}

// @ts-ignore
export async function post({ request }) {

  const body = await request.json()
  const client = await clientPromise
  const db = client.db(import.meta.env.VITE_DBNAME)
  const col = db.collection("profiles")
  try {

    const profile = await col.insertOne(body)
    return {
      status: 200,
      body: {
        profile
      }
    }
  } catch (e) {
    return {
      status: 400,
      body: e
    }
  }
}
