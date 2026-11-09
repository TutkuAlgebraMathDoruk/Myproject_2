import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // Dosyaların doğrudan src içindeyse "./Home" yap
import OrderPizza from "./components/OrderPizza";
import Success from "./components/Success";

function App() {
  const [lastOrder, setLastOrder] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/pizza"
        element={<OrderPizza setLastOrder={setLastOrder} />}
      />
      <Route path="/success" element={<Success order={lastOrder} />} />
    </Routes>
  );
}

export default App;