const {Sequelize,DataTypes} = require("sequelize")  
require("dotenv").config()
require("./../models/blogModel")
require("./../models/userModel")

const sequelize = new Sequelize({
    database:process.env.database_name,
    username: process.env.db_username,
    password: process.env.db_password,
    port: process.env.db_port,
    host: process.env.db_host,
    dialect: "mysql"
})
// sequelize connect
sequelize.authenticate()
.then(()=>{
    console.log("Database connected Succesfully.")
})
.catch((err)=>{
console.log(" Error occured: ", err);
})

const db = {}

db.sequelize = sequelize;
db.Sequelize = Sequelize
db.blogModel = require("./../models/blogModel")(sequelize, DataTypes)
db.userModel = require("./../models/userModel")(sequelize, DataTypes)

db.userModel.hasMany(db.blogModel, { foreignKey: 'userid' });
db.blogModel.belongsTo(db.userModel, { foreignKey: 'userid' });


    sequelize.sync({alter: false})
    .then(() =>{
    console.log("Migrated Successfully")
})

module.exports = db;