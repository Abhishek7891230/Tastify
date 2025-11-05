import { HomePage } from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuPage } from "./pages/Menupage";
import { CartBanner } from "./components/CartBanner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
      <CartBanner />
    </Router>
  );
}

export default App;
