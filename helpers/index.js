const Posts = require("../models/posts");

function posts() {

    const posts = global.posts.map(post => {
        return {
            title: post.dataValues.title,
            article: post.dataValues.article,
            date: post.dataValues.date,
            user: post.dataValues.user?.dataValues.username,
            comments: {
                title: post.dataValues.comments?.dataValues?.comments_title,
                comment: post.dataValues.comments?.dataValues?.comment
            }
        }
    });

    console.log(posts);

    return '<p>all the posts go here!</p>';
}

module.exports = { posts };