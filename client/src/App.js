import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Startup from "./pages/Startup";
import Landing from "./pages/Landing";
import BreedInfo from "./pages/BreedInfo";
import NoMatch from "./pages/NoMatch";

const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        {/* <Route exact path="/api" component={Landing} /> */}
        <Route path="/:name" component={BreedInfo} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
};

export default App;
