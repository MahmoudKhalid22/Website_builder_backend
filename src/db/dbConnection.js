import mongoose from "mongoose";

function connection() {
  mongoose.connect(process.env.MONGODB_URL);

  mongoose.connection.once("open", () => console.log("db connected"));
}

export { connection };
