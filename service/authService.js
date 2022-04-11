const model = require('../models');
const crypto = require('crypto');
const randomstring = require('randomstring');

const login = async (userData) => {
	const user = await model.user.findOne({
		where: {
			email: userData.email,
			password: crypto.createHash('sha256').update(userData.password).digest('base64'),
		}
	})

	if (user) {
		const today = new Date();
		const params = {
			access_token_expire_date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
			updated_at: today,
		}
		if (!user.access_token) {
			user.update({...params, access_token: randomstring.generate(256)});
		}
		user.update(params);

		return {
			success: true, user: {
				access_token: user.access_token,
				username: user.username,
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
				uuid: user.uuid,
			}
		};
	}

	return {success: false, message: 'Email or Password is not correct'};
}

const register = async (userData) => {
	const uuid = require('uuid').v4();
	const today = new Date();
	const params = {
		uuid: uuid,
		username: userData.email,
		email: userData.email,
		first_name: userData.first_name,
		last_name: userData.last_name,
		password: crypto.createHash('sha256').update(userData.password).digest('base64'),
		access_token: randomstring.generate(256),
		access_token_expire_date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
		created_at: today,
		updated_at: today,
	}

	const user = await model.user.create(params);
	if (user) {
		return {
			success: true, message: `User '${user.email}' created successfully`, user: {
				access_token: user.access_token,
				username: user.username,
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
				uuid: user.uuid,
			}
		}
	}
	return {success: false, message: 'Unable to create user'};
}

module.exports = {
	login,
	register,
}