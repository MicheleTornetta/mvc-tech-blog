const { Model, DataTypes } = require('sequelize');
const Users = require('./user');
const sequelize = require('../config/connection');
const Comments = require('./comments');

class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    article: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'posts',

    //to load database whenever it's changed for the purpose of handlebars
    hooks: {
      afterSave: updateGlobalVariable,
      afterBulkUpdate: updateGlobalVariable,
      afterBulkDestroy: updateGlobalVariable
    }
  }
);

async function updateGlobalVariable() {
  global.posts = await Posts.findAll({
    include: [ Users, Comments ],
    order: [['date', 'DESC']],
  });
}

module.exports = Posts;