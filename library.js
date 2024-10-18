
// TODO ADD FAVORITES

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
const myLibrary = [];

document.addEventListener("click", (event) => {
    if(event.target.id === "delete") {
        removeBookFromLibrary(event);
    }
});

document.addEventListener("click", (event) => {
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
});

dialogOpen.addEventListener("click", (event) => {
    titleField.value = "";
    authorField.value = "";
    pagesReadField.value = "";
    totalPagesField.value = "";
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

    if(pagesRead === totalPages) {
        editHasReadCheck.checked = true;
    }
    readStatus = editHasReadCheck.checked;

    if((title !== "" && author !== "" && pagesRead !== "" && totalPages !== "") && (pagesRead <= totalPages)) {
        let book = new Book(title, author, pagesRead, totalPages, readStatus);
        addBookToLibrary(book);
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

    if(pagesRead === totalPages) {
        editHasReadCheck.checked = true;
    }
    readStatus = editHasReadCheck.checked;

    if((title !== "" && author !== "" && pagesRead !== "" && totalPages !== "") && (pagesRead <= totalPages)) {
        myLibrary[bookToEdit].title = title;
        myLibrary[bookToEdit].author = author;
        myLibrary[bookToEdit].totalPages = totalPages;
        myLibrary[bookToEdit].pagesRead = pagesRead;
        myLibrary[bookToEdit].hasRead = readStatus
        dialog2.close();
    } else if(parseFloat(pagesRead) > parseFloat(totalPages)) {
        alert("pages read cannot be more than total pages");
    } else {
        alert("please enter all information");
    }

    displayBooks();
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
    } else if(parseFloat(pagesReadField.value) > parseFloat(totalPagesField.value)) {
        // popup message
        hasReadCheck.checked = false;
    } else if(parseFloat(pagesReadField.value) < parseFloat(totalPagesField.value)) {
        hasReadCheck.checked = false;
    } else if(pagesReadField.value === "") {
        hasReadCheck.checked = false;
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
    } else if(parseFloat(editPagesReadField.value) > parseFloat(editTotalPagesField.value)) {
        // popup message
        editHasReadCheck.checked = false;
    } else if(parseFloat(editPagesReadField.value) < parseFloat(editTotalPagesField.value)) {
        editHasReadCheck.checked = false;
    } else if(editPagesReadField.value === "") {
        editHasReadCheck.checked = false;
    }
});


totalPagesField.addEventListener("keydown", (event) => {
    totalPagesField.value = totalPagesField.value.replace(" ", "");
    if ((event.key >= 0 && event.key <= 9) || event.key === "Backspace") {
        if(totalPagesField.value.length >= 5 && event.key !== "Backspace") { 
            event.preventDefault();
        }
        return;
    } else {
        event.preventDefault();
    }
});

editTotalPagesField.addEventListener("keydown", (event) => {
    editTotalPagesField.value = editTotalPagesField.value.replace(" ", "");
    if ((event.key >= 0 && event.key <= 9) || event.key === "Backspace") {
        if(editTotalPagesField.value.length >= 5 && event.key !== "Backspace") { 
            event.preventDefault();
        }
        return;
    } else {
        event.preventDefault();
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
    constructor(title, author, pagesRead, totalPages, hasRead) {
        this.title = title;
        this.author = author;
        this.pagesRead = pagesRead;
        this.totalPages = totalPages;
        this.hasRead = hasRead;
    }
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);
}

function removeBookFromLibrary(event) {
    myLibrary.splice(event.target.closest("div").id, 1);
    document.getElementById(event.target.closest("div").id).remove();
}

function displayBooks() {

    const booksContainer = document.querySelector(".books")
    const bookTemplate = document.getElementById("book-template");

    const bookItems = booksContainer.querySelectorAll(".book");
    bookItems.forEach(item => item.remove());
    
    myLibrary.forEach((book, index) => {
        const bookElement = bookTemplate.content.cloneNode(true);

        bookElement.querySelector(".book-title").textContent = book.title;
        bookElement.querySelector(".book-author").textContent = book.author;
        bookElement.querySelector(".book-pages").textContent = book.pagesRead + "/" + book.totalPages;
        bookElement.querySelector(".read-status").checked = book.hasRead;

        const bookDiv = bookElement.querySelector(".book");
        bookDiv.id = `${index}`;

        booksContainer.appendChild(bookElement);
    });
}