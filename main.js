const express = require("express");

const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const db = require('./database')
const jwt_code = "kmit123";

const app = express();

app.use(express.json());
//app.use(bodyparser);

app.get("/", async (req, res) => {
  return res.json({ message: "Hello, World" });
});

app.get("/data", async (req, res) => {
    //logic
    
    return res.json({ message: "Hello, Data" });
  });

// Creating a POST request
app.post('/user/signup', (req, res) => {
  if(!req.body.email || !req.body.password){
    return res.json({ success:false, error:"Send the parameters" });
  }
  db.User.create({
    email: req.body.email,
    password : req.body.password
  }).then((user)=>{
      const token=jwt.sign({id:user._id,email:user.email},jwt_code)
      return res.json({ success:true, error:token });
  }).catch((err)=>{
      res.json({ success:false, error:err });
  })
})

app.post('/user/login', (req, res) => {
  if(!req.body.email || !req.body.password){
    res.json({ success:false, error:"Send the parameters" });
    return;
  }

  db.User.findOne({email:req.body.email}).then((user)=>{
    if(!user){
      res.json({ success:false, error:"User not exist" });
    }
    else {
      if(user.password != req.body.password){
        res.json({ success:false, error:"password not correct" });
      }
      else{
        const token = jwt.sign({id:user._id,email:user.email},jwt_code);
        res.json({ success:true, error:token });
      }

    }
  }).catch((err)=>{
    res.json({ success:false, error:err });
  })
});

const start = async () => {
  try {
    app.listen(4000, () => console.log("Server started on port 4000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start()