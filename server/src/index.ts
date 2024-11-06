import express, { Express } from 'express';
import mongoose from 'mongoose';
import financialRecordRouter from "./routes/financial-record"
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = "mongodb+srv://akshaygopan73:glhcpGdOrhmsBkeX@expensetracker.agxexc6.mongodb.net/";

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

//Routes
app.use("/financial-record", financialRecordRouter);

app.listen(port, () => {
console.log(`Server Running on Port ${port}`);
});