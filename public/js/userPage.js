const elConsole = document.querySelector(".cancel");
const elEdit = document.querySelector(".edit");
const elModal = document.querySelector("#editModal");
const elAddTodo = document.querySelector(".js-add-todo");
const ElNewTodo = document.querySelector(".js-new-todo");
const elFormAddTodo = document.querySelector(".add-todo");

const elModalForm = document.querySelector(".modal-content");

const elUsername = document.querySelector(".js-username");
const elEmail = document.querySelector(".js-bio");

// Todoga ma`lumot qo`shish uchun
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

// Todo ma`lumotini o`zgartrish uchun
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

// Agar Foydalanuvchi ruyxatdan o`tgan bo`lsa ishlaydi
if(window.localStorage.getItem("user")) {

    elUsername.textContent = "";
    elEmail.textContent = "";

    elUsername.textContent = JSON.parse(window.localStorage.getItem("user")).name;
    elEmail.textContent = JSON.parse(window.localStorage.getItem("user")).email;



    elConsole.addEventListener("click", () => {
        elModal.style.display = "none";
    });

    elFormAddTodo.addEventListener("submit", async (evt) => {
        evt.preventDefault();
        const data = new FormData(evt.target);
        const newData = Object.fromEntries(data.entries());
        
        const result = await addTodo({...newData, userId: JSON.parse(window.localStorage.getItem("user")).userId});
        if(result.status == 201) window.location.href = `/userPage/${JSON.parse(window.localStorage.getItem("user")).userId}`;
        ElNewTodo.value = "";
    });

    document.querySelector(".todo-list").addEventListener("click", (evt) => {
        evt.preventDefault();
        if(evt.target.dataset.idedit){
            const todoId = evt.target.dataset.idedit;
            elModal.style.display = "block";
            elModalForm.addEventListener("submit", async (evt) => {
                evt.preventDefault();
                const data = new FormData(elModalForm);
                const newData = Object.fromEntries(data.entries());
                console.log(newData);
                evt.target.reset();

                
                // console.log({...newData, todoId: todoId, userId: JSON.parse(window.localStorage.getItem("user")).userId}); 
            });
        
        }
    });

} else {
    window.location.href = "/";
    alert("Avval ro`yxatdan o`ting");
}