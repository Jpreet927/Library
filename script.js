let addBookButton = document.getElementById("add-book-btn");

let myLibrary = [];

function Book(name, author, numPages, haveRead) {
    this.name = name;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
}

Book.prototype.info = function() {
    if (this.haveRead = true) {
        return (`${this.name} by ${this.author}, ${this.numPages} pages, finished reading.`);
    } else {
        return (`${this.name} by ${this.author}, ${this.numPages} pages, not read yet.`);
    }
}

function addBookToLibrary() {
    
}

// EVENT LISTENERS

addBookButton.addEventListener('click', () => {
    let formContainer = document.querySelector(".form-container");
    formContainer.style.visibility = "visible";
})