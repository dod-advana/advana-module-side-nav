import React, { useContext, useRef } from 'react';
import styled, { css } from 'styled-components';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip, Badge } from '@material-ui/core';
import { useMatomo } from '@datapunt/matomo-tracker-react';

// import getPermissionedList from '../materialv3/UOTPlatformList';

import { SlideOutToolContext } from './SlideOutMenuContext'
import CollapsibleMenuSection from './CollapsibleMenuSection';
import SlideOutMenuLinks from './SlideOutMenuLinks';

import MenuIcon from './images/MenuIcon.png';
import ServiceIcon from './images/NewServiceDeskIcon.png'
import KnowledgeBaseIcon from './images/NewKnowledgeBaseIcon.png'
import AppToolsIcon from './images/NewApplicationsIcon.png'
import AdvanaIcon from './images/advana.png'
import PoweredByAdvanaLogo from './images/poweredbyAdvana_wht.png'

import DoDSealIcon from './images/DOD_color.png'
import ODCFOSealIcon from './images/ODCFO_logo.png'
import CDTOSealIcon from './images/CDTO_logo.png'

const noop = () => { };
const SERVICE_DESK_HREF = window?.__env__?.REACT_APP_SUPPORT_HREF || process.env.REACT_APP_SUPPORT_HREF;
const WIKI_HREF = window?.__env__?.REACT_APP_WIKI_HREF || process.env.REACT_APP_WIKI_HREF;

const Z_INDEX = 500;

export const FlexCenteredRow = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const FlexCenteredCol = css`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const MenuWrapper = styled.div`
	position: fixed;
	left: 0;
	top: 2em;
	bottom: 0;
	z-index: ${Z_INDEX};
	font-weight: bold;
	background-color: ${({ menuBackgroundColor }) => menuBackgroundColor};
	color: ${({ fontColor }) => fontColor};
`;

export const OpenedMenu = styled.div`
	${FlexCenteredCol};

	background-color: inherit;
	color: inherit;
	width: 380px;
	height: 100%;
	position: absolute;
	z-index: ${Z_INDEX + 2};

	box-shadow: ${({ menuShadowColor }) => `20px 0 20px -10px ${menuShadowColor}`};

	transform: translateX(-120%);
	transition: transform 0.2s ease-out;

	${({ open }) => open && css`
		transform: translateX(0);
	`};
`;

export const ClosedMenu = styled.div`
	${FlexCenteredCol};

	background-color: inherit;
	color: inherit;
	width: 50px;
	height: 100%;
	z-index: ${Z_INDEX + 1};

	box-shadow: ${({ menuShadowColor }) => `10px 0px 50px -20px ${menuShadowColor}`};

	transform: translateX(0);
	transition: transform 0.2s ease-in-out;

	${({ open }) => open && css`
		transform: translateX(-120%);
	`};
`;

export const OpenCloseWrapper = styled.div`
	${FlexCenteredRow};
	flex-direction: column;
	cursor: pointer;
	width: 50px !important;
	height: 99px !important;
	background-color: ${({ openCloseButtonBackgroundColor }) => openCloseButtonBackgroundColor};
	color: ${({ openCloseIconColor }) => openCloseIconColor};
	font-size: 50px;

`;

export const ToolAndCloseWrapper = styled.div`
	height: 100px;
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;

	border-style: solid;
	border-top-width: 0;
	border-bottom-width: 1px;
	border-right-width: 0;
	border-left-width: 0;
	border-color: ${({ sectionSeparatorColor }) => sectionSeparatorColor};


	background-color: ${({ logoBackgroundColor }) => logoBackgroundColor};
`;

export const ToolLogo = styled.div`
	display: flex;
	justify-content: center;
	flex: 1;
	height: 100%;
	align-items: center;

	& img {
		max-height: 50px;
		width: auto;
	}
`;

export const MenuHeader = styled.h3`
	font-size: 16px;
	font-family: Montserrat;
	font-weight: bold;
	margin-bottom: 6px;
	text-transform: uppercase;
	padding-left: 20px;
`;

const AcronymSubheaderIcon = styled.img`
	margin-top: 4px;
	width: 30px;
