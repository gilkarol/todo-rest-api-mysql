import db from '../util/database'

export default class User {
	constructor(
		private name: string,
		private email: string,
		private password: string
	) {}

	save() {
		return db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
			this.name,
			this.email,
			this.password,
		])
	}
}
