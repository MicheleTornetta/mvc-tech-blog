require('dotenv').config()
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const helpers = require('./helpers');

const hbs = exphbs.create({
  helpers: {
    posts: helpers.posts
  },
});
const app = express();
const PORT = process.env.PORT || 3005;
const sequelize = require('./config/connection');
const session = require('express-session');
const { Posts, Users, Comments } = require('./models');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'v5SCD!=RQSTz_!&FgK-Qfi$^9jhot3%XGJiVE!$%3*94I-nPwdzcoAFC$TKs#j@s&__4DxZgZ8TNhTxiT0YCTudhlbQt*wTFH=SA9rU721(ll6C1yiuLHSr7RqINCI@H',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

global.posts = [];

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views/'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/')));

app.use('/api', require('./controllers/api/index'));

// Add a comment describing the purpose of the 'get' route
// GET route for getting all of the dishes that are on the menu
app.get('/', async (req, res) => {

  const posts = (await Posts.findAll({
    include: [ Users ],
  })).map(post => {
    let articleData = post.dataValues.article;
    if (articleData.length > 260) {
      articleData = articleData.substring(0, 250) + '...';
    }

    return {
      title: post.dataValues.title,
      article: articleData,
      date: post.dataValues.date.toLocaleDateString(),
      username: post.dataValues.user.dataValues.username,
      id: post.dataValues.id
    };
  });

  res.render('index', {
    user: req.session.user,
    posts: posts
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    user: req.session.user
  });
});

app.get('/signup', (req, res) => {
  res.render('signup', {
    user: req.session.user
  });
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user)
    res.redirect('/login');
  else {
    res.render('dashboard', {
      user: req.session.user
    });
  }
});

app.get('/logout', (req, res) => {
  req.session.user = undefined;
  res.redirect('/');
});

app.get('/post/:id', async (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }

  const post = await Posts.findOne({
    include: [ Users, { model: Comments, include: [Users] } ],
    where: {
      id: req.params.id
    }
  });

  const obj = {
    title: post.dataValues.title,
    article: post.dataValues.article,
    date: post.dataValues.date.toLocaleDateString(),
    username: post.dataValues.user.dataValues.username,
    user: req.session.user,
    post_id: post.dataValues.id,
    comments: []
  };

  console.log(post.dataValues.comments.map(comment => {
    return {
      comment: comment.dataValues.comment,
      user: comment.dataValues.user.dataValues.username,
      date: comment.dataValues.date,
    }
  }));
  
  res.render('viewpost', obj);
});

sequelize.sync({ force: false }).then(async () => {
  global.posts = await Posts.findAll({
    include: [ Users, { model: Comments, include: [Users] } ],
    order: [['date', 'DESC']]
  });

  app.listen(PORT, () => console.log('Now listening http://localhost:' + PORT));
});