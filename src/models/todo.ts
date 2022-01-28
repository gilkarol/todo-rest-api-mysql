import db from '../util/database'

interface TodoInterface {
	id: number
	text: string
	creatorId: number
}
export default class Todo {
	constructor(private text: string, private creatorId: number) {}

	async save() {
		return await db.execute(
			'INSERT INTO todos(text, creatorId) VALUES ( ?, ?)',
			[this.text, this.creatorId]
		)
	}

	static async fetchAll() {
		return await db.execute('SELECT * FROM todos')
	}

	static async fetchUserTodos(userId: number) {
		return await db.execute('SELECT * FROM todos WHERE creatorId = ?', [userId])
	}

	static async findById(id: number) {
		const array = await db.execute('SELECT * FROM todos WHERE id = ?', [id])
		return array[0] as TodoInterface[]
	}
}
