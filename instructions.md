Dependencies Installed:  
npm install
npm install --save mysql2
npm install express-handlebars --save
npm install dotenv --save
npm i bcrypt@5.0.0
npm i express@4.17.1
npm install --save sequelize
npm install -g heroku

Completed setup:
MVC file structure

Connections Completed:
config/connection complete
schema complete
models user.js complete
user-routes
comments-routs
post-routs

Tested:
Server connection good
Heroku working


Issues/Steps
1. 



# 14 Model-View-Controller (MVC): Tech Blog

## Your Task

Your task this week is to build a CMS-style blog site
---developers can publish their blog posts and comment on other developers’ posts as well. 
---deploy it to Heroku. 
---follow the MVC paradigm in its architectural structure
------using Handlebars.js as the templating language, 
------Sequelize as the ORM, 
------express-session npm package for authentication.


## Acceptance Criteria
---CMS-style blog site
---presented with the homepage
------includes existing blog posts if any have been posted
------navigation links for the homepage and the dashboard
------option to log in
---click on the homepage option
------taken to the homepage
---click on any other links in the navigation
------I am prompted to either sign up or sign in
---choose to sign up
------prompted to create a username and password
---click on the sign-up button
------user credentials are saved and I am logged into the site
------WHEN I revisit the site I am prompted to enter my username and password
---WHEN I am signed in to the site
------I see navigation links for the homepage, the dashboard, and the option to log out
---click on the homepage option in the navigation
------taken to the homepage and presented with existing blog posts that include the post title and the date created
---I click on an existing blog post
------I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
---I enter a comment and click on the submit button while signed in
------the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
---I click on the dashboard option in the navigation
------I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
---I click on the button to add a new blog post
------I am prompted to enter both a title and contents for my blog post
---I click on the button to create a new blog post
------title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
---click on one of my existing posts in the dashboard
------I am able to delete or update my post and taken back to an updated dashboard
---click on the logout option in the navigation
------I am signed out of the site
---I am idle on the site for more than a set time
------I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```

## Mock-Up

The following animation demonstrates the application functionality:

![Animation cycles through signing into the app, clicking on buttons, and updating blog posts.](./Assets/14-mvc-homework-demo-01.gif) 

## Getting Started

Your application’s folder structure must follow the Model-View-Controller paradigm. You’ll need to use the [express-handlebars](https://www.npmjs.com/package/express-handlebars) package to implement Handlebars.js for your Views, use the [MySQL2](https://www.npmjs.com/package/mysql2) and [Sequelize](https://www.npmjs.com/package/sequelize) packages to connect to a MySQL database for your Models, and create an Express.js API for your Controllers.

You’ll also need the [dotenv package](https://www.npmjs.com/package/dotenv) to use environment variables, the [bcrypt package](https://www.npmjs.com/package/bcrypt) to hash passwords, and the [express-session](https://www.npmjs.com/package/express-session) and [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) packages to add authentication.

**Note**: The [express-session](https://www.npmjs.com/package/express-session) package stores the session data on the client in a cookie. When you are idle on the site for more than a set time, the cookie will expire and you will be required to log in again to start a new session. This is the default behavior and you do not have to do anything to your application other than implement the npm package.

--------------------------
### Grading

    * Application’s folder structure follows the Model-View-Controller paradigm.

    * Uses the [express-handlebars](https://www.npmjs.com/package/express-handlebars) package to implement Handlebars.js for your Views.

    * Application must be deployed to Heroku.

    * The URL of the functional, deployed application.

    * The URL of the GitHub repository, with a unique name and a readme describing the project.