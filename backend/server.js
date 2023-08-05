import express from "express";

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
dotenv.config();
connectDB();



 
 import * as path from 'path';

import employeeRoutes from "./routes/employeeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();



const app = express(); // main thing

app.use(express.json()); // to accept json data

 app.use("/api/employees", employeeRoutes);
app.use("/api/users", userRoutes); 

/* 
// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------
 */
// Error Handling middlewares
/*  app.use(notFound);
app.use(errorHandler); */ 
app.get("/",(req,res)=>{
  res.send('Api is running')
})

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(
    `Server running in  mode on port  ${PORT}..`.yellow
    .bold
      
     
  )
);
