const router = require('express').Router();
const db = require('../config/db.config');

const { getAllUsers: getAllUsersQuery } = require('../database/queries');

router.get('/', (req, res) =>{
    db.query(getAllUsersQuery, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                status: 'error',
                message: err.message
            });
        }
        if (data) {
            res.status(200).send({
                status: 'success',
                data
            });
            return;
        }
    })
})

module.exports = router;