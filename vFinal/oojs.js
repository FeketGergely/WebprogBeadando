// Base class for a generic item
class Item {
    constructor(name) {
        this.name = name;
    }

    display() {
        const itemElement = document.createElement('div');
        itemElement.textContent = this.name;
        return itemElement;
    }
}

// Book class that extends Item
class Book extends Item {
    constructor(name, author) {
        super(name);
        this.author = author;
    }

    display() {
        const bookElement = super.display();
        const authorElement = document.createElement('span');
        authorElement.textContent = ` by ${this.author}`;
        bookElement.appendChild(authorElement);
        return bookElement;
    }
}

// Library class to manage a collection of books
class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    displayBooks() {
        const libraryElement = document.createElement('div');
        libraryElement.className = 'library';

        this.books.forEach(book => {
            libraryElement.appendChild(book.display());
        });

        document.body.appendChild(libraryElement);
    }
}

// Create a library and add some books
const myLibrary = new Library();
myLibrary.addBook(new Book('The Great Gatsby', 'F. Scott Fitzgerald'));
myLibrary.addBook(new Book('To Kill a Mockingbird', 'Harper Lee'));
myLibrary.addBook(new Book('1984', 'George Orwell'));

// Display the books in the library
myLibrary.displayBooks();
