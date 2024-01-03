import { createContext, useState, useEffect } from "react";
import { getUserForLogin } from "../../api/apiUser";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../utils/constants";
import { toast } from "react-toastify";

interface UserContextType {
	dataUser?: {
		username: string | null;
		fullName: string | null;
		avatarUrl: string | null;
		roles: number[] | null;
	} | null;
	onLogin?: (username: string, password: string) => Promise<any>;
	onLogout?: () => void;
}

export const AuthContext = createContext<UserContextType>({});

export const AuthProvider = ({ children }: any) => {
	const [dataUser, setDataUser] = useState<{
		username: string | null;
		fullName: string | null;
		avatarUrl: string | null;
		roles: number[] | null;
	} | null>({
		username: "",
		fullName: "",
		avatarUrl: "",
		roles: null,
	});
	const navigate = useNavigate();

	const login = async (username: string, password: string) => {
		const checkLogin = await getUserForLogin(username, password);
		if (checkLogin) {
			localStorage.setItem("authenticated", AUTH);
			const { password, ...restDataUser } = checkLogin;
			setDataUser({
				username: restDataUser?.username,
				fullName: restDataUser?.fullName,
				avatarUrl: restDataUser?.avatarUrl,
				roles: restDataUser?.roles,
			});
			localStorage.setItem("auth_data", JSON.stringify(restDataUser));
			navigate("/");
		} else {
			toast.error("Tài khoản không chính xác hoặc không tồn tại. Vui lòng thử lại!!!");
		}
	};

	const logout = () => {
		setDataUser(null);
		localStorage.removeItem("authenticated");
		localStorage.removeItem("auth_data");
	};

	useEffect(() => {
		const userData = localStorage.getItem("auth_data");
		const userObject = userData ? JSON.parse(userData) : null;
		if (userObject) {
			setDataUser({
				username: userObject?.username,
				fullName: userObject?.fullName,
				avatarUrl: userObject?.avatarUrl,
				roles: userObject?.roles,
			});
		}
	}, []);

	const value = {
		dataUser,
		onLogin: login,
		onLogout: logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
