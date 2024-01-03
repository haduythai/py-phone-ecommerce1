import { Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
import { ProductDetail } from "../components/ProductDetail/ProductDetail";

export const publicRoutes = (
	<>
		<Route index element={<Home />} />
		<Route path="login" element={<Login />} />
		<Route path="register" element={<Register />} />
		<Route path="product/:slug/:id" element={<ProductDetail />} />
	</>
);
