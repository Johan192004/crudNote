//Inputs

let userOrEmailInput = document.getElementById("username")
let passwordInput = document.getElementById("password")

//Form
let formLogIn = document.getElementById("formLogIn")

document.addEventListener("DOMContentLoaded", async()=>{
    let users = await getUsers()
    console.log(users)


    formLogIn.addEventListener("submit",async(e)=>{

        console.log("sdadsa")
        e.preventDefault();



        const userOrEmail = userOrEmailInput.value.trim()
        const password = passwordInput.value.trim()

        
        for(const user of users){
            if(user.username == userOrEmail || user.email == userOrEmail){

                if(user.password == password){

                    window.location = "../../index.html"
                    console.log("Bienvenido")

                } else {
                    console.log("Contraseña incorrecta")
                }

            }
        } 

    })
})

async function getUsers() {
    let resPromise = await fetch("http://localhost:3000/users")
    let res = await resPromise.json()
    return res
}