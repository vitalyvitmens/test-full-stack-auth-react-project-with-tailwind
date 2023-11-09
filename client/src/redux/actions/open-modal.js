import { ACTION_TYPE } from '../../redux'

export const openModal = (modalParams) => ({
	type: ACTION_TYPE.OPEN_MODAL,
	payload: modalParams,
})
