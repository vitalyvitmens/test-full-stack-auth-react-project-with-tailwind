import { ACTION_TYPE } from '../../redux'
import { ROLE } from '../../constants'

const initialUserState = {
	id: null,
	firstName: null,
	lastName: null,
	email: null,
	roleId: ROLE.GUEST,
}

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			}
		case ACTION_TYPE.SET_USER_DATA:
			return {
				...state,
				...action.payload,
			}
		case ACTION_TYPE.LOGOUT:
			return initialUserState
		default:
			return state
	}
}
