import { request } from '../../utils/request'
import { addComment } from '../../redux'

export const addCommentAsync = (postId, content) => (dispatch) => {
	request(`/posts/${postId}/comments`, 'POST', { content }).then((comment) => {
		dispatch(addComment(comment.data))
	})
}
