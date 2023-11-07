import { NavLink, Route, Routes } from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
