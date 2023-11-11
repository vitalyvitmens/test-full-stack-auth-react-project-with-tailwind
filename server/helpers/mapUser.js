module.exports = function (user) {
	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		roleId: user.role,
		registeredAt: user.createdAt,
	}
}
