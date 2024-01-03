import { useEffect, useState } from "react";
import { LoginView } from "./LoginView";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { onLogin } = useAuth();
	const dataUsername = localStorage.getItem("username");
	// event handlers
	const handleChangeValue = (e: any) => {
		const { name, value } = e.target;
		if (name == "username") {
			setUsername(value);
		}

		if (name == "password") {
			setPassword(value);
		}
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleSignIn = async (e: any) => {
		e.preventDefault();
		if (!username || username === "") {
			toast.error("Vui lòng nhập tài khoản!");
			return;
		}

		if (!password || password == "") {
			return toast.error("Vui lòng nhập mật khẩu!");
		}

		await onLogin!(username, password);
		if (dataUsername) {
			localStorage.removeItem("username");
		}
	};

	useEffect(() => {
		setUsername(dataUsername as string);
	}, [dataUsername]);

	return <LoginView showPassword={showPassword} usernameNew={dataUsername} onShowPassword={handleShowPassword} onLogin={handleSignIn} onChangeValue={handleChangeValue} />;
};