`;

export const PageLink = styled.a`
	color: ${({ fontColor }) => fontColor ? fontColor : 'inherit'};
	text-decoration: none;
	display: flex;
	align-items: center;
	min-height: ${({ height }) => height || '50px'};
	font-size: 16px;
	font-family: ${({ fontFamily }) => fontFamily || 'Montserrat'};
	&:visited,:hover {
		color: ${({ fontColor }) => fontColor ? fontColor : 'inherit'};
		text-decoration: none;
	};

	& > span {
		margin-left: 10px;
	};

	${({ centered }) => centered && css`
		${FlexCenteredRow};
	`};

	${({ disabled }) => disabled && css`
		color: gray;
		cursor: default;
		pointer-events: none;

		&&:visited {
			color: gray;
			text-decoration: none;
			cursor: not-allowed;
		};

		&&:hover {
			color: gray;
			text-decoration: none;
			cursor: not-allowed;
		};
	`};
`;


export const NavItem = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 6px 20px 6px 20px;
	color: white;
`

export const HoverNavItem = styled(NavItem)`
	cursor: pointer;
	justify-content: ${({ centered }) => centered ? 'center' : 'auto'};
	min-height: 35px;
	&:hover {
		background-color: ${({ hoverColor }) => hoverColor || '#13A792'};
		color: white;
	};
`;

export const OpenMenuItemsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	color: ${({ fontColor }) => fontColor ? fontColor : 'inherit'};
	background-color: ${({ backgroundColor }) => backgroundColor};
	& > * {
		padding: 6px 0 6px 20px;
		cursor: pointer;
		width: 100%;

		&:hover {
			background-color: ${({ hoverColor }) => hoverColor};
		};
	};

`;

export const ClosedMenuItemsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	color: ${({ fontColor }) => fontColor ? fontColor : 'inherit'};
	font-size: 40px;

	& > * {
		padding: 6px 0 6px 0;
		cursor: pointer;
		width: 100%;

		&:hover {
			background-color: ${({ hoverColor }) => hoverColor};
		};
	};

`;

export const MenuSectionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	padding: 6px 0 6px 0;
	border-style: solid;
	border-top-width: 0;
	border-bottom-width: 1px;
	border-right-width: 0;
	border-left-width: 0;
	border-color: ${({ sectionSeparatorColor }) => sectionSeparatorColor || '#323E4A'};

`;

const resolveToolTheme = (toolTheme = {}) => {
	const defaults = {
		menuBackgroundColor: '#131E43',
		logoBackgroundColor: '#12141B',
		openCloseButtonBackgroundColor: '#12141B',
		openCloseIconColor: 'white',
		sectionSeparatorColor: '#323E4A',
		fontColor: 'white',
		hoverColor: '#13A792',
		allAppsBackgroundColor: '#12141B',
		menuShadowColor: 'rgba(0,0,0,0.75)',
		toolLogo: null,
		toolIconHref: '#/'
	};

	return { ...defaults, ...toolTheme };
};

const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 24px;
	width: 24px;

	& > img {
		max-height: 100%;
		height: 25px;
		width: 25px;
	};
`;

const NotificationIconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 24px;
	width: 24px;
	border-top: unset !important;

	& > img {
		width: 20px;
	};
`;

const SealIconsOpenWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 71px;
	width: 100%;
	margin-top: 30px;

	& > img {
		max-height: 100%;
		width: 71px;
		margin: 10px;
	};
`;

const SealIconsClosedWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%px;
	width: 100%;
	margin-top: 30px;

	& > img {
		max-height: 30px;
		width: 30px;
		margin: 10px;
	};
`;

const PoweredByOpenWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 62px;
	width: 100%;
	margin-top: 30px;

	& > img {
		max-height: 100%;
		width: 265px;
	};
`;

const FaIcon = styled.i`
	color: white;
	font-size: 24px !important;
`;

export const ConstrainedIcon = ({ src, faIcon }) => {
	return (
		<IconWrapper>
			{src && <img src={src} alt="tool icon" />}
			{faIcon && <FaIcon className={faIcon} />}
		</IconWrapper>
	)
};

const StyledBadge = withStyles((theme) => ({
	badge: {
		right: 4,
		top: 2,
		fontSize: 14,
		backgroundColor: '#AD0000',
		width: 20,
		height: 20,
		borderRadius: 18
	},
}))(Badge);

export const StyledBadgeSmall = withStyles((theme) => ({
	badge: {
		right: 0,
		top: 1,
		fontSize: 12,
		backgroundColor: '#AD0000',
		width: 16,
		height: 16,
		borderRadius: 14,
		minWidth: 16
	},
}))(Badge);

export const Notifications = ({ src, notificationCount }) => {
	return (
		<StyledBadge badgeContent={notificationCount}>
			<NotificationIconWrapper>
				<img src={src} alt="notification icon" />
			</NotificationIconWrapper>
		</StyledBadge>
	)
};

