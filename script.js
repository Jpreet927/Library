let addBookButton = document.getElementById("add-book-btn");
let bookForm = document.getElementById("book-form");
let closeForm = document.querySelector(".close-form");
let formSubmit = document.querySelector(".add-btn");
let formBookName = document.getElementById("book-name");
let formAuthorName = document.getElementById("author-name");
let formNumPages = document.getElementById("num-pages");
let formReadingProgress = document.getElementById("finished-reading");

let myLibrary = [];

function Book(name, author, numPages, haveRead, imgPath = "") {
    this.name = name;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.imgPath = imgPath;
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

    if (book.imgPath == "") {
        book.imgPath = "./images/default.png"
    }

    newBook.innerHTML = `
        <img class="book-delete" src="./images/x.png" alt="">
        <div class="book-img-container">
            <img class="book-img" src=${book.imgPath} alt="">
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

function populatePage() {
    for (var i = 0; i < myLibrary.length; i++) {
        addBookToLibrary(myLibrary[i]);
    }
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
    console.log(myLibrary);
})

closeForm.addEventListener('click', () => {
    resetForm();
})

// Populate page with default data
let book1 = new Book("A Game of Thrones", "George R.R. Martin", 847, "yes", "./images/agameofthrones.jpg");
let book2 = new Book("A Storm of Swords", "George R.R. Martin", 938, "no", "./images/astormofswords.jpg");
let book3 = new Book("Naruto Volume 47", "Masashi Kishimoto", 212, "yes", "./images/naruto47.jpeg");
let book4 = new Book("Attack on Titan Volume 30", "Hajime Isayama", 230, "no", "./images/aot30.jpeg");
let book5 = new Book("No Longer Human", "Osamu Dazai", 271, "no", "./images/nolongerhuman.jpeg");

myLibrary.push(book1, book2, book3, book4, book5);
populatePage();