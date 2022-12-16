const Comments = require('./comments');
const Posts = require('./posts');
const Users = require('./user');

// Define a Post as having one Auther to create a foreign key 
Comments.belongsTo(Posts, {
  // When we delete a Post, delete the associated comments.
  onDelete: 'CASCADE',
});

// We can also define the association starting with Comments
Posts.hasMany(Comments, {
  onDelete: 'CASCADE',
});

Posts.belongsTo(Users, {
  onDelete: 'CASCADE',
});

Users.hasMany(Posts, {
  onDelete: 'CASCADE',
});

Comments.belongsTo(Users, {
  onDelete: 'CASCADE',
});

Users.hasMany(Comments, {
  onDelete: 'CASCADE',
})

// We package our two models and export them as an object so we can import them together and use their proper names
module.exports = { Posts, Comments, Users };