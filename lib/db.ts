import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!; // ! -> meaans it tells typescript Trust me, this value exists.

if (!MONGODB_URI) {
    throw new Error("Please define mongo_uri in env variable...")
}

let cached = global.mongoose // This variable stores the cached connection so the app reuses it instead of creating a new one.


if (!cached) {
   cached =   global.mongoose = {conn: null, promise: null}
}

export async function connectToDatabase() {
    if (cached.conn) { // if already connected
        return cached.conn
    }

    if (!cached.promise) { // connection is not started yet

        const options = {
            bufferCommands : true,
            maxPoolSize: 10
        }


      cached.promise =  mongoose.connect(MONGODB_URI, options)
        .then(()=> mongoose.connection)
    }

    try {
        cached.conn = await cached.promise // Wait until DB connects - Get connection object - tore it in cached.conn
    } catch (error) {
        cached.promise = null
        throw error
    }
}