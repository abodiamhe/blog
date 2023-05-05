

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Hey!!..... Welcom to my blog...I'm about to write a lot of bullshit, so incase you loocking for journal that make sense please use google 🤪.";
const aboutContent = "This is my personal blog, can wake up in the morning and post rubbish and you can't do anything. for a start, i will be posting content i didn't create 🤣";
const contactContent = "you can only note this name: Ssmooth tech. don't worry, you don't need my number yet";

const app = express();
mongoose.connect("mongodb+srv://admin-sadiq:mariam440>@cluster0.fzqz2pj.mongodb.net/blogDB");

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);




app.get("/", function(req, res){
  Post.find({}).then(function(foundPost){
      res.render("home", {startingContent: homeStartingContent, posts: foundPost});
  })

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

    const titleName = req.body.postTitle;
    const contentName = req.body.postBody;

    const post = new Post ({
      title: titleName,
      content: contentName
    });
    post.save().then(function(err){
      if(!err){
          res.redirect("/");
      }
    });
});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;

Post.findOne({_id: requestedPostId}).then(function(post){
  res.render("post", {
    title: post.title,
    content: post.content
  });
})
});


let port = process.env.PORT;
if (port == null || port = ""){
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
