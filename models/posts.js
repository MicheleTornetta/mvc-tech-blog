const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Arthur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Article: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments_id: {
      type: DataTypes.INTEGER,
      // category_id: 0
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'posts',
  }
);

module.exports = Posts;