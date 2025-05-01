import pkg from "jsonwebtoken";
import { globalError } from "../utils/error.js";
import { jwtToken } from "../lib/jwt.js";
import sha256 from "sha256";
const {sign, verify} = pkg;

export const authController = {
    REGISTER: async (req, res) => {
        try{
            const newUser = req.body;
            const users = await req.readFile("users.json");
            newUser.id = users.length ? users.at(-1).id + 1 : 1;
            newUser.password = sha256(newUser.password);
            const token = jwtToken.createToken({id: newUser.id, email: newUser.email});
            users.push(newUser);

            // hae bir yangi qo`shilgan user uchun todo listi yaratamiz(dastalab bo`sh bo`lishi kerak)
            const newTodoList = {
                userId: newUser.id,
                todos: []
            };
            const todoLists = await req.readFile("todoList.json");
            todoLists.push(newTodoList);
            await req.writeFile("todoList.json", todoLists);
            
            await req.writeFile("users.json", users);
            return res.status(201).json({
                message: "User created successfully",
                status: 201,
                token: token,
                userInfo: {
                    userId: newUser.id,
                    name: newUser.username,
                    email: newUser.email
                }
            });
            
        }catch(err){
            globalError(err, res);
        }
    },
    ADDTODO: async (req, res) => {
        try{
            const todo = req.body;
            
            const todoLists = await req.readFile("todoList.json");
            const todoList = todoLists.find(list => list.userId == todo.userId);
            const id = todoList.todos.length ? todoList.todos.at(-1).id + 1 : 1;
            const newTodo = {
                id: id,
                title: todo.newTodo,
                completed: false
            }
            todoList.todos.push(newTodo);
            todoList.todos.reverse();
            await req.writeFile("todoList.json", todoLists);
            return res.status(201).json({message:"Todo added successfully", status: 201});

        }catch(err){
            globalError(err, res);
        }
    }
}