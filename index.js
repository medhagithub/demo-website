console.log('hiiiiii')
const express = require("express");
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const pathRouter = require("./routes/paths")
const productRouter = require('./routes/product')
const displayProduct = require("./routes/displayProduct")
const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieSession({
     keys :['bfcc']
}))
app.use(pathRouter)
app.use(productRouter)
app.use(displayProduct)

app.listen(5000, ()=>{
    console.log('sun raha hu')
})