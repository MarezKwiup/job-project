import express from "express";

import dotenv from "dotenv";

import "express-async-errors"

import morgan from "morgan"

//db and authenticateUser
import connectDB from "./db/connect.js";


//routers
import authRouter from "./routes/authRoutes.js"
import jobsRouter from "./routes/jobsRoutes.js"
dotenv.config();
const app = express();

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js"

//importing build tools
import {dirname} from "path"
import { fileURLToPath } from "url";
import path from "path";

//security
import helmet from "helmet";
import xss from 'xss-clean';
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
 

//morgan check for not production
if(process.env.NODE_ENV!=="production"){
  app.use(morgan("dev"))
}

const ___dirname=dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(___dirname,"./client/build")))//this is where static assestes will be located
app.use(express.json())
app.use(cookieParser())
//security
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.get("/", (req, res) => {
  res.json({msg:"Welcome"});
});

app.get("/api/v1", (req, res) => {
  res.json({msg:"API"});
});

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/jobs",authenticateUser,jobsRouter)

app.get("*",(req,res)=>{
  res.sendFile(path.resolve(___dirname,"./client/build","index.html"))
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 4000;


const start = async () => {
  try {
    console.log("Here")
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start()
