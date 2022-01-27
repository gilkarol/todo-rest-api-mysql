import errorHandler from '../models/error'
import User from '../models/user'
import db from '../util/database'

export const signup = async (req: any, res: any, next: any) => {
    const name: string = req.body.name
    const email: string  = req.body.email
    const password: string = req.body.password

    try {
        const user = new User(name, email, password)
        await user.save()
        res.status(200).json({
            message: 'Created user successfully!'
        })
    } catch (err) {
        next(err)
    }

}