import { Router } from 'express'

import { getTodos, postTodo, patchTodo, deleteTodo } from '../controllers/todo'
import isAuth from '../middleware/is-auth'

const router = Router()

router.get('/', isAuth, getTodos)

router.post('/', isAuth, postTodo)

router.patch('/:todoId', isAuth, patchTodo)

router.delete('/:todoId', isAuth, deleteTodo)


export default router