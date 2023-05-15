import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./Config/db.js";
import categoryRoute from "./Routes/categoryRoute.js";
import topicRoute from "./Routes/topicRoute.js";
import subcategoryRoute from "./Routes/subcategoryRoute.js";
import cardRoute from "./Routes/cardRoute.js";
import deckRoute from "./Routes/deckRoute.js";
import voteRoute from "./Routes/voteRoute.js";
import savedRoute from "./Routes/savedDeckRoute.js";
import userfollowerRoute from "./Routes/userfollowerRoute.js";
import topicfollowerRoute from "./Routes/topicfollowerRoute.js";

dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5000;
const PORT2 = process.env.PORT || 3000;
const app = new express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development"){
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

//route gose her
app.use("/category", categoryRoute);
app.use("/topic", topicRoute);
app.use("/subcategory", subcategoryRoute);
app.use("/deck", deckRoute);
app.use("/card", cardRoute);
app.use("/vote", voteRoute);
app.use("/userfollower", userfollowerRoute);
app.use("/topicfollower", topicfollowerRoute);
app.use("/saved", savedRoute);






app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
  ); 