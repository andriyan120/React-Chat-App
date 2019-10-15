import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setWindowInformation } from '../../redux/actions/WindowActions';
import { openMessage } from '../../redux/actions/OpenedMessageActions';
import { getListFromObject, getListFromArray } from '../../helpers';

import ContactWindow from '../../components/ContactWindow';

class SidebarContactWindow extends Component {
	constructor(props) {
		super(props)
		this.openMessage = this.openMessage.bind(this);
	}
	

	openMessage(contactId) {
		const selectedContact = this.props.contacts.reduce((contact, current) => current.id === contactId ? current : contact, null)
		const selectedMessage = this.props.messages[`${contactId}`];
		if (selectedContact !== null) {
			this.props.dispatch(openMessage(selectedContact, contactId));
			this.props.dispatch(setWindowInformation(selectedContact.title, `Last conversation: ${selectedMessage && selectedMessage.date ? selectedMessage.date : 'never'}`));
		}
	}

	render() {
		return (
			<div className="sidebar__contact-window">
				<Route exact path='/' render={() => <ContactWindow
						contacts={getListFromObject(this.props.messages, this.props.search, ['title', 'meta', 'date'])} 
						activeContactId={this.props.openedMessage.contact.id}
						onContactClick={(contactId) => this.openMessage(contactId)}
						/>} 
				/>
				<Route path='/contacts' render={() => <ContactWindow 
						contacts={getListFromArray(this.props.contacts, this.props.search, ['title', 'meta'])} 
						activeContactId={this.props.openedMessage.contact.id}
						onContactClick={(contactId) => this.openMessage(contactId)}
						/>} 
				/>
			</div>
		)
	}
}

export default withRouter(connect(state => ({
	contacts: state.contacts,
	messages: state.messages,
	openedMessage: state.openedMessage,
	search: state.search
}))(SidebarContactWindow));
