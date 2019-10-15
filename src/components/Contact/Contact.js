import React from 'react'
import PropTypes from 'prop-types';

const Contact = (props) => {
	return (
		<div className={`contact ${props.active ? 'contact--active' : ''}`} onClick={props.onClick}>
			{ props.image && <img className="contact__image" scr={ props.image } alt="" /> }
			<div className="contact__content">
				{ props.title && <div className="contact__title">{ props.title }</div> }
				{ props.meta && <div className="contact__meta">{ props.meta }</div> }
			</div>
			{ props.date && <div className="contact__date">{ props.date }</div> }
		</div>
	)
}

Contact.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	meta: PropTypes.string,
	date: PropTypes.string,
	active: PropTypes.bool,
	onClick: PropTypes.func
}

export default Contact
