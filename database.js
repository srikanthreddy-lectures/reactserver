const mongoose = require("mongoose")

const url = `mongodb+srv://<admin>:<password>@cluster0.s8ukydx.mongodb.net/demodb?retryWrites=true&w=majority`;

 const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
} 

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

    // User model
const userschema = new mongoose.Schema( {

    email: { type: String, unique:true, required:true, lowercase:true,trim:true },
    password: { type: String,required:true },
},{collection:"users"});

exports.User=mongoose.model("User",userschema)
