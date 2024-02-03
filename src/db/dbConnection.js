import mongoose from "mongoose";

function connection() {
  mongoose.connect("mongodb://127.0.0.1:27017/auth");

  mongoose.connection.once("open", () => console.log("db connected"));
}

export { connection };
