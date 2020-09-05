import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import LessonPage from "./pages/LessonPage";
import LoginPage from "./pages/LoginPage";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      {/* routes */}
      <Switch>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/lesson" exact={true} component={LessonPage} />
        <Route path="/login" exact={true} component={LoginPage} />

        {/* ... */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
