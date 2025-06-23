const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db =require("./database/config")
const sequelize = db.sequelize;
const isLoggedInOrNot = require("./middleware/isLoggedInOrNot")
const cookieParser = require("cookie-parser")   
const dotenv = require("dotenv")
app.use(cookieParser())

const Blog = db.blogModel;
const User = db.userModel;

app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))


app.get('/login', async (req, res) => {
  res.render('./authentication/login'); 
 });

app.get('/register', async (req, res) => {
  res.render('./authentication/register'); 
});

app.post('/register', async (req, res) => {
    const { username, email, password, confirmpassword } = req.body
    if(password!==confirmpassword){
      res.send("Password and Confirm Password do not match")
    }else{
    await db.userModel.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password,10)
    })
    res.send("Registered Successfully")
  }
})

app.post("/login",async (req,res)=>{
    const {email,password}=req.body
    const users = await db.userModel.findAll({
        where : {
            email : email
        }
    })
    if(users.length == 0){
        res.send("Email not registered")
    } else {
        const isPasswordMatch = bcrypt.compareSync(password, users[0].password);
        if(isPasswordMatch){
            const token=jwt.sign({id:users[0].id},"hahahahhaha",{ 
                expiresIn:"10d" 
            })
            res.cookie("token",token)
        } else{
            res.send("Invalid Email or Password")
        }
    }
    res.redirect("/")
})

app.get('/', async (req, res) => {
  const posts = await Blog.findAll();
  res.render('./blog/home', { posts });
});

app.get('/feed', async (req, res) => {
  const posts = await Blog.findAll();
  res.render('./blog/feed', { posts });
});

app.get('/post/:id',isLoggedInOrNot, async (req, res) => {
  const posts = await Blog.findAll({
    where: {
      id: req.params.id
    }
  });
  const post = posts[0];
  if (!post) {
    res.send('Post not found');
    return;
  }
  const authors = await db.userModel.findAll({
    where: {
      id: post.userid
    }
  });
  const author = authors[0];
  const userid = req.userid;
  const username = req.username;
  res.render('./blog/showPost', { data: post, userid: req.userid , username: req.username, authorUsername: author?.username || "Admin"});
});

app.get('/add', isLoggedInOrNot, (req, res) => {
  res.render('./blog/addBlog');
});

app.post('/add', isLoggedInOrNot, async (req, res) => {
  try {
    const { title, description, content } = req.body;
    await Blog.create({
        title,
        description,
        content,
        userid: req.userid,
    });
    res.redirect('/');
  } catch (error) {
    res.send('Failed to add post');
  } 
});

app.get('/edit/:id', isLoggedInOrNot, async (req, res) => {
  const posts = await Blog.findAll({
    where: {
      id: req.params.id
    }
  });
  const post = posts[0];
  if (!post) return res.send('Post not found');
  if (post.userid !== req.userid) return res.send('Unauthorized');
  res.render('./blog/editBlog', { data: post });
});

app.post('/edit/:id', isLoggedInOrNot, async (req, res) => {
  const posts = await Blog.findAll({
    where: {
      id: req.params.id
    }
  });
  const post = posts[0];
  if (!post) return res.send('Post not found');
  if (post.userid !== req.userid) return res.send('Unauthorized');

  const { title, description, content } = req.body;
  await post.update({ title, description, content });
  res.redirect(`/post/${post.id}`);
});

app.post('/delete/:id', isLoggedInOrNot, async (req, res) => {
  const posts = await Blog.findAll({
    where: {
      id: req.params.id
    }
  });
  const post = posts[0];
  if (!post) return res.send('Post not found');
  if (post.userid !== req.userid) return res.send('Unauthorized');

  await post.destroy();
  res.redirect('/');
});

// Start Server
app.listen(3000,"0.0.0.0", function(){
    console.log("Port 3000 is Running.")
});