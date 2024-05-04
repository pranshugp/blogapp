require("dotenv").config()
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser")
const Blog = require('./models/blog')
const PORT = process.env.PORT || 8000
const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')
 const { checkForAuthenticationCookie } = require('./middleware/auth')



mongoose.connect(process.env.MONGO_URL).then((e)=> console.log("Mongodb Connected"))
app.set("view engine", 'ejs')
app.set('views',path.resolve('./views'))



app.use(express.urlencoded({extended : false}))
 app.use(cookieParser())
 app.use(checkForAuthenticationCookie('token'))
 app.use(express.static(path.resolve('./public')))


app.get('/',async (req,res)=>{
    const allBlogs = await Blog.find({})
    res.render('home',{
        user: req.user,
        blog :allBlogs

    })
})
app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.listen(PORT,()=>console.log(`Server started at ${PORT}`))