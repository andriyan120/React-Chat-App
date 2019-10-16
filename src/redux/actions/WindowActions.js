import * as actions from '../type/window';

export const setWindowInformation = (title, meta) => {
	return {
		type: actions.SET_WINDOW_INFORMATION,
		title,
		meta
	}
}
