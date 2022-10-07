import { Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./components/Product";
import Products from "./components/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
}

export default App;
