import React, { useEffect } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import LessonPage from "./pages/LessonPage";
import LoginPage from "./pages/LoginPage";

import "bootstrap/dist/css/bootstrap.min.css";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "./redux/store";
import { restoreLogin } from "./redux/auth/thunk";
import CategoryPage from "./pages/CategoryPage";
import CoursePage from "./pages/CoursePage";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  );

  const isDarkMode = useSelector((state: IRootState) => state.dark.mode);

  useEffect(() => {
    if (isAuthenticated === null) {
      dispatch(restoreLogin());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isDarkMode) {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="App">
      <Header />
      {/* routes */}
      <Switch>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/lesson" exact={true} component={LessonPage} />
        <Route path="/login" exact={true} component={LoginPage} />
        <Route
          path="/category/:categoryName"
          exact={true}
          component={CategoryPage}
        />
        <Route
          path="/category/others/:categoryName"
          exact={true}
          component={CategoryPage}
        />
        <Route path="/course/:courseName" exact={true} component={CoursePage} />
        {/* ... */}
        <Route path="/404" exact={true} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
