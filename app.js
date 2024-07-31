import express from "express";
import cors from "cors";
import auth from "./src/routes/auth.js";
import todo from "./src/routes/todo.js";
import bodyparser from "body-parser";
export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(
  bodyparser.json({
    limit: "50mb",
  })
);

app.use("/auth", auth);
app.use("/todo", todo);