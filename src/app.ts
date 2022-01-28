import express, { NextFunction, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyparser from 'body-parser'

import errorHandler from './models/error'
import todoRoutes from './routes/todo'
import authRoutes from './routes/auth'

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


app.use((error: errorHandler, req: any, res: Response, next: NextFunction) => {
    const status = error.status || 500
    const message = error.message
    res.status(status).json({
        message: message
    })
})

app.listen(process.env.PORT)
