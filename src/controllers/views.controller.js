

export const viewscontroller = {
    MAIN: (req, res) => res.render("register.ejs", {title: "register sahifasi"}),
    USER_PAGE: async (req, res) =>{
        const todos = await req.readFile("todoList.json");
        const {userId} = req.params;
        const todoList = todos.find(list => list.userId == userId);
        res.render("userPage.ejs", {title: "Foydalanuvchi sahifasi", todos: todoList.todos.reverse()});
    },
    LOGIN: (req, res) => res.render("login.ejs", {title: "login sahifasi"}), 
    ACTIVE_TODOS: async (req, res) => {
        const todos = await req.readFile("todoList.json");
        const {userId} = req.params;
        const todoList = todos.find(list => list.userId == userId);
        if(todoList.todos.length) {
            const activeTodos = todoList.todos.filter(todo => todo.completed);
            res.render("userPage.ejs", {title: "Foydalanuvchi sahifasi", todos: activeTodos.reverse()});
        } else {
            res.render("userPage.ejs", {title: "Foydalanuvchi sahifasi", todos: []});
        }
    },
    NO_ACTIVE_TODOS: async (req, res) => {
        const todos = await req.readFile("todoList.json");
        const {userId} = req.params;
        const todoList = todos.find(list => list.userId == userId);
        if(todoList.todos.length) {
            const noActiveTodos = todoList.todos.filter(todo => !todo.completed);
            res.render("userPage.ejs", {title: "Foydalanuvchi sahifasi", todos: noActiveTodos.reverse()});
        } else {
            res.render("userPage.ejs", {title: "Foydalanuvchi sahifasi", todos: []});
        }
    }  
}