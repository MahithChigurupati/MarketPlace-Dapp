import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./components/homePage.js";
import ProductPage from "./components/productPage.js";

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <div className="logo">
            <h1>
              <a href="">Grandpa's Toolbox</a>
            </h1>
          </div>
          <ul>
            <li>
              <a href="./">Home</a>
            </li>
            <li>
              <a href="/Products">Products</a>
            </li>
            <li className="nav-cta">
              <a href="#">Connect</a>
            </li>
          </ul>
        </nav>
      </header>

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/Products" element={<ProductPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
