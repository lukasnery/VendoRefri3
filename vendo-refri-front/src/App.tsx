import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./Routes/PrivateRoute";
import Register from "./pages/Auth/Register";
import ProductList from "./pages/Products/ProductList";
import ProductForm from "./pages/Products/ProductForm";
import OrderList from "./pages/Orders/OrderList";
import OrderForm from "./pages/Orders/OrderForm";
import Profile from "./pages/Users/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />

        <Route
          path="/products/new"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/products/edit/:id"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrderList />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders/new"
          element={
            <PrivateRoute>
              <OrderForm />
            </PrivateRoute>
          }
          />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
             <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;