import React, { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsVisible, setCartVisible] = useState(false);

  const handleCartOpen = () => {
    setCartVisible(true);
  };
  const handleCartClose = () => {
    setCartVisible(false);
  };

  return (
    <CartProvider>
      {cartIsVisible && <Cart onCartClose={handleCartClose} />}
      <Header onCartOpen={handleCartOpen} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}
export default App;
