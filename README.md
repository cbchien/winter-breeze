# Winter-Breeze
backend JSON API with Node.js and PostgreSQL

# Avaiable Endpoints
`/topActiveUsers?page={pageNumber}`
Returns user info, count of applications in the last week and the names of the 3 latest applied listings. All the users should be listed and ordered by total activity.

`/users?id={user.id}`
Returns user information at a given user id

## Things to keep in mind to run with Node runtime
1. Make sure to have postgres install
2. create postgres database 
3. create `.env` file and include necessary database information
4. Run the following commands to populate db
```
psql winter-breeze < structure.sql
psql winter-breeze < data.sql
```
5. `npm install`
6. `npm run start` for production
7. `npm run start:dev` for development

## Things to keep in mind to run with Docker
1. Create `docker-compose.yml`. See `docker-compose.yml.example` for reference
2. Node app image will be created when postgres db is running
3. Check information in `Dockerfile`

## Time take on completing the exercise
Estimated time 7-9hr
Actual time 12hr
- 0.5hr Understanding of requirements
- 1.5hr getting familiar with Docker usage
- 1.0hr Setting up Node.js and Express.js app
- 2.5hr /topActiveUsers view SQL
- 2.5hr /users view SQL
- 2.0hr testing endpoints and adjust HTTP responses
- 1.5hr experiencing difficulties with Docker ran locally on Windows OS
- 0.5hr documentation