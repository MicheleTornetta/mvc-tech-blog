const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const SALT = 15;

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // TODO: Add hooks here
    hooks: {
      beforeCreate: async (newUserdata) => {
        // should always have a password in the data
        // we should hash that password
        newUserdata.password = await bcrypt.hash(newUserdata.password, SALT);
        return newUserdata;
      },
      beforeUpdate: async (updatedUserdata) => {
        // updates have squishy or very flexible inputs so we should validate before hashing
        if(typeof updatedUserdata.password !== 'undefined'){
          updatedUserdata.password = await bcrypt.hash(updatedUserdata.password, SALT);
        }
        return updatedUserdata;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;