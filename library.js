
// TODO ADD FAVORITES

// TODO ADD ERROR WARNINGS TO DIALOGS
const dialogOpen = document.querySelector(".new-book");
const dialog = document.querySelector(".add-book-dialog");
const dialog2 = document.querySelector(".edit-book-dialog");
const dialogClose = document.getElementById("close-add-dialog");
const dialog2Close = document.getElementById("close-edit-dialog");

const addBookButton = document.getElementById("add-book")
const titleField = document.getElementById("title-field");
const authorField = document.getElementById("author-field");
const pagesReadField = document.getElementById("pages-read-field");
const totalPagesField = document.getElementById("total-pages-field");
const hasReadCheck = document.getElementById("checkbox");

const editBookButton = document.getElementById("edit-book");
const editTitleField = document.getElementById("edit-title-field");
const editAuthorField = document.getElementById("edit-author-field");
const editPagesReadField = document.getElementById("edit-pages-read-field");
const editTotalPagesField = document.getElementById("edit-total-pages-field");
const editHasReadCheck = document.getElementById("edit-checkbox");
let bookToEdit;
let myLibrary = JSON.parse(localStorage.getItem("library")) || [];

if(myLibrary.length === 0) {
    localStorage.setItem("lastID", 0);
}

let bookIDCounter = localStorage.getItem("lastID") || 0;
displayBooks();

document.addEventListener("click", (event) => {
    if(event.target.id === "delete") {
        removeBookFromLibrary(event);
    }

    if(event.target.id === "edit") {
        bookToEdit = event.target.closest(".book").id;
        dialog2.showModal();

        editTitleField.value = event.target.closest(".book").querySelector(".book-title").textContent;
        editAuthorField.value = event.target.closest(".book").querySelector(".book-author").textContent

        let pages = event.target.closest(".book").querySelector(".book-pages").textContent.split("/");
    
        editTotalPagesField.value = pages[1];
        editPagesReadField.value = pages[0];
        editHasReadCheck.checked = event.target.closest(".book").querySelector(".read-status").checked;
    }

    if(event.target.className === "read-status") {
        if(event.target.checked) {
            bookToEdit = event.target.closest(".book").id;
            let pages = event.target.closest(".book").querySelector(".book-pages").textContent.split("/");
            event.target.closest(".book").querySelector(".book-pages").textContent = pages[1] + "/" + pages[1];
            editBook(title, author, totalPages, totalPages, true);
        } else if(!event.target.checked) {
            event.preventDefault();
        }
    }
});

dialogOpen.addEventListener("click", (event) => {
    titleField.value = "";
    authorField.value = "";
    pagesReadField.value = "";
    totalPagesField.value = "";

    titleField.style.outline = "";
    authorField.style.outline = "";
    pagesReadField.style.outline = "";
    totalPagesField.style.outline = "";

    if(hasReadCheck.checked) {
        hasReadCheck.checked = !hasReadCheck.checked;
    }
    dialog.showModal();
});

dialogClose.addEventListener("click", (event) => {
    dialog.close();
});

dialog2Close.addEventListener("click", (event) => {
    dialog2.close();
});

// replace alerts
addBookButton.addEventListener("click", (event) => {

    title = titleField.value;
    author = authorField.value;
    totalPages = totalPagesField.value;
    pagesRead = pagesReadField.value;

    if(parseFloat(pagesRead) === parseFloat(totalPages)) {
        hasReadCheck.checked = true;
    }
    readStatus = hasReadCheck.checked;


    if(((title !== "" && title.replace(/ /g, "").length <= 35) && (author !== "" && author.replace(/ /g, "").length <= 35) 
        && pagesRead !== "" && totalPages !== "" && totalPages !== "0") 
        && (parseFloat(pagesRead) <= parseFloat(totalPages))) {

        addBookToLibrary(title, author, totalPages, pagesRead, readStatus);
        dialog.close();
    } else if(parseFloat(pagesRead) > parseFloat(totalPages)) {
        alert("pages read cannot be more than total pages");
    } else {
        alert("please enter all information");
    }

    displayBooks();
});

