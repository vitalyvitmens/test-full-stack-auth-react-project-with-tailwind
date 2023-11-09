import { ACTION_TYPE } from '../../redux'
import { request } from '../../utils/request'

export const logout = () => {
	request('/logout', 'POST')

	return {
		type: ACTION_TYPE.LOGOUT,
	}
}
