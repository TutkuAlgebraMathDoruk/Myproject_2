import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import OrderPizza from "./components/OrderPizza";
import Success from "./components/Success";

export default function App() {
  const [lastOrder, setLastOrder] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<OrderPizza setLastOrder={setLastOrder} />} />
      <Route path="/success" element={<Success lastOrder={lastOrder} />} />
    </Routes>
  );
}