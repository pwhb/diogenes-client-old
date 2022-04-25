import { clientPromise } from "$lib/mongodb/db"

// @ts-ignore
export async function post({ request }) {
  const { email, password } = await request.json()
  const error = {}
  if (!email || email.length < 4) {
    error.email = "email must be a valid email"
  }

  if (!password || password.length < 8) {
    error.password = "password must be at least 8 characters long"
  }


  if (Object.keys(error).length > 0) {
    return {
      status: 400,
      body: {
        error
      }
    }
  }

  const client = await clientPromise
  const db = client.db(import.meta.env.VITE_DBNAME)
  const col = db.collection("profiles")

  const userInDB = await col.findOne({ email })
  console.log("userInDB", userInDB)
  if (userInDB) {
    return {
      status: 201,
      body: {
        user: userInDB
      }
    }
  }

  return {
    status: 400,
    body: {
      error: {
        general: `no profile was created using this email ${email}. please sign up first.`
      }
    }
  }
}
