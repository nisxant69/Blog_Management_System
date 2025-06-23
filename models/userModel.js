const { Sequelize, DataTypes } = require("sequelize");

const makeUserTable = (sequelize, DataTypes ) => {
    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING
        }
    })
    return User
}
module.exports = makeUserTable