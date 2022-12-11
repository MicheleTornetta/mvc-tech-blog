require('dotenv').config()
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const app = express();
const PORT = process.env.PORT || 3005;
const sequelize = require('./config/connection');
const session = require('express-session');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'v5SCD!=RQSTz_!&FgK-Qfi$^9jhot3%XGJiVE!$%3*94I-nPwdzcoAFC$TKs#j@s&__4DxZgZ8TNhTxiT0YCTudhlbQt*wTFH=SA9rU721(ll6C1yiuLHSr7RqINCI@H',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/')));

app.use('/api', require('./controllers/api/index'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening http://localhost:' + PORT));
}); 