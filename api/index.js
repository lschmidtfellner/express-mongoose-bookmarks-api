import express from 'express'
import connection from '../lib/db/connection.js';
import Bookmark from '../models/Bookmark.js';
import * as dotenv from 'dotenv'

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookmarks'
const PORT = process.env.PORT || 4000

dotenv.config()

const app = express();

// FIND ALL BOOKMARKS
app.get("/", function(req, res) {
    Bookmark.find({}).then(bookmarks => res.json(bookmarks));
  });

app.get("/test", (request, response) => {
response.send("Test" + " Test");
});

// FIND ONE BOOKMARK
app.get("/bookmarks/:id", function(req, res) {
  Bookmark.findById(req.params.id)
    .then(bookmark => {
      if (!bookmark) {
        return res.status(404).json({ error: "Bookmark not found" });
      }
      res.json(bookmark);
    })
    .catch(error => res.status(500).json({ error: "Server error" }));
});

// CREATE A BOOKMARK
app.post("/bookmarks", function(req, res) {
  Bookmark.create(req.body)
    .then(bookmark => res.status(201).json(bookmark))
    .catch(error => res.status(500).json({ error: "Server error" }));
});

// DELETE A BOOKMARK
app.delete("/bookmarks/:id", function(req, res) {
  Bookmark.findByIdAndRemove(req.params.id)
    .then(bookmark => {
      if (!bookmark) {
        return res.status(404).json({ error: "Bookmark not found" });
      }
      res.json({ message: "Bookmark deleted successfully" });
    })
    .catch(error => res.status(500).json({ error: "Server error" }));
});


// UPDATE A BOOKMARK
app.put("/bookmarks/:id", function(req, res) {
  Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(bookmark => {
      if (!bookmark) {
        return res.status(404).json({ error: "Bookmark not found" });
      }
      res.json(bookmark);
    })
    .catch(error => res.status(500).json({ error: "Server error" }));
});




// LISTEN ON PORT
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});