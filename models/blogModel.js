const { Sequelize, DataTypes } = require("sequelize");

const makeBlogTable = (sequelize, DataTypes) => {
    const Blog = sequelize.define("blog", {
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.STRING
        },
        userid: {
            type: DataTypes.INTEGER,
        }
    });
    return Blog;
};

module.exports = makeBlogTable;
