import express, { NextFunction, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyparser from 'body-parser'

import todoRoutes from './routes/todo'
import authRoutes from './routes/auth'
import { Req, Err } from './util/interfaces'

const app = express()
dotenv.config({ path: './.env' })

app.use(bodyparser.json())

app.use(
	cors({
		origin: '*',
		methods: '*',
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
)

app.use('/todo', todoRoutes)
app.use('/auth', authRoutes)


app.use((error: Err, req: Req, res: Response, next: NextFunction) => {
    const status: number = +error.status! || 500
    const message: string = error.message
    res.status(status).json({
        message: message
    })
})

app.listen(process.env.PORT)
