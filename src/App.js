import './App.css';

import { Route, HashRouter as Router } from "react-router-dom";

import SlideOutMenu from './lib/SlideOutMenu';
import SlideOutMenuContextHandler from './lib/SlideOutMenuContext';


function App() {
	return (
		<div className="App">
			<Router>
				<SlideOutMenuContextHandler>

					<Route exact path='/' children={({ match, location, history }) => (
						<SlideOutMenu match={match} location={location} history={history} />
					)} />
				</SlideOutMenuContextHandler>

			</Router>

		</div>
	);
}

export default App;
