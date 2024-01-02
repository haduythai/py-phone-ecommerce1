import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AuthMiddleware = ({ allowedRoles }: any) => {
	const location = useLocation();
	const { dataUser } = useAuth();

	return !dataUser?.roles?.find((role) => allowedRoles?.includes(role)) ? (
		<Outlet />
	) : dataUser ? (
		<Navigate to="/unauthorized" state={{ from: location }} replace />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};
