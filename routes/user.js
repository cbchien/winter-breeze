const Router = require('express-promise-router')
const db = require('./../db')

// create a new express-promise-router
// allows for async functions as route handlers
const router = new Router()

// export our router to be mounted by the parent application
module.exports = router

router.get('/users', async (req, res) => {
    const { id } = req.query

    // Return all user if no query parameter provided
    if (!id) {
        let userQueryAll = `
        SELECT *
        FROM users
        `
        const userQueryResponse = await db.query(userQueryAll)
            .catch(err => res.status(404).send({error: err.message}))
        res.status(200).send(userQueryResponse.rows)
        return
    }
 
    let userQuery = `
        SELECT *
        FROM users
        WHERE id = $1
        `
    let companyQuery = `
        SELECT json_agg(a.jsonData) AS companies
        FROM (
            SELECT row_to_json(arrayOfCompanies) AS jsonData
            FROM (
                SELECT c.id, c.created_at, c.name, t.contact_user
                FROM companies c
                INNER JOIN teams t
                    ON t.company_id = c.id
                    WHERE t.user_id = $1
                    LIMIT 5
            ) AS arrayOfCompanies
        ) a`

    let listingQuery = `
        SELECT json_agg(a.jsonData) AS listings
        FROM (
            SELECT row_to_json(arrayOfListings) AS jsonData
            FROM (
                SELECT l.id, l.created_at, l.name, l.description
                FROM listings l
                WHERE l.created_by = $1
                LIMIT 5
            ) AS arrayOfListings
        ) a`

    let applicationQuery = `
        SELECT json_agg(a.jsonData) AS applications
        FROM (
            SELECT row_to_json(arrayOfApplications) AS jsonData
            FROM (
                SELECT 
                    a.id, 
                    a.created_at, 
                    a.cover_letter, 
                    json_build_object(
                        'id', l.id, 
                        'name', l.name, 
                        'description', l.description) AS listing
                FROM applications a
                INNER JOIN listings l
                    ON l.id = a.listing_id
                WHERE a.user_id = $1
                LIMIT 5
            ) AS arrayOfApplications
        ) a`
    
    // use db pool connection to query db
    try {
        const userQueryResponse = await db.query(userQuery, [id])

        // return message when user is not found
        if (userQueryResponse.rows.length === 0 || userQueryResponse.rows[0] == undefined) {
            return res.status(404).send({message: `user not found for user id ${id}`})
        }

        // continue call subsequent queries
        const companyQueryResponse = await db.query(companyQuery, [id])
        const listingQueryResponse = await db.query(listingQuery, [id])
        const applicationQueryResponse = await db.query(applicationQuery, [id])
        let data = Object.assign(
            userQueryResponse.rows[0],
            { companies:companyQueryResponse.rows[0].companies },
            listingQueryResponse.rows[0],
            applicationQueryResponse.rows[0]
        )    
        res.status(200).send(data)
    } catch(err) {
        return res.status(404).send({error: err.message})
    }
})