const Router = require('express-promise-router')
const db = require('./../db')

// create a new express-promise-router
// allows for async functions as route handlers
const router = new Router()

// export our router to be mounted by the parent application
module.exports = router

router.get('/users', async (req, res, error) => {
    const { id } = req.query

    res.status(200).send(`Yeah! ${id}`)
})