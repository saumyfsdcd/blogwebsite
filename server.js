const express=require("express");
const ejs=require("ejs");
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var blogs=[]

app.get("/", (req,res)=>{
    res.render("index", {blogs: blogs});
})

app.get("/blog/:name", (req,res)=>{
    const name=req.params.name;
    var title;
    var desc;
    blogs.forEach((data)=>{
        if(data.title===name){
            title=data.title;
            desc=data.description;
        }
    })
    res.render("unique", {title:title, desc: desc});
})

app.get("/create", (req,res)=>{
    res.render("create");
})

app.get("/about", (req,res)=>{
    res.render("about");
    
})

app.get("/contact", (req,res)=>{
    res.render("contact");
    
})

app.post("/", (req,res)=>{
    blogs.push({
        title: req.body.title,
        description: req.body.desc
    })
    res.redirect("/");
})

const port=process.env.port || 3000;

app.listen(port, ()=>{
    console.log("server started on port" + port)
})