import React, { Component, createContext } from 'react';
import AdvanaTextIcon from './images/Advana-02wht.png'

export const SlideOutToolContext = createContext()

const initState = {
	menuOpened: false,
	toolTheme: {
		toolIcon: AdvanaTextIcon
	},
	toolName: 'Advana',
	openedContentArea: null,
	closedContentArea: null,
}

export default class SlideOutMenuContextHandler extends Component {
	constructor(props) {
		super(props);

		this.state = initState;
		this.setState = this.setState.bind(this);
	}

	unsetTool = () => {
		this.setState(initState);
	}

	toggleMenu = () => {
		this.setState({ menuOpened: !this.state.menuOpened });
	}

	setMenuOpened = (opened) => {
		this.setState({ menuOpened: opened });
	}

	render() {
		const { menuOpened, ...toolState } = this.state
		return (
			<SlideOutToolContext.Provider
				value={{
					toolState,
					setToolState: this.setState,
					unsetTool: this.unsetTool,
					menuOpened,
					toggleMenu: this.toggleMenu,
					setMenuOpened: this.setMenuOpened
				}}
			>
				{this.props.children}
			</SlideOutToolContext.Provider>
		)
	}
}