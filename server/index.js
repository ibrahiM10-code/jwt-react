import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/apiRoutes.js";

const DBHOST = "mongodb://127.0.0.1:27017/testingDB";
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api", router);

async function connectDB() {
    try {
        mongoose.connection.on('connected', () => console.log('Successfull DB connection!'));
        await mongoose.connect(DBHOST);
    } catch (error) {
        console.error(error);
    }
}

connectDB();

app.listen(PORT, () => console.log("Server running on port", PORT));