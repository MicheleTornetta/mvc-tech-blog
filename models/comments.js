// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Comments model (table) by extending off Sequelize's Model class
class Comments extends Model {}

// set up fields and rules for Comments model
Comments.init(
  {
    //format columm titles
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comments_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arthor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      // category_id: 0
    },

  },
  // config options
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comments;
