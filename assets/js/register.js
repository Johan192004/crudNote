// InputFields
let fullNameInput = document.getElementById("name")
let emailInput = document.getElementById("email")
let userNameInput = document.getElementById("username")
let passwordInput = document.getElementById("password")

//Form
let formRegister = document.getElementById("formRegister")

//Getting users

console.log(window.location)
document.addEventListener("DOMContentLoaded",async()=>{
    let users = await getUsers()
    console.log(users)

    formRegister.addEventListener("submit",async(e)=>{
        e.preventDefault()
    
        let fullName = fullNameInput.value.trim()
        let email = emailInput.value.trim()
        let userName = userNameInput.value.trim()
        let password = passwordInput.value.trim()

        let existentUser = false

        for(const user of users){

            if(user.email == email){
                alert(`El correo electronico ${email} ya esta registrado, porfavor ingrese otro`)
                existentUser = true
                break
            }
            if(user.username == userName){    
                alert(`El username ${userName} ya esta registrado, porfavor ingrese otro`)
                existentUser = true
                break                   
            } 

        }

        console.log("ExistentUser",existentUser)

        if(!existentUser){
            registerUser(fullName,email,userName,password)
            console.log("Te has registrado con exito")
            window.location = "login.html"
            console.log("Me voy")
        }
    })

})

async function registerUser(fullName,email,userName,password) {
    
    return await fetch("http://localhost:3000/users",{
        "method":"POST",
        "headers":{
            "Content-Type":"application/json"
        },
        "body": JSON.stringify({
            "name":fullName,
            "email":email,
            "username":userName,
            "password": password
        })
    })
        .then(response => {
            if(response.ok){
                console.log("Se ha registrado el usuario correctamente")
            }
        })
}


async function getUsers() {
    let resPromise = await fetch("http://localhost:3000/users")
    let res = await resPromise.json()
    return res
}