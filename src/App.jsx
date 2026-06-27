import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import LeadershipPage from "./components/Leadership.jsx";
import ProductsPage from "./components/ProductsPage.jsx";
import Contact from "./components/Contact.jsx";
import PageBottom from "./components/PageBottom.jsx";
import { useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();
  const showContactBottom = location.pathname !== "/contact";

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <PageBottom showContact={showContactBottom} showFooter={true} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
