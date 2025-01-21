let shelf = [];
const RENDER_EVENT = 'render-event';
const SAVED_EVENT = 'saved-data';
const STORAGE_KEY = 'my-book-shelf';

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('bookForm');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

    if (isStorageExist()) {
        loadData();
    }
    

});

document.addEventListener(RENDER_EVENT, renderShelf);

function loadData() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(serializedData);
   
    if (data !== null) {
        console.log('Data loaded;', data);
        shelf = data;
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function addBook() {
    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = document.getElementById('bookFormYear').value;
    const isComplete = document.getElementById('bookFormIsComplete').checked;
   
    const generatedID = generateId();
    const book = generateListObject(generatedID, title, author, year, isComplete);
    shelf.push(book);
   
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

function generateId() {
    return +new Date();
}

function generateListObject(id, title, author, year, isComplete) {
    return {
      id,
      title,
      author,
      year: parseInt(year),
      isComplete,
    };
}

function renderShelf() {
    console.log('Rendering shelf:', shelf);
    const unfinishedList = document.getElementById('incompleteBookList');
    const finishedList = document.getElementById('completeBookList');
    
    unfinishedList.innerHTML = '';
    finishedList.innerHTML = '';
   
    shelf.forEach((book) => {
        console.log('Rendering book:', book);
        const bookElement = document.createElement('div');
        bookElement.classList.add('book-item');
        bookElement.setAttribute('data-bookid', book.id);
        bookElement.setAttribute('data-testid', 'bookItem');

        bookElement.innerHTML = `
          <h3 data-testid="bookItemTitle">${book.title}</h3>
          <p data-testid="bookItemAuthor">Author: ${book.author}</p>
          <p data-testid="bookItemYear">Year: ${book.year}</p>
          <div>
            <button data-testid="bookItemIsCompleteButton" onclick="toggleBookStatus('${book.id}')">${book.isComplete ? "Unfinished" : "Finished"}</button>
            <button data-testid="bookItemEditButton" onclick="editBook('${book.id}')">Edit</button>
            <button data-testid="bookItemDeleteButton" onclick="deleteBook('${book.id}')">Delete</button>
          </div>
        `;
        
        bookElement.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', function () {
            toggleBookStatus(book.id);
        });
        bookElement.querySelector('[data-testid="bookItemEditButton"]').addEventListener('click', function () {
            editBook(book.id);
        });
        bookElement.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', function () {
            deleteBook(book.id);
        });


        if (book.isComplete) {
            finishedList.appendChild(bookElement);
        } else {
            unfinishedList.appendChild(bookElement);
        }
    });
};

function toggleBookStatus(bookId) {
    const book = shelf.find((book) => book.id === bookId);
    if (book) {
      book.isComplete = !book.isComplete;
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();
    }
}

function deleteBook(bookId) {
    shelf = shelf.filter((book) => book.id !== bookId);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function editBook(bookId) {
    const book = shelf.find((book) => book.id === bookId);
    if (book) {
        const newTitle = prompt("Input new title:", book.title);
        const newAuthor = prompt("Input new author:", book.author);
        const newYear = prompt("Input new year:", book.year);

        if (newTitle !== null && newAuthor !== null && newYear !== null) {
            book.title = newTitle;
            book.author = newAuthor;
            book.year = newYear;
            document.dispatchEvent(new Event(RENDER_EVENT));
            saveData();
        }
    }        
}

function saveData() {
    const parsedData = JSON.stringify(shelf);
    localStorage.setItem(STORAGE_KEY, parsedData);
    if (!localStorage.getItem(STORAGE_KEY)) {
        console.error('Failed to save data to localStorage');
    } else {
        console.log('Data successfully saved to localStorage');
    }
    document.dispatchEvent(new Event(SAVED_EVENT));
}

function isStorageExist() {
    if (typeof (Storage) === undefined) {
      alert('Browser kamu tidak mendukung local storage');
      return false;
    }
    return true;
}