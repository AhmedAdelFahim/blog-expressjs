const mongoose = require('mongoose');
const express = require('express');
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const app = express();
const PORT = process.argv.PORT || 3331;

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "blog",
    useFindAndModify:false
},(error) => {
    if (!error) {
        console.log("connected mongodb")
    } else {
        console.log(error)
    }
});
app.use(express.json())
app.use('/users',userRouter)
app.use('/posts',postRouter)

app.listen(PORT,(err)=>{
    console.log(`Listen on port: ${PORT}`)
})


