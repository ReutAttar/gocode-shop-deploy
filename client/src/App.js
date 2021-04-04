import "./App.css";
// import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import ThemeContext, { themes } from "./contexts/ThemeContext";
import { useState } from "react";
import SaleContext from "./contexts/SaleContext";
import LoginPopup from "./components/Popups/Login/LoginPopup";
import AdminContext from "./contexts/AdminContext";
import ProductsContext from "./contexts/ProductsContext";

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentSale, setCurrentSale] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [eventTarget, setEventTarget] = useState(null);
  const [products, setProducts] = useState([]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <SaleContext.Provider value={[currentSale, setCurrentSale]}>
        <AdminContext.Provider value={[isAdmin, setIsAdmin]}>
          <ProductsContext.Provider value={[products, setProducts]}>
            <div className="switch-buttons">
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
              </div>
              <div className="adminState">
                <button
                  onClick={(event) => {
                    let el = event.target;
                    setEventTarget(event.target);
                    if (el.getAttribute("aria-checked") === "true") {
                      el.setAttribute("aria-checked", "false");
                      setShowPopup(true);
                    } else {
                      el.setAttribute("aria-checked", "true");
                      setIsAdmin(false); //logout of admin state
                    }
                  }}
                  role="switch"
                  aria-checked="true"
                  className="admin switch"
                >
                  <span>Admin</span>
                  <span>Logout</span>
                </button>

                {showPopup && (
                  <LoginPopup
                    setAdmin={setIsAdmin}
                    closePopup={() => {
                      setShowPopup(false);
                      if (!isAdmin) {
                        eventTarget.setAttribute("aria-checked", "true");
                        // console.log(isAdmin);
                      }
                    }}
                  />
                )}
              </div>
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
                </ul>
              </nav>

              <Switch>
                <Route path="/products/:productId" component={ProductPage} />

                <Route path="/about">
                  <About />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Router>
          </ProductsContext.Provider>
        </AdminContext.Provider>
      </SaleContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
