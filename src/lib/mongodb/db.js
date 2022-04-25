import { MongoClient } from "mongodb";

const client = new MongoClient(import.meta.env.VITE_MONGODB_URI)
export const clientPromise = client.connect()
