const express = require('express')
const app =  express()
const port = 80
const cors = require('cors')

// const path = require('path')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Siva:tnsp9443908006@cluster0-9j26t.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true,  useUnifiedTopology: true })
// __dirname = 'D:\Siva\Development\WebDev\Backend\Node.js\CFIWebops\Task1\frontend\public'


app.get('/', (req, res) => {
    res.send("/a/")
})

// app.use(express.static(path.join(__dirname, '../frontend/')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/api', require('./routes/index'))
app.use('/account', require('./routes/signup'))




app.listen(port, ()=> console.log("Server Started and listening at 80"))