editBookButton.addEventListener("click", (event) => {
    title = editTitleField.value;
    author = editAuthorField.value;
    totalPages = editTotalPagesField.value;
    pagesRead = editPagesReadField.value;

    if(parseFloat(pagesRead) === parseFloat(totalPages)) {
        editHasReadCheck.checked = true;
    }
    readStatus = editHasReadCheck.checked;

    if(((title !== "" && title.replace(/ /g, "").length <= 35) && (author !== "" && author.replace(/ /g, "").length <= 35) 
        && pagesRead !== "" && totalPages !== "" && totalPages !== "0") 
        && (parseFloat(pagesRead) <= parseFloat(totalPages))) {
        editBook(title, author, totalPages, pagesRead, readStatus);
        dialog2.close();
    } else if(parseFloat(pagesRead) > parseFloat(totalPages)) {
        alert("pages read cannot be more than total pages");
    } else {
        alert("please enter all information");
    }

    displayBooks();
});

titleField.addEventListener("keyup", (event) => {
    if(titleField.value !== "" && titleField.value.replace(/ /g, "").length <= 35) {
        event.target.style.outline = "2px solid green";
    } else {
        event.target.style.outline = "2px solid red";
    }
});

editTitleField.addEventListener("keyup", (event) => {
    if(editTitleField.value !== "" && editTitleField.value.replace(/ /g, "").length <= 35) {
        event.target.style.outline = "2px solid green";
    } else {
        event.target.style.outline = "2px solid red";
    }
});

authorField.addEventListener("keyup", (event) => {
    if(authorField.value !== "" && authorField.value.replace(/ /g, "").length <= 35) {
        event.target.style.outline = "2px solid green";
    } else {
        event.target.style.outline = "2px solid red";
    }
});

editAuthorField.addEventListener("keyup", (event) => {
    if(editAuthorField.value !== "" && editAuthorField.value.replace(/ /g, "").length <= 35) {
        event.target.style.outline = "2px solid green";
    } else {
        event.target.style.outline = "2px solid red";
    }
});

pagesReadField.addEventListener("keydown", (event) => {
    pagesReadField.value = pagesReadField.value.replace(" ", "");
    if ((event.key >= 0 && event.key <= 9) || event.key === "Backspace") {
        if(pagesReadField.value.length >= 5 && event.key !== "Backspace") { 
            event.preventDefault();
        }
        return;
    } else {
        event.preventDefault();
    }
});

pagesReadField.addEventListener("keyup", (event) => {
    if(parseFloat(pagesReadField.value) === parseFloat(totalPagesField.value)) {
        hasReadCheck.checked = true;
        event.target.style.outline = "2px solid green";
    } else if(parseFloat(pagesReadField.value) > parseFloat(totalPagesField.value)) {
        // popup message
        hasReadCheck.checked = false;
        event.target.style.outline = "2px solid red";
    } else if(parseFloat(pagesReadField.value) < parseFloat(totalPagesField.value)) {
        hasReadCheck.checked = false;
        event.target.style.outline = "2px solid green";
    } else if(pagesReadField.value === "") {
        hasReadCheck.checked = false;
        event.target.style.outline = "2px solid red";
    } 
});

editPagesReadField.addEventListener("keydown", (event) => {
    editPagesReadField.value = editPagesReadField.value.replace(" ", "");
    if ((event.key >= 0 && event.key <= 9) || event.key === "Backspace") {
        if(editPagesReadField.value.length >= 5 && event.key !== "Backspace") { 
            event.preventDefault();
        }
        return;
    } else {
        event.preventDefault();
    }
});

editPagesReadField.addEventListener("keyup", (event) => {
    if(parseFloat(editPagesReadField.value) === parseFloat(editTotalPagesField.value)) {
        editHasReadCheck.checked = true;
        event.target.style.outline = "2px solid green";
    } else if(parseFloat(editPagesReadField.value) > parseFloat(editTotalPagesField.value)) {
        // popup message
        editHasReadCheck.checked = false;
        event.target.style.outline = "2px solid red";
    } else if(parseFloat(editPagesReadField.value) < parseFloat(editTotalPagesField.value)) {
        editHasReadCheck.checked = false;
        event.target.style.outline = "2px solid green";
    } else if(editPagesReadField.value === "") {
        editHasReadCheck.checked = false;
        event.target.style.outline = "2px solid red";
    }
});

totalPagesField.addEventListener("keydown", (event) => {
    totalPagesField.value = totalPagesField.value.replace(" ", "");
    if ((event.key >= 0 && event.key <= 9) || event.key === "Backspace" || event.key === "Tab") {
        if(totalPagesField.value.length >= 5 && event.key !== "Backspace" && event.key !== "Tab") { 
            event.preventDefault();
        }
        return;
    } else {
        event.preventDefault();
    }
});

