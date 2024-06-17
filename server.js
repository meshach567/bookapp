if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000;
const indexRouter = require('./routes/index')
const authorRouter = require("./routes/author")
const bookRouter = require('./routes/books')

const MONGOURL = process.env.DATABASE_URL;


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))

app.use('/', indexRouter);
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

mongoose.connect(MONGOURL, {
    family: 4
})
.then(() => {
    console.log("Database is connected successfully.");

    app.listen(PORT, () => {
        console.log(`Server is running on on ${PORT}`);
    });
})
.catch((error) => console.log(error))
