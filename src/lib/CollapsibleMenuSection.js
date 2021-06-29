import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import {
	PageLink,
	ConstrainedIcon,
	OpenMenuItemsWrapper
} from './SlideOutMenu';
import { Tooltip } from '@material-ui/core';
import { SlideDown } from 'react-slidedown'

const noop = () => { };
const MenuHeader = styled.h3`
	font-size: 16px;
	font-family: Montserrat;
	font-weight: bold;
	margin-bottom: 6px;
	text-transform: uppercase;
	padding-left: 20px;
`;

const Header = styled(MenuHeader)`
	display: flex;
	align-items: center;
	margin-bottom: 0;
	padding: 6px 20px 6px 20px;
	justify-content: ${({ open }) => open ? 'space-between' : 'center'};
	cursor: pointer;
	font-size: 16px;
	font-family: Montserrat;
	font-weight: bold;
	height: 45px;
	color: ${({ fontColor }) => fontColor} !important;
	&:hover {
		background-color: ${({ hoverColor }) => hoverColor};
		color: ${({ fontColor }) => fontColor} !important;
	};
`;


export default forwardRef(function CollapsibleMenuSection({
	label,
	links = [],
	hoverColor,
	fontColor,
	backgroundColor,
	icon,
	includeListIcon = true,
	open,
	disableMaxHeight
}, ref) {
	const [expanded, setExpanded] = useState(false);
	const arrow = expanded ? <KeyboardArrowUp fontSize="large" /> : <KeyboardArrowDown fontSize="large" />;

	const handleClick = () => {
		if (open) setExpanded(!expanded);
	}

	useImperativeHandle(ref, () => ({
		expandSection: () => setExpanded(true)
	})
	);

	return <>
		<Tooltip title={label} placement="right" arrow>
			<Header open={open} onClick={handleClick} hoverColor={hoverColor} fontColor={fontColor}>
				<div style={{ display: 'inline-flex' }}>
					{icon && <ConstrainedIcon src={icon} />}
					{open && <span style={{ marginLeft: 10 }}>{label}</span>}
				</div>
				{open && arrow}
			</Header>
		</Tooltip>

		<SlideDown >
			<OpenMenuItemsWrapper hoverColor={hoverColor} fontColor={fontColor} backgroundColor={backgroundColor} style={expanded ? { padding: '10px 0px', maxHeight: disableMaxHeight ? 'none' : 300, overflow: 'auto' } : {}}>
				{
					expanded && links.map(({ label, link, disabled, icon, onClick = noop, newTab }, index) => {

						return (
							<PageLink key={label} onClick={onClick} disabled={disabled} href={link} height={'35px'} fontFamily={'Noto Sans'} {...(newTab ? { target: '_blank', rel: "noopener noreferrer" } : {})}>
								{icon && includeListIcon && <ConstrainedIcon src={icon} />}
								<span>{label}</span>
							</PageLink>
						)
					})
				}
			</OpenMenuItemsWrapper>
		</SlideDown>
	</>
})
