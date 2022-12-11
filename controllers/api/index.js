const router = require('express').Router();

const userRoutes = require('./user-routes');
const userRoutes = require('./posts-routes');
const userRoutes = require('./comments-routes');

router.use('/user', user-routes);
router.use('/posts', post-routes);
router.use('/comments', comments-routes);

module.exports = router;