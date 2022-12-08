const router = require('express').Router();
const db = require('../config/db.config');
const { addArticle: addArticleQuery, getAllArticles : getAllArticlesQuery, deleteArticle : deleteArticleQuery, getOneArticle: getOneArticleQuery, modifyArticle : modifyArticleQuery,
    AllLikedArticle : AllLikedArticleQuery, likeArticle : likeArticleQuery, unlikeArticle: unlikeArticleQuery, allArticleFromAuthor : allArticleFromAuthorQuery, searchArticle : searchArticleQuery } = require('../database/queries');

router.post('/add', (req, res) => {
    db.query(addArticleQuery,
        [
            req.body.title,
            req.body.description, 
            req.body.author_id
        ], 
        (err, data) => {
        if (err) throw err;

        res.json({status : "success"})
    })
})

router.get('/', (req, res) =>{
    db.query(getAllArticlesQuery, (err, data) => {
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

router.delete('/:id', (req, res) => {
    db.query(deleteArticleQuery, req.params.id, (err, data) => {
        if (err) throw err;

        res.json({status : "success"})
    })
})

router.get('/:id', (req, res)=>{
    db.query(getOneArticleQuery, req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Article with id ${req.params.id} was not found`
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
            data = data[0]
            res.status(200).send({
                status: 'success',
                data: {
                    title: data.title,
                    description: data.description,
                    id : data.id,
                    author_id : data.author_id
                }
            });
            return;
        }
    })
})

router.put('/:id', (req,res) => {
    db.query(modifyArticleQuery, 
        [
            req.body.title,
            req.body.description,
            req.params.id
        ],
        (err, data) => {
        if (err) throw err;

        res.json({status : "success"})
    })
})

router.post('/liked', (req, res) => {
    db.query(AllLikedArticleQuery, req.body.id, (err, data) => {
        if (err) throw err;

        res.json({
            status : "success",
            data : data
        })

    })
})

router.post('/like', (req, res) => {
    db.query(likeArticleQuery, 
        [
            req.body.userId,
            req.body.articleId
        ],
        (err, data) => {
        if (err) throw err;

        res.json({status : "success"})

    })
})

router.post('/delete_like', (req, res) => {
    db.query(unlikeArticleQuery, 
        [
            req.body.userId,
            req.body.articleId
        ],
        (err, data) => {
        if (err) throw err;

        res.json({status : "success"})

    })
})

router.get('/author/:id', (req, res) =>{
    db.query(allArticleFromAuthorQuery, req.params.id, (err, data) => {
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

router.post('/search', (req, res) => {
    db.query(searchArticleQuery, 
        [
            req.body.search,
            req.body.search
        ],
        (err, data) => {
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