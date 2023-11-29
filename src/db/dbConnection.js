import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/grad-project");

mongoose.connection.once("open", () => console.log("db connected"));

export default {
  mongoose,
};
