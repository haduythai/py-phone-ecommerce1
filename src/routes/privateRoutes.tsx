import { Route } from "react-router-dom";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { Admin } from "../pages/Admin/Admin";
import ProductManagement from "../pages/Admin/ProductManagement/ProductManagement";
import { UserManagement } from "../pages/Admin/UserManagement/UserManagement";

export const privateRoutes = (
	<>
		<Route path="admin" element={<AuthMiddleware allowedRoles={[0]} />}>
			<Route path="" element={<Admin />} />
			<Route path="product-management" element={<ProductManagement />} />
			<Route path="account-management" element={<UserManagement />} />
		</Route>
	</>
);
