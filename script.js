let addBookButton = document.getElementById("add-book-btn");
let bookForm = document.getElementById("book-form");
let closeForm = document.querySelector(".close-form");
let formSubmit = document.querySelector(".add-btn");
let formBookName = document.getElementById("book-name");
let formAuthorName = document.getElementById("author-name");
let formNumPages = document.getElementById("num-pages");
let formReadingProgress = document.getElementById("finished-reading");

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

function addBookToLibrary(book) {
    let container = document.querySelector(".book-item-container");

    let newBook = document.createElement("div");
    newBook.classList.add("book-item");

    newBook.innerHTML = `
        <img class="book-delete" src="./images/x.png" alt="">
        <div class="book-img-container">
            <img class="book-img" src="./images/agameofthrones.jpg" alt="">
        </div>
        <h3>${book.name}</h3>
        <p>${book.author}</p>
        <p>${book.numPages} Pages</p>
    `;

    container.appendChild(newBook);
}

function resetForm() {
    formBookName.value = "";
    formAuthorName.value = "";
    formNumPages.value = "";
    formReadingProgress.value = "No"
    
    let formContainer = document.querySelector(".form-container");
    formContainer.style.visibility = "hidden";
}

// EVENT LISTENERS

addBookButton.addEventListener('click', () => {
    let formContainer = document.querySelector(".form-container");
    formContainer.style.visibility = "visible";
})

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var bookName = formBookName.value;
    var authorName = formAuthorName.value;
    var numPages = formNumPages.value;
    var readingProgress = formReadingProgress.value;

    let book = new Book(bookName, authorName, numPages, readingProgress);
    myLibrary.push(book);
    addBookToLibrary(book);
    resetForm();
})

closeForm.addEventListener('click', () => {
    resetForm();
})