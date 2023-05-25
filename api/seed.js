import mongoose from 'mongoose'
import connection from '../lib/db/connection.js'
import Bookmark from '../models/Bookmark.js'
import data from '../lib/db/bookmarks.json' assert {type: 'json'}

console.log(data)

const bookmarkData = data.map( item => {
    console.log(`{${item.title}: ${item.url}}`)
    return {
    title : item.title,
    url : item.url
    }
})

// Bookmark
//     .deleteMany({})
//     .then(() => Bookmark.create(bookmarkData))
//     .then(() => console.log('bookmarks seeded'))
//     .catch((error => console.error('Error: ', error)))

let makeMarks = async() => {
    try {
        await Bookmark.deleteMany()
        await Bookmark.create(bookmarkData)
        console.log('bookmarks created and seeded')
        mongoose.connection.close()
    }
    catch(error) {
        console.error('Error: ', error)
    }
}

makeMarks()


//   RUN THE SEED FILE COMMAND
// node --experimental-json-modules lib/db/seed.js

// {"_id":{"title":"world","url":"hello.com"}}