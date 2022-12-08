const router = require('express').Router();
const User = require('../models/user.model');
const db = require('../config/db.config');

router.get('/:id', (req, res)=>{
    User.findById(req.params.id.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with id ${req.params.id} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            res.status(200).send({
                status: 'success',
                data: {
                    pseudo: data.pseudo,
                    email: data.email,
                    id : data.id
                }
            });
            return;
        }
    });
})

router.put('/:id', (req,res) => {
    let updateQuery = "UPDATE users SET pseudo = \"" + req.body.pseudo + "\", email = \"" + req.body.email + "\" WHERE id = " + req.params.id
    db.query(updateQuery, (err, data) => {
        if (err) throw err;

        res.json({status : "success"})
    })
})

router.delete('/:id', (req, res) => {
    User.deleteById(req.params.id.trim(), (err, data) => {
        res.json(data)
    })
})


module.exports = router;