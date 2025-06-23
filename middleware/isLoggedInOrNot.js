const jwt = require("jsonwebtoken")
 const isLoggedInOrNot = (req, res, next)=>{
    const token = req.cookies.token
    //uta app.js bata leko 
 if(!token){
    res.send("Please login first")
 }
 else{
    jwt.verify(token, "hahahahhaha", (error, result)=>{
        if(error){
            res.send("Invalid token")
        }
        else{
            req.userid = result.id
            next()
        }
    })  
 }
}
module.exports = isLoggedInOrNot