import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import './db.js'
import {engine} from 'express-handlebars'
import session from "express-session"
import MongoStore from 'connect-mongo'
import { injectUser } from "./middlewares/authMiddleware.js"
// import routes
import AuthRoutes from './routes/AuthRoutes.js'
import BlogRoutes from './routes/BlogRoutes.js'

const app = express()

const sessionMiddleware = session({
  secret: process.env.SECRET_KEY,
  resave:false,
  saveUninitialized:false,
  store: MongoStore.create({
    mongoUrl:process.env.MONGO_URI
  }),
  cookie:{
    maxAge : 1000 * 60 * 60 *24 
  }
})

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('public'))

app.use(express.urlencoded({
    extended:true
}))
app.use(express.json()) 
app.use(sessionMiddleware)

app.use("/", AuthRoutes)
app.use('/blog', BlogRoutes)

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`App running on http://localhost:${port}`)
})