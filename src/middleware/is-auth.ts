import jwt from 'jsonwebtoken'
import errorHandler from '../models/error'

interface Token {
	email: string
	userId: number
	iat: number
}

export default (req: any, res: any, next: any) => {
	const token = req.get('Authorization').split(' ')[1]
	try {
		jwt.verify(token, process.env.JWT_TOKEN as string) as Token
	} catch (err) {
		const error: errorHandler = new Error('Not authenticated!')
		error.status = 401
		next(error)
	}
	const unhashedToken = jwt.verify(
		token,
		process.env.JWT_TOKEN as string
	) as Token
    req.userId = unhashedToken.userId as number
	next()
}
