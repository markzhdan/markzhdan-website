import mongoose from "mongoose";

declare global {
  var _mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null } | undefined;
}

let cached = global._mongoose ?? { conn: null, promise: null };
global._mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.ATLAS_URI!)
      .then((m) => {
        console.log(`MongoDB Connected: ${m.connection.host}`);
        return m.connection;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
