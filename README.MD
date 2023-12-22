# Task API

A small api for task management, it's made in Express and MongoDB.

## Try it online

You can find swagger documentation [Here](https://task-api-jfy7.onrender.com/api-docs/)

And test the endpoints using this URL: https://task-api-jfy7.onrender.com/api/v1/

For authentication you can use this testing credentials

Username: test

Password: Test1234!

## Try it local

clone the repo and execute the following commands

```bash
  cd task-api
  npm install
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`MONGO_URI`
`JWT_KEY`

and for testing

`TEST_TOKEN`
