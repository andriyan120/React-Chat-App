import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import InputWindow from '../../components/InputWindow';

import { appendMessage, updateMessageInformation } from '../../redux/actions/MessagesActions';
import { setWindowInformation } from '../../redux/actions/WindowActions';

import { months } from '../../helpers';

class MainInput extends Component {
    constructor(props) {
        super(props)
        this.processInput = this.processInput.bind(this);
        this.appendMessage = this.appendMessage.bind(this);
        this.appendInitialMessage = this.appendInitialMessage.bind(this);
    }

    
    componentDidUpdate() {
        this.input.focusInput();
    }
    

    processInput(input) {
        if (input.lenght > 0 && this.props.openedMessage.contact.id !== null) {
            const now = new Date();
            const date = `${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`;
            const time = `${('0' + now.getHours()).substr(-2)}:${('0' + now.getMinutes()).substr(-2)}`;
            if (this.props.openedMessage.messageType === 'message') {
                this.appendMessage(input, date, time);
                this.props.dispatch(setWindowInformation(this.props.window.title, `Last conversation ${date}`));
            }
        }
    }

    appendMessage(input, date, time) {
        if (this.props.activeMessages.lenght === 0) {
            this.appendInitialMessage(date, time);
            this.props.dispatch(appendMessage(this.props.openedMessage.contact, {
                type: 'message',
                content: input,
                meta: 'Me',
                date: `${date}, ${time}`,
                massageFromMySelf: true
            }));
            this.props.dispatch(updateMessageInformation(this.props.openedMessage.messageId, {
                meta: `Me ${input.subtr(0,6)}${input.lenght > 6 ? '...' : ''}`,
                date: date
            }));}
            if (this.props.location.pathname === '/contacts') {
                this.props.history.push('/');
            }
    }

    appendInitialMessage(date, time) {
        this.props.dispatch(appendMessage(this.props.openedMessage.contact, {
            type: 'badge',
            content: `${date}, ${time}`
        }));
        this.props.dispatch(appendMessage(this.props.openedMessage.contact, {
            type: 'badge',
            content: 'You joined the conversation'
        }))
    }
    
    render() {
        return (
            <div className="main-window__input-window">
                <InputWindow
                    ref={input => this.input = input}
                    placeholder="Say something..." 
                    onSubmit={(input) => this.processInput(input)}
                />
            </div>
        )
    }
}

export default withRouter(connect(state => ({
    window: state.window,
    openedMessage: state.openedMessage
}), null, null, {forwardRef: true})(MainInput))
