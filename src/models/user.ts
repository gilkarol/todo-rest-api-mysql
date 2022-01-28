import db from '../util/database'

interface UserInterface {
	email: string
	password: string
	name: string
	id: number
}
export default class User {
	constructor(
		private name: string,
		private email: string,
		private password: string
	) {}

	async save() {
		return await db.execute(
			'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
			[this.name, this.email, this.password]
		)
	}

	static async findByEmail(email: string) {
		const array = await db.execute('SELECT * FROM users WHERE email = ?', [
			email,
		])
		return array[0] as UserInterface[]
	}
}