export const NotificationsClosed = ({ src, notificationCount }) => {
	return (
		<StyledBadgeSmall badgeContent={notificationCount}>
			<NotificationIconWrapper>
				<img src={src} alt="notification icon" />
			</NotificationIconWrapper>
		</StyledBadgeSmall>
	)
};

export const SealIconsOpen = () => {
	return (
		<SealIconsOpenWrapper>
			<img src={DoDSealIcon} alt={"DoD Seal"} />
			<img src={ODCFOSealIcon} alt={"ODCFO Seal"} />
			<img src={CDTOSealIcon} alt={"CDTO Seal"} />
		</SealIconsOpenWrapper>
	)
}

export const PoweredByOpen = () => {
	return (
		<PoweredByOpenWrapper>
			<img src={PoweredByAdvanaLogo} alt={"Powered by logo"} />
		</PoweredByOpenWrapper>
	)
}

export const SealIconsClosed = () => {
	return (
		<SealIconsClosedWrapper>
			<img src={DoDSealIcon} alt={"DoD Seal"} />
			<img src={ODCFOSealIcon} alt={"ODCFO Seal"} />
			<img src={CDTOSealIcon} alt={"CDTO Seal"} />
			<img src={AdvanaIcon} alt={"Advana Icon"} />
		</SealIconsClosedWrapper>
	)
}

export const IconPageLink = ({ IconComponent, tooltip, href, newTab, onClick = noop, fontColor }) => {
	const linkMeta = newTab ? { target: '_blank', rel: "noopener noreferrer" } : {}
	return (
		<Tooltip title={tooltip} placement="right" arrow>
			<PageLink href={href} onClick={onClick} centered {...linkMeta} fontColor={fontColor} >
				{IconComponent}
			</PageLink>
		</Tooltip>
	)
};

export const ScrollableArea = styled.div`
	padding 0 !important;
	border: none !important;
	width: 100%;
	overflow-y: auto;
	padding-bottom: 24px;
`

const DEFAULT_SUPPORT_LINKS = [
	{ label: 'Service Desk', icon: ServiceIcon, link: SERVICE_DESK_HREF, newTab: true },
	{ label: 'Knowledge Base', icon: KnowledgeBaseIcon, link: WIKI_HREF, newTab: true },
];


