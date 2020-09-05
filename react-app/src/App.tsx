import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ClassesPage from "./pages/ClassesPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      {/* routes */}
      <Switch>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/classes" exact={true} component={ClassesPage} />
        <Route path="/login" exact={true} component={LoginPage} />

        {/* ... */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
