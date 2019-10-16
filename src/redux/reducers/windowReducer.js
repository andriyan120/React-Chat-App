import * as window from '../type/window'

const initialState = {
	title:'Chat..',
	meta:'ayuk'
}

const windowReducer = (state = initialState, action) => {
	switch (action.type) {
		case window.SET_WINDOW_INFORMATION:
			return {
				title: action.title,
				meta: action.meta
			}
		default:
			return state
	}
}

export default windowReducer;