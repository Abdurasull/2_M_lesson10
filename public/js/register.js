const elform = document.getElementById("registerPage");

async function getData(data) {
    const response = await fetch("http://localhost:4000/api/auth/register",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const result = await response.json();
    return result;
}
elform.addEventListener("submit", async (evt) =>{
    evt.preventDefault();
    const data = new FormData(elform);
    const result = await getData(Object.fromEntries(data));
    if(result.status == "201") {
        window.localStorage.setItem("token", result.token);
        window.localStorage.setItem("user", JSON.stringify(result.userInfo));
        window.location.href = `/userPage/${result.userInfo.userId}`;
    } else {
        document.querySelector(".Error").textContent = result;
    }
})