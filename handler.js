const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading
    } = request.payload;

    if (!name) {
        return h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku",
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        }).code(400);
    }
    
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    books.push(newBook);

    return h.response({
        "status": "success",
        "message": "Buku berhasil ditambahkan",
        "data": { bookId: id },
    }).code(201);
};

const getAllBooksHandler = (request, h) => {
        const allBooks = books.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));

        return h.response({
            "status": "success",
            data: {
                books: allBooks,
            },
        }).code(200);
    };

const getBookByHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.find((b) => b.id === bookId);

    if (!book) {
        return h.response({
            "status": "fail",
            "message": "Buku tidak ditemukan",
        }).code(404);
    }

    return {
        "status": "success",
        "data": { book },
    };
};

const editBookByHandler = (request, h) => {
    const { bookId } = request.params;
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading
    } = request.payload;

    const idFound = books.findIndex((b) => b.id === bookId);

    if(!name) {
        return h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku",
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        }).code(400);
    }

    if (!idFound) {
        return h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Id tidak ditemukan",
        }).code(404);
    }

books[idFound].name = name;
books[idFound].year = year;
books[idFound].name = author;
books[idFound].summary = summary;
books[idFound].publisher = publisher;
books[idFound].pageCount = pageCount;
books[idFound].readPage = readPage;
books[idFound].reading = reading;
books[idFound].updateAt = new Date().toISOString();
books[idFound].finished = pageCount === readPage;

return h.response({
    "status": "success",
    "message": "Buku berhasil diperbarui",
}).code(200);
};

const deleteBookByHandler = (request, h) => {
    const { bookId } = request.params;
    const idFound = books.findIndex((b) => b.id === bookId);

    if (idFound) {
        return h.response({
            "status": "fail",
            "message": "Buku gagal dihapus. Id tidak ditemukan",
        }).code(404);
    }

    books.splice(idFound, 1);

    return h.response({
        "status": "success",
        "message": "Buku berhasil dihapus",
    }).code(200);
};

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookByHandler,
    editBookByHandler,
    deleteBookByHandler,
};
    
