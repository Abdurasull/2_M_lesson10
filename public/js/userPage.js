const elConsole = document.querySelector(".cancel");
const elEdit = document.querySelector(".edit");
const elModal = document.querySelector("#editModal");
const elAddTodo = document.querySelector(".js-add-todo");
const ElNewTodo = document.querySelector(".js-new-todo");
const elFormAddTodo = document.querySelector(".add-todo");
const elExit = document.querySelector(".logout-btn");
const elAllTodos = document.querySelector(".All_todos");
const elActiveTodos = document.querySelector(".active_todos");
const elNoActiveTodos = document.querySelector(".no_active_todos")

const elModalForm = document.querySelector(".modal-content");

const elUsername = document.querySelector(".js-username");
const elEmail = document.querySelector(".js-bio");

// Todoga ma`lumot qo`shish uchun function
async function addTodo(data){
    const response = await fetch("http://localhost:4000/api/auth/add", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

// Todo ma`lumotini o`zgartrish uchun function
async function editTodo(data){
    const response = await fetch("http://localhost:4000/api/auth/Edit",{
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    });
    return await response.json();
};

// Todo ma`lumotini o`chirish uchun function
async function deleteTodo(data){
    const response = await fetch("http://localhost:4000/api/auth/delete",{
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    });
    return await response.json();
};

// Todo elementini bajarilgan qilib belgilash uchun function
async function doneTodo(data){
    const response = await fetch("http://localhost:4000/api/auth/done",{
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    });
    return await response.json();
};


// Agar Foydalanuvchi ruyxatdan o`tgan bo`lsa ishlaydi
if(window.localStorage.getItem("user")) {

    elUsername.textContent = "";
    elEmail.textContent = "";

    elUsername.textContent = JSON.parse(window.localStorage.getItem("user")).name;
    elEmail.textContent = JSON.parse(window.localStorage.getItem("user")).email;



    elConsole.addEventListener("click", () => {
        elModal.style.display = "none";
    });

    // Todo ma`lumotini qo`shish
    elFormAddTodo.addEventListener("submit", async (evt) => {
        evt.preventDefault();
        const data = new FormData(evt.target);
        const newData = Object.fromEntries(data.entries());
        
        const result = await addTodo({...newData, userId: JSON.parse(window.localStorage.getItem("user")).userId});
        if(result.status == 201) window.location.href = `/userPage/${JSON.parse(window.localStorage.getItem("user")).userId}`;
    });

    
    document.querySelector(".todo-list").addEventListener("click", (evt) => {
        evt.preventDefault();
        // Todo ma`lumotini o`zgartirish
        if(evt.target.dataset.idedit){
            const todoId = evt.target.dataset.idedit;
            elModal.style.display = "block";
            elModalForm.addEventListener("submit", async (evt) => {
                const data = new FormData(elModalForm);
                const newData = Object.fromEntries(data.entries());
                const result = await editTodo({...newData, todoId: todoId, userId: JSON.parse(window.localStorage.getItem("user")).userId});
                if(result.status == 200) {
                    window.location.href = `/userPage/${JSON.parse(window.localStorage.getItem("user")).userId}`;
                    evt.target.reset();
                }
            });
        
        };
        // Todo ma`lumotini o`chirish
        if(evt.target.dataset.iddelete){
            const todoId = evt.target.dataset.iddelete;
            deleteTodo({todoId: todoId, userId: JSON.parse(window.localStorage.getItem("user")).userId});
            window.location.href = `/userPage/${JSON.parse(window.localStorage.getItem("user")).userId}`;

        };
        // Todo elementini bajarilgan qilib belgilash
        if(evt.target.dataset.iddone){
            const todoId = evt.target.dataset.iddone;
            doneTodo({todoId: todoId, userId: JSON.parse(window.localStorage.getItem("user")).userId});
            window.location.href = `/userPage/${JSON.parse(window.localStorage.getItem("user")).userId}`;
        }
    });

    // profildan chiqish uchun
    elExit.addEventListener("click", () => {
        window.localStorage.removeItem("user");
        window.location.href = '/login';
    });

    elAllTodos.addEventListener("click", () => {
        window.location.href = `/userPage/${JSON.parse(window.localStorage.getItem("user")).userId}`;
    });
    elActiveTodos.addEventListener("click", () => {
        window.location.href = `/activeTodos/${JSON.parse(window.localStorage.getItem("user")).userId}`;
    });
    elNoActiveTodos.addEventListener("click", () => {
        window.location.href = `/noActiveTodos/${JSON.parse(window.localStorage.getItem("user")).userId}`;
    })


} else {
    window.location.href = "/";
    alert("Avval ro`yxatdan o`ting");
}