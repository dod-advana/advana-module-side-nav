import React from 'react';
import _ from 'underscore';
import { Tooltip } from '@material-ui/core';
import { PageLink, ConstrainedIcon, HoverNavItem } from './SlideOutMenu';

export default function SlideOutMenuLinks({ links = [], open, className }) {
	return <div style={{ display: 'flex', flexDirection: "column" }} className={className}>
		{links.map((link, idx) => {
			if (_.isFunction(link.permission) && !link.permission())
				return null;

			return <Tooltip key={`slideoutlink-${idx}`} title={link.label} placement="right" arrow>
				<PageLink href={link.link} centered style={{ width: '100%' }} height={'35px'} disabled={link.disabled} onClick={link.onClick} target={link.target}>
					<HoverNavItem centered={!open}>
						{link.icon && <ConstrainedIcon src={link.icon} />}
						{link.faIcon && <i style={{ fontSize: 26 }} className={link.faIcon} aria-hidden="true"></i>}
						{open && <span style={{ marginLeft: '10px' }}>{link.label}</span>}
					</HoverNavItem>
				</PageLink>
			</Tooltip>
		})}
	</div>
}