import app from "./src/app.js";
// import { connectDB } from "./src/db/db.js";

import mongoose from "mongoose";
import { DB_NAME } from './constants.js'
let connectioninstance;
const connectDB = async () => {
    try {
        connectioninstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
        console.log(`MongoDB Connected\nHost: ${connectioninstance.connection.host}`)
      } catch (error) {
        console.log(`Database connection error: ${error}`)
        throw error;
      }
    }

// Database connection
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () =>
      console.log(`Server started on port: ${process.env.PORT}`),
    );
  })
  .catch((error) => {throw error});