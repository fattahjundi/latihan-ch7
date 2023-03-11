const express = require("express")
const app = express()
require('dotenv').config()
const passport = require('./middlewares/passport')
const router = require('./routes/router')

app.use(express.json())
app.use(passport.initialize())

app.use(router)

app.listen(process.env.PORT, ()=>{ console.log(`listening to port ${process.env.PORT}`); })