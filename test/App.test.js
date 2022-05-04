import React, { useEffect, useContext } from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import { cleanup, getByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import SlideOutMenu from '../src/lib/SlideOutMenu';
import SlideOutMenuContextHandler, {
	SlideOutToolContext,
} from '../src/lib/SlideOutMenuContext';

const altSupportLinks = [
	{ label: 'bbbb', icon: 'ServiceIcon', link: 'SERVICE_DESK_HREF' },
	{ label: 'nnnn', icon: 'KnowledgeBaseIcon', link: 'WIKI_HREF' },
];

const allApplicationsLinks = [
	{
		disabled: false,
		icon: 'data:image/png;base64,iVBORw0KGgoAAAA',
		label: 'Administration',
		link: '#/administration',
		skip: false,
	},
	{
		disabled: false,
		icon: 'data:image/png;base64,iVBORw0KGgoAAAA',
		label: 'Audit Workbooks',
		link: '#/dashboard',
	},
];

const associatedApplications = [
	{
		icon: 'data:image/png;base64,gIykBj0AhcDk6CQ',
		label: 'Qlik Developers Hub',
		link: 'https://qlik.audit.boozallencsn.com/hub/my/work',
		target: '_blank',
	},
	{
		icon: 'data:image/png;base64,iVBORw0KGgoAAAA',
		label: 'Jupiter Analytics Hub',
		link: 'https://jupiter.data.mil/#/analytics/hub',
		target: '_blank',
	},
];

function MenuWrapper({ toolState }) {
	const context = useContext(SlideOutToolContext);
	const { setToolState } = context;

	useEffect(() => {
		setToolState(toolState || {});
	}, []);

	return (
		<Route
			exact
			path="/"
			children={({ match, location, history }) => (
				<SlideOutMenu
					match={match}
					location={location}
					history={history}
					applicationsList={allApplicationsLinks}
				/>
			)}
		/>
	);
}

function App({ toolState }) {
	return (
		<div className="App">
			<Router>
				<SlideOutMenuContextHandler>
					<MenuWrapper toolState={toolState} />
				</SlideOutMenuContextHandler>
			</Router>
		</div>
	);
}

describe('menu opens and closes', () => {
	// These tests are easily breakable b/c isVisible does not check if elements are translated off screen or have height of 0, so I have to test implementation details
	test('menu button opens menu and chevron button closes it', () => {
		render(<App />);
		expect(
			screen.queryByText('Advana').parentNode.parentNode
		).not.toHaveAttribute('open');
		expect(screen.queryByText('Advana').parentNode.parentNode).toHaveStyle(`
		transform: translateX(-120%);
	`);

		const closedMenuIcon = screen.getByAltText('menu icon');
		userEvent.click(closedMenuIcon);
		expect(screen.queryByText('Advana').parentNode.parentNode).toHaveAttribute(
			'open'
		);
		expect(screen.queryByText('Advana').parentNode.parentNode).toHaveStyle(`
		transform: translateX(0);
	`);

		const closeButton = screen.getByTestId('close-button');
		userEvent.click(closeButton);
		expect(
			screen.queryByText('Advana').parentNode.parentNode
		).not.toHaveAttribute('open');
		expect(screen.queryByText('Advana').parentNode.parentNode).toHaveStyle(`
		transform: translateX(-120%);
	`);
	});

	test('all applications button opens menu with all applicaitons section open', async () => {
		render(<App />);
		expect(screen.queryByText('Audit Workbooks')).toBeNull();
		expect(screen.queryByText('Administration')).toBeNull();

		const allAppsElements = screen.getAllByTitle(/all applications/i);
		const allAppsButton = allAppsElements.filter((e) => {
			const fiber = Object.keys(e)[0];
			const element = e[fiber];
			return element.elementType === 'a';
		})[0];
		userEvent.click(allAppsButton);

		expect(screen.queryByText('Audit Workbooks')).toBeVisible();
		expect(screen.queryByText('Administration')).toBeVisible();
	});
});

describe('support and all applications sections open and close', () => {
	test('support section opens and closes', () => {
		render(<App />);
		expect(screen.queryByText('Service Desk')).toBeNull();
		expect(screen.queryByText('Knowledge Base')).toBeNull();

		const supportHeader = screen.getByTitle(/Support/i);
		userEvent.click(supportHeader);

		const container = supportHeader.nextSibling;
		expect(getByText(container, 'Service Desk')).toBeVisible();
		expect(getByText(container, 'Knowledge Base')).toBeVisible();
	});

	test('all applications section opens and closes', () => {
		render(<App />);
		expect(screen.queryByText('Administration')).toBeNull();
		expect(screen.queryByText('Audit Workbooks')).toBeNull();

		const allAppsElements = screen.getAllByTitle(/all applications/i);
		const allAppsButton = allAppsElements.filter((e) => {
			const fiber = Object.keys(e)[0];
			const element = e[fiber];
			return element.elementType === 'a';
		})[0];
		userEvent.click(allAppsButton);

		expect(screen.queryByText('Administration')).toBeVisible();
		expect(screen.queryByText('Audit Workbooks')).toBeVisible();
	});
});

describe('menu accepts props and uses them correctly', () => {
	test('shows toolName based on prop defaulting to Advana', () => {
		render(<App />);
		expect(screen.getByText('Advana')).toBeVisible();
		cleanup();

		render(<App toolState={{ toolName: 'NNNN' }} />);
		expect(screen.getByText('NNNN')).toBeVisible();
	});

	test('shows supportLinks from props', () => {
		render(<App toolState={{ defaultSupportLinks: altSupportLinks }} />);
		expect(screen.getByTitle('bbbb')).toBeTruthy();
		expect(screen.getByTitle('nnnn')).toBeTruthy();
		expect(screen.queryByTitle('Service Desk')).toBeNull();
		expect(screen.queryByTitle('Knowledge Base')).toBeNull();
		cleanup();

		render(<App toolState={{ extraSupportLinks: altSupportLinks }} />);
		expect(screen.getByTitle('bbbb')).toBeTruthy();
		expect(screen.getByTitle('nnnn')).toBeTruthy();
		expect(screen.queryByTitle('Service Desk')).toBeTruthy();
		expect(screen.queryByTitle('Knowledge Base')).toBeTruthy();
	});

	test('does not show "associated applications" section if there are none passed in', () => {
		render(<App />);
		expect(screen.queryByText(/ASSOCIATED APPLICATIONS/i)).toBeNull();
	});

	test('displays associated applications passed in', () => {
		render(<App toolState={{ associatedApplications }} />);
		let associatedApps = screen.getByText(/ASSOCIATED APPLICATIONS/i);
		expect(
			getByText(associatedApps.nextSibling, 'Qlik Developers Hub')
		).toBeInTheDocument();
		expect(
			getByText(associatedApps.nextSibling, 'Jupiter Analytics Hub')
		).toBeInTheDocument();
	});

	test('hides sections', () => {
		const hiddenOptions = {
			hideContentSection: true,
			hideAllApplicationsSection: true,
			hideSupportSection: true,
		};
		render(<App toolState={hiddenOptions} />);

		expect(screen.queryByText(/support/i)).toBeNull();
		expect(screen.queryByText(/all applications/i)).toBeNull();
		expect(document.getElementById('slideout-menu-content-open')).toBeNull();
	});
});
