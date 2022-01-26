import express from 'express'
import dotenv from 'dotenv'

const app = express()
dotenv.config({path: './.env'})

console.log(process.env.PORT)
app.listen(process.env.PORT)