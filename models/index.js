const Comments = require('./comments');
const Posts = require('./posts');

// Define a Post as having one Auther to create a foreign key in the `license` table
Comments.hasOne(Post, {
  foreignKey: 'comment_id',
  // When we delete a Post, delete the associated comments.
  onDelete: 'CASCADE',
});

// We can also define the association starting with License
Post.hasMany(Comments, {
  foreignKey: 'comments_id',
});

// We package our two models and export them as an object so we can import them together and use their proper names
module.exports = { Posts, Comments };