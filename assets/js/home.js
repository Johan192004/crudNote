if(window.sessionStorage.getItem("auth")){
    if(window.sessionStorage.getItem("auth") == "true"){
        console.log("Log in successfuly")

        

        document.addEventListener("DOMContentLoaded",async()=>{

            const buttonSignOut = document.getElementById("signOut")
            buttonSignOut.addEventListener("click",()=>{
                window.sessionStorage.setItem("auth",false)
                window.location = "../../index.html"
            })

            const newNoteButton = document.getElementById("newNote")
            newNoteButton.addEventListener("click",()=>{

                let mainElement = document.querySelector("main")
                mainElement.innerHTML = `<div class="upperDiv row">
            <div>
                <h2>Meeting Notes</h2>
                <textarea name="" id="description" class="form-control"></textarea>
            </div>
        </div>
        <div class="lowerDiv row">
            <div class="d-flex justify-content-end w-100">
                <a href="" class="btn btn-primary mx-4 btn-create-note">Save Changes</a>
                <a href="" class="btn btn-secondary mx-4 btn-create-note">Share Note</a>
            </div>
            <div class="d-flex justify-content-end w-100 mt-4">
                <a href="" class="btn btn-secondary mx-4 btn-create-note">Delete Note</a>
            </div>
        </div>`
            })

            const idUser = window.sessionStorage.getItem("idUser")

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