import { setUsers } from '..'

export const loadUsersAsync = () => {
	return async (dispatch) => {
		const response = await fetch(`/users`, {
			method: 'GET',
		})
		const users = await response.json()
		return dispatch(setUsers(users))
	}
}
