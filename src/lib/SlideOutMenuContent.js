import React from 'react';
import { createPortal } from 'react-dom';

/** Page must be a redesign path in App.js for this component to work  */
export default function SlideOutMenuContent(props) {
	const elementID = 'slideout-menu-content-' + props.type;
	try {
		let el = document.getElementById(elementID);
		if (el)
			return createPortal(props?.children, el);
		else
			return <></>;
	} catch (err) {
		console.error(err?.message);
		return <></>;
	}
}