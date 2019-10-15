import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainInput from './MainInput';
import MessageWindow from '../../components/MessageWindow';
import WindowTopBar from '../../components/WindowTopBar';


class MainWindow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
        this.getOpenedMessage = this.getOpenedMessage.bind(this);
        this.scrollToLastMessage = this.scrollToLastMessage.bind(this);
    }

    
    componentDidUpdate() {
        this.scrollToLastMessage();
    }
    

    getOpenedMessage() {
        let listObject, customProperties;
        switch (this.props.openedMessage.messageType) {
            case 'message':
                listObject = Object.assign({}, this.props.messages);
                customProperties = (item) => ({
                    messageType: 'message'
                })
                break;
            default:
                listObject = {};
        }
        if (listObject.hasOwnProperty(`${this.props.openedMessage.messageId}`) && listObject[`${this.props.openedMessage.messageId}`].hasOwnProperty(`${this.props.openedMessage.messageType}s`)) {
            let finalList = listObject[`${this.props.openedMessage.messageId}`][`${this.props.openedMessage.messageType}s`];
            return finalList.map((item, index) => Object.assign({}, item, customProperties(item, index)));
        } else return []
    }

    scrollToLastMessage() {
        this.messageWindow.scrollTop = this.messageWindow.scrollHeight;
    }
    render() {
        return (
            <div className="main-window">
                <div className="main-window__top-bar">
                   <WindowTopBar title={this.props.window.title} meta={this.props.window.meta} />
                </div>
                <div ref={element => this.messageWindow = element} className="main-window__message-window">
                    <MessageWindow  messages={this.getOpenedMessage()}/>
                </div>
                <MainInput wrappedComponentRef={mainInput => this.mainInput = mainInput} activeMessages={ this.getOpenedMessage()} />
            </div>
        )
    }
}

export default withRouter(connect(state => ({
    window: state.window,
    messages: state.messages,
    openedMessage: state.openedMessage
}))(MainWindow)); 