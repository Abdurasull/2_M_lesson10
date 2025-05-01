export const viewscontroller = {
    MAIN: (req, res) => res.render("register.ejs", {title: "register sahifasi"}),
    USER_PAGE: async (req, res) =>{
        const todos = await req.readFile("todoList.json");
        const {userId} = req.params;
        const todoList = todos.find(list => list.userId == userId);
        res.render("userPage.ejs", {title: "Foydalanuvchi sahifasi", todos: todoList.todos});
    },
    LOGIN: (req, res) => res.render("login.ejs", {title: "login sahifasi"}),   
}