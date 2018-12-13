import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import passportConfig from "@/middlewares/passport";
import routes from "@/routes";
import headers from "@/utils/headers";
import notFound from "@/utils/notFoundHandler";
import errorHandler from "@/utils/errorHandler";
import responseFormat from "@/utils/responseFormat";

dotenv.load();

mongoose.connect(
  `mongodb://${process.env.MONGODB_USER}:${
    process.env.MONGODB_PSWD
  }@ds018708.mlab.com:18708/soundify`,
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

mongoose.Promise = global.Promise;

const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//Passport middleware
app.use(passport.initialize());

//Passport config
passportConfig(passport);

/**
 * Set Request Headers
 */
app.use(headers);

app.get("/", (req, res) => {
  res.send("Soundify Backend");
});

/**
 * Routing
 */
app.use(routes);

/**
 * 404 Handler
 */
app.use(notFound);

/**
 * Errors handler
 */
app.use(errorHandler);

/**
 * Response format
 */
app.use(responseFormat);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
