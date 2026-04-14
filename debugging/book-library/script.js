let myLibrary = [];

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = Number(pages);
  this.check = check;
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");
const bookForm = document.getElementById("demo");

document.addEventListener("DOMContentLoaded", () => {
  populateStorage();

  if (bookForm) {
    bookForm.addEventListener("submit", function (e) {
      e.preventDefault(); 
      processForm();
    });
  }
});

function populateStorage() {
  if (myLibrary.length === 0) {

    myLibrary.push(new Book("Robinson Crusoe", "Daniel Defoe", 252, true));
    myLibrary.push(
      new Book("The Old Man and the Sea", "Ernest Hemingway", 127, true)
    );
  }
  render(); 
}

function processForm() {

  const titleVal = titleInput.value.trim();
  const authorVal = authorInput.value.trim();
  const pagesVal = pagesInput.value;

  if (!titleVal || !authorVal || pagesVal <= 0) {
    alert("Please fill the field with valid info!");
    return;
  }

  const newBook = new Book(titleVal, authorVal, pagesVal, checkInput.checked);
  myLibrary.push(newBook);

  bookForm.reset();
  render();
  $("#demo").collapse("hide");
}

function render() {
  const libraryBody = document.getElementById("table-body");
  libraryBody.innerHTML = ""; 
 
  myLibrary.forEach((book, index) => {
    const row = libraryBody.insertRow(-1);

    row.insertCell(0).textContent = book.title;
    row.insertCell(1).textContent = book.author;
    row.insertCell(2).textContent = book.pages;

    const wasReadCell = row.insertCell(3);
    const statusBtn = document.createElement("button");
    statusBtn.className = "btn btn-success";
    statusBtn.textContent = book.check ? "Yes" : "No"; 

    statusBtn.addEventListener("click", () => {
      book.check = !book.check;
      render();
    });
    wasReadCell.appendChild(statusBtn);


    const deleteCell = row.insertCell(4);
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-warning";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      const deletedTitle = book.title;
      myLibrary.splice(index, 1);
      render();
      
      alert(`You've deleted title: ${deletedTitle}`);
    });
    deleteCell.appendChild(deleteBtn);
  });
}
