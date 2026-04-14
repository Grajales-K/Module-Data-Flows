let myLibrary = [];

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

document.addEventListener("DOMContentLoaded", () => {
  populateStorage();

  const bookForm = document.getElementById("demo");

  bookForm.addEventListener("submit", function (e) {
    e.preventDefault(); // <--- SOLUCIÓN: Evita que la página se refresque
    submitBook();
  });
});

function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robinson Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book("The Old Man and the Sea", "Ernest Hemingway", "127", true);
    myLibrary.push(book1, book2);
  }
  render();
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  if (
    !title.value ||
    !author.value ||
    !pages.value ||
    pages.value <= 0 
  ) {
    alert("Please fill the field with valid info!");
    return false;
  } else {
    let book = new Book(title.value, author.value, pages.value, check.checked);
    myLibrary.push(book);
    render();
  }
}


function render() {
  let libraryBody = document.getElementById("table-body");
  
  //clean the table before render new one
  libraryBody.innerHTML = "";

  // //delete old table
  // for (let n = rowsNumber - 1; n > 0; n--) {
  //   libraryBody.deleteRow(n);
  // }

  //insert updated row and cells
  for (let i = 0; i < myLibrary.length; i++) {
    let row = libraryBody.insertRow(-1);

    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);
    
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    let changeBut = document.createElement("button");
    changeBut.id = i;
    changeBut.className = "btn btn-success";
    wasReadCell.appendChild(changeBut);
    let readStatus = "";
    if (myLibrary[i].check == false) {
      readStatus = "No";
    } else {
      readStatus = "Yes";
    }
    changeBut.innerText = readStatus;

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    let deleteBtn = document.createElement("button");
    deleteBtn.id = i + 5;
    deleteCell.appendChild(deleteBtn);
    deleteBtn.className = "btn btn-warning";
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener("click", function (index) {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(index, 1);
      render();
    });
  }
}