const Menu = ({ applicationsList, className }) => {
	const { trackEvent } = useMatomo();
	const allApplications = applicationsList || [];
	const sidebarContext = useContext(SlideOutToolContext);
	const cMenuRef = useRef(null);

	const {
		menuOpened,
		toggleMenu,
		toolState = {}
	} = sidebarContext;

	const {
		toolTheme = {},
		toolName = 'Advana',
		hideContentSection = false,
		hideAllApplicationsSection = false,
		hideSupportSection = false,
		defaultSupportLinks = DEFAULT_SUPPORT_LINKS,
		extraSupportLinks = [],
		associatedApplications = []
	} = toolState;

	const {
		menuBackgroundColor,
		logoBackgroundColor,
		openCloseButtonBackgroundColor,
		openCloseIconColor,
		sectionSeparatorColor,
		fontColor,
		menuShadowColor,
		hoverColor,
		toolLogo,
		logoFontSize,
		allAppsBackgroundColor
	} = resolveToolTheme(toolTheme)

	const handleAppToggle = () => {
		cMenuRef.current.expandSection();
		handleToggle();
	}

	const handleToggle = () => {
		trackEvent({
			category: 'SlideOutMenu',
			action: 'click',
			name: 'Slide out menu toggle',
			value: menuOpened? 'Closed' : 'Opened'
		});
		toggleMenu();
	}
	const textLogoStyles = { fontFamily: 'Montserrat', textDecoration: "none", marginLeft: "15px", fontSize: logoFontSize || 32, lineHeight: 1, fontWeight: 'bolder', textTransform: 'uppercase' };
	return (
		<MenuWrapper menuBackgroundColor={menuBackgroundColor} fontColor={fontColor} className={className} >

			<OpenedMenu
				open={menuOpened}
				menuShadowColor={menuShadowColor}
			>
				<ToolAndCloseWrapper logoBackgroundColor={logoBackgroundColor} sectionSeparatorColor={sectionSeparatorColor}>
					{toolLogo ?
						<ToolLogo >
							{toolLogo}
						</ToolLogo> :
						<PageLink style={textLogoStyles}>{toolName}</PageLink>
					}

					<OpenCloseWrapper
						openCloseButtonBackgroundColor={openCloseButtonBackgroundColor}
						openCloseIconColor={openCloseIconColor}
						onClick={handleToggle}
						data-testid="close-button"
					>
						<KeyboardArrowLeft fontSize="inherit" />
					</OpenCloseWrapper>

				</ToolAndCloseWrapper>
				<ScrollableArea>
					{!hideContentSection &&
						<MenuSectionWrapper sectionSeparatorColor={sectionSeparatorColor} centered main={true}>
							<div id="slideout-menu-content-open"></div>
						</MenuSectionWrapper>
					}

					{associatedApplications && associatedApplications?.length > 0 &&
						<MenuSectionWrapper sectionSeparatorColor={sectionSeparatorColor} style={{ paddingBottom: 0 }}>
							<NavItem>ASSOCIATED APPLICATIONS</NavItem>
							<SlideOutMenuLinks open={true} links={associatedApplications} />
						</MenuSectionWrapper>
					}

					{!hideSupportSection && (
						<MenuSectionWrapper sectionSeparatorColor={sectionSeparatorColor} style={{ paddingBottom: 0 }}>
							<CollapsibleMenuSection
								label={"Support"}
								links={[
									...(defaultSupportLinks || DEFAULT_SUPPORT_LINKS),
									...(extraSupportLinks || [])
								]}
								open={true}
								hoverColor={hoverColor}
								fontColor={fontColor}
								backgroundColor={allAppsBackgroundColor}
							/>
						</MenuSectionWrapper>
					)}

					{!hideAllApplicationsSection && (
						<MenuSectionWrapper sectionSeparatorColor={sectionSeparatorColor} style={{ paddingBottom: 0 }}>
							<CollapsibleMenuSection
								label={"All Applications"}
								icon={AppToolsIcon}
								links={allApplications.filter(({ skip, sideNavSkip }) => !skip && !sideNavSkip)}
								open={true}
								hoverColor={hoverColor}
								fontColor={fontColor}
								backgroundColor={allAppsBackgroundColor}
								includeListIcon={false}
								ref={cMenuRef}
								disableMaxHeight={true}
							/>
						</MenuSectionWrapper>
					)}

				</ScrollableArea>

			</OpenedMenu>

			<ClosedMenu
				open={menuOpened}
				menuShadowColor={menuShadowColor}
			>
				<ToolAndCloseWrapper logoBackgroundColor={logoBackgroundColor} sectionSeparatorColor={sectionSeparatorColor}>
					<OpenCloseWrapper
						openCloseButtonBackgroundColor={openCloseButtonBackgroundColor}
						openCloseIconColor={openCloseIconColor}
						onClick={handleToggle}
					>
						<AcronymSubheaderIcon src={MenuIcon} alt="menu icon" />
					</OpenCloseWrapper>

				</ToolAndCloseWrapper>
				<ScrollableArea>
					{!hideContentSection &&
						<MenuSectionWrapper sectionSeparatorColor={sectionSeparatorColor} main>
							<div id="slideout-menu-content-closed"></div>
						</MenuSectionWrapper>
					}

					{associatedApplications && associatedApplications?.length > 0 &&
						<MenuSectionWrapper sectionSeparatorColor={sectionSeparatorColor}>
							<SlideOutMenuLinks open={false} links={associatedApplications} />
						</MenuSectionWrapper>
					}

					{!hideSupportSection && (
						<MenuSectionWrapper sectionSeparatorColor={sectionSeparatorColor}>
							<ClosedMenuItemsWrapper hoverColor={hoverColor} fontColor={fontColor}>
								{defaultSupportLinks.map(link =>
									<React.Fragment key={`${link.label}-${link.link}`}>
										<IconPageLink IconComponent={<ConstrainedIcon src={link.icon} fontColor={fontColor}/>} tooltip={link.label} href={link.link} newTab />
									</React.Fragment>
								)}
								{extraSupportLinks.map(link =>
									<div key={`${link.label}-${link.link}`} id={link.id || ''} className={link.extraClass || ''}><IconPageLink onClick={link.onClick} IconComponent={<ConstrainedIcon src={link.icon} fontColor={fontColor}/>} tooltip={link.label} href={link.link} newTab={link.newTab} /></div>
								)}
							</ClosedMenuItemsWrapper>
						</MenuSectionWrapper>
					)}

					{!hideAllApplicationsSection && (
						<ClosedMenuItemsWrapper hoverColor={hoverColor} onClick={handleAppToggle} fontColor={fontColor}>
							<IconPageLink IconComponent={<ConstrainedIcon src={AppToolsIcon} fontColor={fontColor} />} tooltip="All Applications" />
						</ClosedMenuItemsWrapper>
					)}


				</ScrollableArea>
			</ClosedMenu>
		</MenuWrapper>
	)
};

export default Menu;
