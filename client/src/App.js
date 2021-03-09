import "./App.css";
// import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import ThemeContext, { themes } from "./contexts/ThemeContext";
import { useState } from "react";
import SaleContext from "./contexts/SaleContext";

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const [currentSale, setCurrentSale] = useState(true);
  return (
    <ThemeContext.Provider value={currentTheme}>
      <SaleContext.Provider value={[currentSale, setCurrentSale]}>
        <div className="toggleThemes">
          <button
            onClick={(event) => {
              let el = event.target;

              if (el.getAttribute("aria-checked") === "true") {
                el.setAttribute("aria-checked", "false");
                setCurrentTheme(themes.dark);
              } else {
                el.setAttribute("aria-checked", "true");
                setCurrentTheme(themes.light);
              }
            }}
            role="switch"
            aria-checked="true"
            id="themesColor"
            className="switch"
          >
            <span>dark</span>
            <span>light</span>
          </button>
          <label htmlFor="themesColor" className="switch">
            Themes
          </label>
        </div>
        <Router>
          <nav className="navigation">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/products/:productId" component={ProductPage} />
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </SaleContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
