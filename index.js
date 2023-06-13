import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-6237e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesInDB = ref(database, "todo")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(moviesInDB, inputValue)
    
    console.log(`${inputValue} added to database`)
})





const booksInDB = ref(database, "todo")

const booksEl = document.getElementById("todo")

// onValue(booksInDB, function(snapshot) {
//     console.log(snapshot)
// })
onValue(booksInDB, function(snapshot) {
    let booksArray = Object.values(snapshot.val())
        clearBooksListEl()
    for (let i = 0; i < booksArray.length; i++) {
        let currentBook = booksArray[i]
        appendBookToBooksListEl(currentBook)
    }
})

function clearBooksListEl() {
    booksEl.innerHTML = ""
}

function appendBookToBooksListEl(bookValue) {
    booksEl.innerHTML += `<li>${bookValue}</li>`
}