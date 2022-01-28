import { Router } from 'express'

import { getTodos, postTodo, patchTodo } from '../controllers/todo'
import isAuth from '../middleware/is-auth'

const router = Router()

router.get('/', isAuth, getTodos)

router.post('/', isAuth, postTodo)

router.patch('/:todoId', isAuth, patchTodo)


export default router