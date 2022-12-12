require('dotenv').config()
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const helpers = require('./helpers');

const hbs = exphbs.create({
  helpers: {
    posts: helpers.posts
  },
  partialsDir: path.join(__dirname, 'views/partials')
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
// app.get('/', async (req, res) => {
//   // This method is rendering the 'all' Handlebars.js template. This is how we connect each route to the correct template.
//   res.render('all');
// });

app.get('/post/:id', async (req, res) => {
  const post = await Posts.findOne({
    include: [ Users, { model: Comments, include: [Users] } ],
    where: {
      id: req.params.id
    }
  });

  console.log(post);

  const obj = {
    title: post.dataValues.title,
    article: post.dataValues.article,
    date: post.dataValues.date,
    username: post.dataValues.user.dataValues.username,
  };

  console.log(obj);
  
  res.render('layouts/login.handlebars', obj);
});

sequelize.sync({ force: false }).then(async () => {
  global.posts = await Posts.findAll({
    include: [ Users, { model: Comments, include: [Users] } ],
    order: [['date', 'DESC']]
  });

  app.listen(PORT, () => console.log('Now listening http://localhost:' + PORT));
}); 