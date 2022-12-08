const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUsers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pseudo VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createTableArticles = `
CREATE TABLE IF NOT EXISTS articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    author_id int not null ,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
)
`;

const createTableUserLikes = `
CREATE TABLE IF NOT EXISTS likes (
    user_id INT NOT NULL,
    article_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, article_id)
)
`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, NOW())
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;


const findUserById = `
SELECT * FROM users WHERE id = ?
`;

const deleteUserById =`
DELETE FROM users WHERE id = ?
`;

const getAllUsers = `
SELECT id, pseudo, email, created_on from users
`;

const addArticle = `
INSERT INTO articles VALUES(null, ?, ?, NOW(), ?)
`;

const getAllArticles = `
SELECT * from articles ORDER BY created_on DESC
`;

const getOneArticle = `
SELECT * from articles WHERE id = ?
`;

const deleteArticle = `
DELETE FROM articles WHERE id = ?
`;

const modifyArticle = `
UPDATE articles SET title = ?, description = ? WHERE id = ?
`;

const AllLikedArticle = `
SELECT A.id FROM articles AS A INNER JOIN likes AS L ON L.article_id = A.id WHERE L.user_id = ?
`;

const likeArticle = `
INSERT INTO likes VALUES (?, ?)
`;

const unlikeArticle = `
DELETE FROM likes WHERE user_id = ? and article_id = ?
`;

const allArticleFromAuthor = `
SELECT * from articles WHERE author_id = ? ORDER BY created_on DESC
`;

const searchArticle = `
SELECT * from articles where description like \"%" ? "%\" or title like \"%" ? "%\" ORDER BY created_on DESC
`;


module.exports = {
    createDB,
    dropDB,
    createTableUsers,
    createTableArticles,
    createTableUserLikes,
    createNewUser,
    findUserByEmail,
    findUserById,
    deleteUserById,
    getAllUsers,
    addArticle,
    getAllArticles,
    getOneArticle,
    deleteArticle,
    modifyArticle,
    AllLikedArticle,
    likeArticle,
    unlikeArticle,
    allArticleFromAuthor,
    searchArticle
};
