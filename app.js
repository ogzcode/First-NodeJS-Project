import express from "express";
import methodOverride from "method-override";

import { getAllTodos, getAddPage, addTodo, deleteTodo } from "./controllers/todoControllers.js";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(methodOverride("_method", {
  methods: ["GET", "POST"]
}));

app.get("/", getAllTodos);

app.get("/add", getAddPage);

app.post("/add", addTodo);

app.delete("/delete/:id", deleteTodo);

app.listen(3000, () => {
  console.log("Sunucu : http://localhost:3000/");
});
