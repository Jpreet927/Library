let addBookButton = document.getElementById("add-book-btn");
let bookForm = document.getElementById("book-form");
let closeForm = document.querySelector(".close-form");
let formSubmit = document.querySelector(".add-btn");
let formBookName = document.getElementById("book-name");
let formAuthorName = document.getElementById("author-name");
let formNumPages = document.getElementById("num-pages");
let formRead = document.getElementById("finished-reading");
let formSelect = document.getElementById("reading-selection");
let bookID = 0;
let myLibrary = [];


function Book(name, author, numPages, haveRead, imgPath = "") {
    this.name = name;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.imgPath = imgPath;
}

function addBookToLibrary(book) {
    let container = document.querySelector(".book-item-container");
    let newBook = document.createElement("div");
    let progressClass = "";
    newBook.classList.add("book-item");

    // checks if image path is given, otherwise use default image
    if (book.imgPath == "") book.imgPath = "./images/default.png";

    // adds class to reading status
    if (book.haveRead === "Finished") {
        progressClass = "finished-reading";
    } else {
        progressClass = "still-reading";
    }

    // create book elements 
    let deleteImage = document.createElement("img");
    let bookImageContainer = document.createElement("div");
    let bookImage = document.createElement("img");
    let infoContainer = document.createElement("div");
    let bookDetails = document.createElement("div");
    let bookName = document.createElement("h3");
    let authorName = document.createElement("p");
    let pageCount = document.createElement("p");
    let readingStatus = document.createElement("div");
    
    // add classes to book elements
    deleteImage.classList.add("book-delete");
    bookImage.classList.add("book-img");
    bookImageContainer.classList.add("book-img-container");
    infoContainer.classList.add("info-container");
    bookDetails.classList.add("book-details");
    readingStatus.classList.add("progress", progressClass);
    newBook.classList.add("book-item");
    deleteImage.dataset.ID = bookID;
    bookID++;
    
    // add sources & inner text to book elements
    deleteImage.src = "./images/x.png";
    bookImage.src = book.imgPath;
    bookName.textContent = book.name;
    authorName.textContent = book.author;
    pageCount.textContent = book.numPages;
    readingStatus.textContent = book.haveRead;

    // sorts HTML elements into containers
    bookImageContainer.appendChild(bookImage);
    bookDetails.append(bookName, authorName, pageCount)
    infoContainer.append(bookDetails, readingStatus);
    newBook.append(deleteImage, bookImageContainer, infoContainer);
    container.append(newBook);
    
    // delete event listeners
    let deleteBtns = document.querySelectorAll(".book-delete");
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentNode.remove();
        })
    })

    // reading status event listener
    readingStatus.addEventListener("click", toggleProgress);
}

// empties form input fields
function resetForm() {
    formBookName.value = "";
    formAuthorName.value = "";
    formNumPages.value = "";
    formRead.value = "No"
    
    let formContainer = document.querySelector(".form-container");
    formContainer.style.visibility = "hidden";
}

// toggles reading status button from finished to reading
function toggleProgress(e) {
    console.log('working')
    if (e.target.classList.contains("finished-reading")) {
        e.target.classList.remove("finished-reading");
        e.target.classList.add("still-reading");
        e.target.innerText = "Reading";
    } else if (e.target.classList.contains("still-reading")) {
        e.target.classList.remove("still-reading");
        e.target.classList.add("finished-reading");
        e.target.innerText = "Finished";
    }
}

// populates page with pre-defined entries
function populatePageInitial() {
    let book1 = new Book("A Game of Thrones", "George R.R. Martin", 847, "Finished", "./images/agameofthrones.jpg");
    let book2 = new Book("A Storm of Swords", "George R.R. Martin", 938, "Reading", "./images/astormofswords.jpg");
    let book3 = new Book("Naruto Volume 47", "Masashi Kishimoto", 212, "Finished", "./images/naruto47.jpeg");
    let book4 = new Book("Attack on Titan Volume 30", "Hajime Isayama", 230, "Reading", "./images/aot30.jpeg");
    let book5 = new Book("No Longer Human", "Osamu Dazai", 271, "Reading", "./images/nolongerhuman.jpeg");
    myLibrary.push(book1, book2, book3, book4, book5);

    for (var i = 0; i < myLibrary.length; i++) {
        addBookToLibrary(myLibrary[i]);
    }
}


// EVENT LISTENERS

addBookButton.addEventListener('click', () => {
    let formContainer = document.querySelector(".form-container");
    formContainer.style.visibility = "visible";
})

let progressBtns = document.querySelectorAll(".progress");
console.log(progressBtns)
progressBtns.forEach(btn => {
    btn.addEventListener('click', toggleProgress);
    
})

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var bookName = formBookName.value;
    var authorName = formAuthorName.value;
    var numPages = formNumPages.value;
    var readingProgress = formSelect.options[formSelect.selectedIndex].value;

    if (readingProgress == "yes") {
        readingProgress = "Finished";
    } else {
        readingProgress = "Reading"
    }

    let book = new Book(bookName, authorName, numPages, readingProgress);
    myLibrary.push(book);
    addBookToLibrary(book);
    resetForm();
})

closeForm.addEventListener('click', () => {
    resetForm();
})

populatePageInitial();