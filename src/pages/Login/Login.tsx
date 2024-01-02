import { useState } from "react";
import { LoginView } from "./LoginView";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { onLogin } = useAuth();

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
	};
	return <LoginView showPassword={showPassword} onShowPassword={handleShowPassword} onLogin={handleSignIn} onChangeValue={handleChangeValue} />;
};
