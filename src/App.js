import "./App.css";
import TopMenu from "./components/TopMenu";
import { Products } from "./pages/Products";
import { CartProvider } from "./context/CartContext";
import { Cart } from "./pages/Cart";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => <h2>Home</h2>;
// const Product = () => <h2>Products</h2>;

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <TopMenu />

          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/products" exact element={<Products />} />
            <Route path="/cart" exact element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
