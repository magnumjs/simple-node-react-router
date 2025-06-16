# simple-node-react-router
Simple Node (server) React (client) Router API login

This is a setup template for a react-router with both client and server within the same repo.

**What's here:**
 - The styles are there for templating (tailwind.css)
 - react-router simple setup paths and nav
 - inital express api calls with json

**What's not here:**
 - separation of client and server
 - creation of docker file
 - creation of yml build GH action file 
   - for aws deploy

**MORE Todos:**
 - server login implemenation (JWT login on server)
 - client jwt implementation
   - react-router auth and rbac
 - websocket simple implementation
   - use case real time push data analytics notifications, chat .. 
 - data persistence (postgres | mongodb | dynamodb)
   - Prisma, dynamoose, mongoose.. 
 - Context API (auth, users ..)
 - Mock API data for tests
 - test, e2e (cypress) pr checks, linting ..
   - Jest and or React Testing Library (storyboard)

