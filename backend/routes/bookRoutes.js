import express from 'express'
const router = express.Router()
import { Book } from '../Models/bookModel.js';


router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: "send all required fields: title,author,publishyear",
        });
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
  
      const book = await Book.create(newBook);
  
      return res.status(201).send(book);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });
  
  // route to get all books
  router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
  
      return res.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        message: error.message,
      });
    }
  });
  
  // route to get  books by id
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const books = await Book.findById(id);
  
      return res.status(200).json(books);
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        message: error.message,
      });
    }
  });
  
  // route for update book
  router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: "send all required fields: title,author,publishyear",
        });
      }
  
      const { id } = req.params;
  
      const result = await Book.findByIdAndUpdate(id, req.body);
  
      if (!result) {
        return res.status(404).send({ message: "Book not Found" });
      }
      return res.status(200).send({ message: "book successfully updated" });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        message: error.message,
      });
    }
  });
  
  //route for delete a book
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await Book.findByIdAndDelete(id);
      if (!result) {
        res.status(404).send({ message: "book not found" });
      }
      return res.status(200).send({ message: "Book Deleted Succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });

  export default router