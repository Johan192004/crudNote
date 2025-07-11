if(window.sessionStorage.getItem("auth")){
    if(window.sessionStorage.getItem("auth") == "true"){
        console.log("Log in successfuly")

        

        document.addEventListener("DOMContentLoaded",async()=>{
            const idUser = window.sessionStorage.getItem("idUser")
            let users = await getUsers()
            let chosenUser = users.filter(element => element.id == idUser)[0]
            console.log(chosenUser.name)
            generarAvatarIniciales(chosenUser.name)

            let h1Welcome = document.querySelector(".welcome")
            h1Welcome.textContent = `Hello, ${chosenUser.name}`
            const buttonSignOut = document.getElementById("signOut")
            buttonSignOut.addEventListener("click",()=>{
                window.sessionStorage.setItem("auth",false)
                window.location = "../../index.html"
            })

            let newNoteButton = document.getElementById("newNote")
            newNoteButton.addEventListener("click",()=>{
                console.log(!document.getElementById("newNoteDiv"))
                if(!document.getElementById("newNoteDiv")){
                    let mainElement = document.querySelector("main")
                    oldHtml = mainElement.innerHTML
                    mainElement.innerHTML += `
                    <div id="newNoteDiv">
                        <div class="upperDiv row">
                            <div>
                                <h2>Meeting Notes</h2>
                                <textarea name="" id="description" class="form-control"></textarea>
                            </div>
                        </div>
                    <div class="lowerDiv row">
                        <div class="d-flex justify-content-end w-100">
                            <button href="" class="btn btn-primary mx-4 btn-create-note" id="saveChanges">Save Changes</button>
                            <button href="" class="btn btn-secondary mx-4 btn-create-note" id="shareNote">Share Note</button>
                        </div>
                        <div class="d-flex justify-content-end w-100 mt-4">
                            <button href="" class="btn btn-secondary mx-4 btn-create-note" id="deleteNote">Delete Note</button>
                        </div>
                    </div>
                    </div>`
                
                } else {
                    console.log("Entered the else")
                }
                
                

                let divFather = document.getElementById("first")
                divFather.classList.toggle("visible")

                const deleteNoteButton = document.getElementById("deleteNote");

                if (!deleteNoteButton.dataset.listenerAttached) {
                deleteNoteButton.addEventListener("click", () => {
                    const divCreateNode = document.getElementById("newNoteDiv");
                    divCreateNode.classList.toggle("visible");
                    divFather.classList.toggle("visible");
                });

                deleteNoteButton.dataset.listenerAttached = "true"; // flag para no duplicar eventos
                }

                
            })

            

            let notes = await getNotes()
            console.log(notes)
            console.log(notes[0].ownerid)
            console.log(idUser)
            let myNotes = notes.filter(x => x.ownerid == idUser)
                console

            if(myNotes.length >= 1){
                

                let myNotesDiv = document.querySelector(".myNotesDiv")
                console.log("Container",myNotesDiv)


                chargeMyNotes(myNotes,myNotesDiv)
            }


            let sharedNotes = notes.filter(z => z.sharedownersid.includes(idUser))
            console.log(sharedNotes)

            if(sharedNotes.length >= 1){

                let sharedNotesDiv = document.querySelector(".sharedNotesDiv")
                console.log(sharedNotesDiv)
                console.log("ndsakjndkjsandkjnsk")
                chargeSharedNotes(sharedNotes,sharedNotesDiv)
            }
            let myNotesDivFather = document.querySelector(".myNotesDivFather")
            let sharedNotesDivFather = document.querySelector(".sharedNotesDivFather")
            let allOption = document.getElementById("all")
            let sharedOption = document.getElementById("shared")
            let personalOption = document.getElementById("personalOption")
            personalOption.addEventListener("click",(e)=>{
                e.preventDefault()
 
                console.log(sharedNotesDivFather.classList.contains("visible"))


                //In case we are in all
                if(!sharedNotesDivFather.classList.contains("visible") && !myNotesDivFather.classList.contains("visible")){
                    sharedNotesDivFather.classList.toggle("visible")
                    allOption.classList.remove("active-option")
                    personalOption.classList.add("active-option")
                }
                
                
            })
             
 

        })

    } else {
        window.location = "../../index.html"
    }
} else {
    window.location = "../../index.html"
}



function chargeNote(note,container) {
    let noteCard = document.createElement("div")
    noteCard.innerHTML = `<div class="card note">
                        <div class="card-body">
                            <img src="../img/create.PNG" class="m-1">
                            <h3 class="card-title">${note.title}</h3>
                            <p class="text-truncate">${note.description}</p>
                        </div>
                    </div>`
    container.appendChild(noteCard)
}

function chargeMyNotes(notes,container) {
    for(const note of notes){
        chargeNote(note,container)
        console.log("Actual",note)
    }
}

function chargeSharedNotes(notes,container){
    for(const note of notes){
        chargeNote(note, container)
        console.log("Actual compartido",note)
    }
}


async function getUsers() {
    let resPromise = await fetch("http://localhost:3000/users")
    let res = await resPromise.json()
    return res
}


async function getNotes() {
    let resPromise = await fetch("http://localhost:3000/notes")
    let res = await resPromise.json()
    return res
}

//Funcion para generar las imagenes de perfil
function generarAvatarIniciales(nombreCompleto, canvasId = "avatar") {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

 
  const palabras = nombreCompleto.trim().split(" ");
  const iniciales = palabras.map(p => p[0].toUpperCase()).join("").slice(0, 2); 

  ctx.fillStyle = "#007bff"; // color de fondo
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `bold 18px Arial`;
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(iniciales, canvas.width / 2, canvas.height / 2);
}

