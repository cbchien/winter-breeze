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

router.get('/topActiveUsers', async (req, res) => {
    const page = req.query.page ? req.query.page : 0

    // query input validation and offset setup
    if (page < 0) {
        res.status(400).send({
            message: `Pagination number error. Please check your url query: ${page}`
        })
        return
    } else if (isNaN(parseInt(page))){
        res.status(400).send({
            message: `Pagination input has to be digit starting from zero. Your current input: ${page}`,
            error: `invalid input syntax for integer: "NaN"`
        })
        return
    }
    const entriesPerPage = 10
    const offset = parseInt(page) * entriesPerPage

    let userQuery = `
    SELECT main.id, main.created_at, main.name, main.count, applied.listings
    FROM (
        SELECT u.id, u.created_at, u.name, COUNT(a.id) AS count
        FROM applications a
        INNER JOIN users u
            ON u.id = a.user_id
        WHERE a.created_at BETWEEN
            NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7 
            AND NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER
        GROUP BY u.id
        ORDER BY count DESC 
    ) main
    INNER JOIN (
        SELECT s.user_id, json_agg(l.name) AS listings
        FROM (
            SELECT 
                id AS application_id, 
                created_at AS application_created_at,
                user_id,
                listing_id,
                ROW_NUMBER() OVER (PARTITION BY user_id
                                   ORDER BY created_at DESC
                                   ) AS rn
            FROM applications
            WHERE created_at BETWEEN
				NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7 
				AND NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER
          ) s
        RIGHT JOIN listings l
            ON l.id = s.listing_id
        WHERE rn <= 3
        GROUP BY s.user_id
    ) applied
        ON applied.user_id = main.id
    OFFSET $1 LIMIT 5
    `
    // use db pool connection to query db
    const userQueryResponse = await db.query(userQuery, [offset])
        .catch(err => res.status(404).send({error: err.message}))

    if (userQueryResponse.rows.length == 0) {
        if (page != 0) {
            return res.status(404).send({
                error: `Data entries in db is less than ${offset}`, 
                message: `Please change pagination number. Each page will display ${entriesPerPage} users`})
        }
        return res.status(404).send({message: 'no data'})
    }

    res.status(200).send(userQueryResponse.rows)
})