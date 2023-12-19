import "./App.css";
import React from "react";

import {
  Routes,
  Route,
  HashRouter as Router,
  useLocation,
  useNavigate,
  useMatch,
} from "react-router-dom";

import SlideOutMenu from "./lib/SlideOutMenu";
import SlideOutMenuContextHandler from "./lib/SlideOutMenuContext";

function App() {
  const match = useMatch({ path: "./" });
  const location = useLocation();
  const history = useNavigate();

  return (
    <div className="App">
      <Router>
        <Routes>
          <SlideOutMenuContextHandler>
            <Route
              exact
              path="/"
              element={
                <SlideOutMenu
                  match={match}
                  location={location}
                  history={history}
                />
              }
            />
          </SlideOutMenuContextHandler>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
