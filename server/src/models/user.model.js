const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, findUserByEmail: findUserByEmailQuery, findUserById : findUserByIdQuery, deleteUserById : deleteUserByIdQuery } = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor(pseudo, email, password) {
        this.pseudo = pseudo;
        this.email = email;
        this.password = password;
    }

    static create(newUser, cb) {
        db.query(createNewUserQuery, 
            [
                newUser.pseudo,
                newUser.email, 
                newUser.password
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.email
                });
        });
    }

    static findByEmail(email, cb) {
        db.query(findUserByEmailQuery, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static findById(id, cb){
        db.query(findUserByIdQuery, id, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static deleteById(id, cb){
        db.query(deleteUserByIdQuery, id, (err, res) => {
            if (err){
                console.log(err);
                logger.error(err.message);
                cb(err);
                return;
            }

            cb({ status: "success" }, null);
        })
    }
}

module.exports = User;