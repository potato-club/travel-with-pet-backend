import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/travel-pet-backend");

const db = mongoose.connection;

console.log("good!");
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
