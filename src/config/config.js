import fastifySession from "@fastify/session";
import ConnectMongoDBSession from "connect-mongodb-session";
import "dotenv/config";
import { Admin } from "../models/index.js";

export const PORT = process.env.PORT || 3000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;

const MongoDBStore = ConnectMongoDBSession(fastifySession);

export const sessionStore = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

sessionStore.on("error", (error) => {
  console.log("Session store error:", error);
});

export const authenticate = async (email, password) => {
  // UNCOMMENT WHEN CREATING ADMIN MANUALLY FOR THE FIRST TIME
  // if (email && password) {
  //   if (
  //     email === "your-admin-email" &&
  //     password === "your-admin-password"
  //   )
  //     return Promise.resolve(email, password);
  //   else return null;
  // }

  // UNCOMMENT WHEN ALREADY CREATED ADMIN MANUALLY ON DATABASE
  if (email && password) {
    const user = await Admin.findOne({ email });

    if (!user) return null;

    if (user.password === password) return user;
    else return null;
  }

  return null;
};
