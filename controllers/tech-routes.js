const router = require('express').Router();
const sequelize = require('../config/connection');
const userLogin = require('../models/login');
const blogPosts = require('../models/posts');

router.get('/', async (req, res) => {
  // TODO: Build out this route so that it serializes all of the posts published. See the 'get' route below for a hint.
  const postsData = await Posts.findAll({});
  console.log(postsData);

  // for-loop
  // array
  // const posts = postsData.map((posts) => {
  //   console.log(posts.get({plain:true}));
  //   return posts.get({plain:true});
  // })

  const posts = postsData.map((posts) => posts.get({plain:true}));

  return res.render('all', { posts: posts});
  
  // //        namedTemplate, inputObject
  // return res.render('all', {
  //   posts: [
  //     {
  //       id: 1,
  //       posts_name: 'French Bread with Brie Cheese',
  //       article: 'French baguette with warm brie',
  //       author_name: 'Ivan',
  //       createdAt: "2022-12-09T01:23:53.000Z",
  //       updatedAt: "2022-12-09T01:23:53.000Z"
  //     }
  //   ]
  // });
});

// route to get one post
router.get('/posts/:id', async (req, res) => {
  try{ 
      const postsData = await Posts.findByPk(req.params.id);
      if(!postsData) {
          res.status(404).json({message: 'No posts with this id!'});
          return;
      }
      const posts = postsData.get({ plain: true });
      console.log(posts);
      res.render('posts', posts);
    } catch (err) {
        res.status(500).json(err);
    };     
});

module.exports = router;