totalPagesField.addEventListener("keyup", (event) => {
    if(totalPagesField.value !== "" && totalPagesField.value !== "0") {
        event.target.style.outline = "2px solid green";
    } else {
        event.target.style.outline = "2px solid red";        
    }

    if(parseFloat(totalPagesField.value) === parseFloat(pagesReadField.value)) {
        hasReadCheck.checked = true;
    } else {
        hasReadCheck.checked = false;
    }
});

editTotalPagesField.addEventListener("keydown", (event) => {
    editTotalPagesField.value = editTotalPagesField.value.replace(" ", "");
    if ((event.key >= 0 && event.key <= 9) || event.key === "Backspace" || event.key === "Tab") {
        if(editTotalPagesField.value.length >= 5 && event.key !== "Backspace" && event.key !== "Tab") { 
            event.preventDefault();
        }
        return;
    } else {
        event.preventDefault();
    }
});

editTotalPagesField.addEventListener("keyup", (event) => {
    if(editTotalPagesField.value !== "") {
        event.target.style.outline = "2px solid green";
    } else {
        event.target.style.outline = "2px solid red";        
    }

    if(parseFloat(editTotalPagesField.value) === parseFloat(editPagesReadField.value)) {
        editHasReadCheck.checked = true;
    } else {
        editHasReadCheck.checked = false;
    }
});

hasReadCheck.addEventListener("change", (event) => {
    if(hasReadCheck.checked) {
        pagesReadField.value = totalPagesField.value;
    } 

    if(totalPagesField.value === "") {
        hasReadCheck.checked = false;
    } else if(parseFloat(pagesReadField.value) === parseFloat(totalPagesField.value)) {
        hasReadCheck.checked = true;
    }
});

editHasReadCheck.addEventListener("change", (event) => {
    if(editHasReadCheck.checked) {
        editPagesReadField.value = editTotalPagesField.value;
    } 

    if(editTotalPagesField.value === "") {
        editHasReadCheck.checked = false;
    } else if(parseFloat(editPagesReadField.value) === parseFloat(editTotalPagesField.value)) {
        editHasReadCheck.checked = true;
    }
});

class Book {
    constructor(title, author, totalPages, pagesRead, hasRead) {
        this.id = `${bookIDCounter++}`;
        this.title = title;
        this.author = author;
        this.pagesRead = pagesRead;
        this.totalPages = totalPages;
        this.hasRead = hasRead;
    }
}

function addBookToLibrary(title, author, totalPages, pagesRead, readStatus) {
    let book = new Book(title, author, totalPages, pagesRead, readStatus);
    myLibrary.push(book);
    localStorage.setItem("library", JSON.stringify(myLibrary));
    localStorage.setItem("lastID", bookIDCounter);
}

function removeBookFromLibrary(event) {
    const booktoDelete = event.target.closest("div").id;
    myLibrary = myLibrary.filter(book => book.id !== booktoDelete);
    localStorage.setItem("library", JSON.stringify(myLibrary));
    document.getElementById(booktoDelete).remove();

    if(myLibrary.length === 0) {
        bookIDCounter = 0;
        localStorage.setItem("lastID", bookIDCounter);
    }
}

function editBook(title, author, totalPages, pagesRead, readStatus) {
    myLibrary.forEach(book => {
        if(book.id === bookToEdit) {
            book.title = title;
            book.author = author;
            book.totalPages = totalPages;
            book.pagesRead = pagesRead;
            book.hasRead = readStatus;
        }
    })

    localStorage.setItem("library", JSON.stringify(myLibrary));
}

function displayBooks() {
    const booksContainer = document.querySelector(".books")
    const bookTemplate = document.getElementById("book-template");

    const bookItems = booksContainer.querySelectorAll(".book");
    bookItems.forEach(item => item.remove());
    
    myLibrary.forEach((book) => {
        const bookElement = bookTemplate.content.cloneNode(true);

        bookElement.querySelector(".book-title").textContent = book.title;
        bookElement.querySelector(".book-author").textContent = book.author;
        bookElement.querySelector(".book-pages").textContent = book.pagesRead + "/" + book.totalPages;
        bookElement.querySelector(".read-status").checked = book.hasRead;
        
        const bookDiv = bookElement.querySelector(".book");
        bookDiv.id = book.id;

        booksContainer.appendChild(bookElement);
    });
}