import React, { Component } from 'react'

import SidebarTabMenu from './SidebarTabMenu';
import SidebarContactWindow from './SidebarContactWindow';

export default class Sidebar extends Component {
	render() {
		return (
			<div className="sidebar">
				<SidebarTabMenu />
				<SidebarContactWindow />
			</div>
		)
	}
}
