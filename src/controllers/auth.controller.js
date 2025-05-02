import pkg from "jsonwebtoken";
import { globalError } from "../utils/error.js";
import { jwtToken } from "../lib/jwt.js";
import sha256 from "sha256";
import moment from "moment";
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
                    email: newUser.email,
                    createdAt: null,
                    updatedAt: null
                }
            });
            
        }catch(err){
            globalError(err, res);
        }
    },
    LOGIN: async (req, res) => {
        try{
            const {email, password} = req.body;
            console.log(email, password);   
            const users = await req.readFile("users.json");
            const user = users.find(user => user.email === email && user.password === sha256(password));
            if(!user) throw new ClientError("Invalid email or password", 400);
            const token = jwtToken.createToken({id: user.id, email: user.email});
            return res.status(200).json({message:"Login success", status: 200, token: token, userInfo: {
                userId: user.id,
                name: user.username,
                email: user.email,
            }});
        }catch(err){
            globalError(err, res);
        }
    },
    ADDTODO: async (req, res) => {
        try{
            
            // vaqtni ifodalash uchun
            const formatted = moment().format('YYYY:MM:DD HH:mm');
    // {"userId":8,"name":"Ass@gmail.com","email":"abdurasulsalimghov94@gmail.com","createdAt":null,"updatedAt":null}
            
            const todo = req.body;
            const todoLists = await req.readFile("todoList.json");
            const todoList = todoLists.find(list => list.userId == todo.userId);

            const id = todoList.todos.length ? todoList.todos.at(-1).id + 1 : 1;
            const newTodo = {
                id: id,
                title: todo.newTodo,
                completed: '',
                createdAt: formatted,
                updatedAt: null
            }
            todoList.todos.push(newTodo);
            await req.writeFile("todoList.json", todoLists);
            return res.status(201).json({message:"Todo added successfully", status: 201});

        }catch(err){
            globalError(err, res);
        }
    },
    EDITTODO: async (req, res) => {
        try{
            // { editTodo: 'ggggg', todoId: '9', userId: 2 }
            const todo = req.body;
            const todoLists = await req.readFile("todoList.json");
            const newTodoList = todoLists.map(todoOb => todoOb.userId != todo.userId ? todoOb : {
                userId: todoOb.userId,
                todos: todoOb.todos.map(to => to.id != todo.todoId ? to : {
                    id: to.id,
                    title: todo.editTodo,
                    completed: to.completed,
                    createdAt: to.createdAt,
                    updatedAt: moment().format('YYYY:MM:DD HH:mm')
                })
            });
            await req.writeFile("todoList.json", newTodoList);
            return res.status(201).json({message:"Todo edited successfully", status: 200});
        }catch(err){
            globalError(err, res);
        }
    },
    DELETETODO: async (req, res) => {
        try{
            
            const {todoId, userId} = req.body;
            const todoLists = await req.readFile("todoList.json");
            const newTodoList = todoLists.map(todoOb => todoOb.userId != userId ? todoOb : {
                userId: todoOb.userId,
                todos: todoOb.todos.filter(to => to.id != todoId)
            });
            await req.writeFile("todoList.json", newTodoList);
            return res.status(200).json({message:"Todo deleted successfully", status: 200});
        }catch(err){
            globalError(err, res);
        }
    },
    DONETODO: async (req, res) => {
        try{
            
            const {todoId, userId} = req.body;
            const todoLists = await req.readFile("todoList.json");
            const newTodoList = todoLists.map(todoOb => todoOb.userId != userId ? todoOb : {
                userId: todoOb.userId,
                todos: todoOb.todos.map(to => to.id != todoId ? to : {
                    id: to.id,
                    title: to.title,
                    completed: !to.completed,
                    createdAt: to.createdAt,
                    updatedAt: to.updatedAt
                })
            });
            await req.writeFile("todoList.json", newTodoList);
            return res.status(200).json({message:"Todo deleted successfully", status: 200});
        }catch (err){
            globalError(err, res);
        }
    }


}