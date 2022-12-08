const { logger } = require('../../utils/logger');
const { createTableUsers: createTableUSersQuery, createTableArticles : createTableArticlesQuery, createTableUserLikes : createTableUserLikesQuery } = require('../queries');


(() => {    
   require('../../config/db.config').query(createTableUSersQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table users created!');
    });
    require('../../config/db.config').query(createTableArticlesQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table articles created!');
    });
    require('../../config/db.config').query(createTableUserLikesQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table likes created!');
        process.exit(0);
    });
})();


