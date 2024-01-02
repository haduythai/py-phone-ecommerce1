import { Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";

export const publicRoutes = (
	<>
		<Route index element={<Home />} />
		<Route path="login" element={<Login />} />
		<Route path="register" element={<Register />} />
		<Route path="products">
			<Route index element="" />
		</Route>
	</>
);
