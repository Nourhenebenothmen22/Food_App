import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile/Profile";
import Success from "./pages/Success/Success";

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Routes avec Layout (navbar + footer) */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        <Route
          path="/order"
          element={
            <Layout>
              <PlaceOrder />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        {/* Routes sans Layout (pas de navbar/footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
