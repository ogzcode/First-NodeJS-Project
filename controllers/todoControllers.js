import { nanoid } from "nanoid";
import { readFileSync, writeFileSync } from "fs";

export function getAllTodos(req, res) {
  let todos = JSON.parse(readFileSync("./models/todo.json")).todos;
  res.render("home", { todos });
}

export function getAddPage(req, res) {
  res.render("add");
}

export function addTodo(req, res) {
  let todos = JSON.parse(readFileSync("./models/todo.json")).todos;

  todos.push({
    id: nanoid(),
    title: req.body.todo,
    completed: false,
  });

  writeFileSync(
    "./models/todo.json",
    JSON.stringify({ todos: todos }, null, 2),
    "utf8"
  );

  res.redirect("/");
}

export function deleteTodo(req, res) {
  let todos = JSON.parse(readFileSync("./models/todo.json")).todos;

  let item = todos.find((todo) => todo.id === req.params.id);
  let index = todos.indexOf(item);
  todos.splice(index, 1);
  
  writeFileSync(
    "./models/todo.json",
    JSON.stringify({ todos: todos }, null, 2),
    "utf8"
  );
  
  res.redirect("/");
}
