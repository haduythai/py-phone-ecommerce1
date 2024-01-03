import { nanoid } from "nanoid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserForLogin, registerAccount } from "../../api/apiUser";
import Swal from "sweetalert2";

const myId = nanoid();
interface Account {
	id: any;
	fullName: string;
	username: string;
	password: string;
	avatarUrl: string | null;
	roles: any[] | [1];
}
export const Register = () => {
	const navigate = useNavigate();

	const [account, setAccount] = useState<Account>({
		id: myId,
		fullName: "",
		username: "",
		password: "",
		avatarUrl: null,
		roles: [1],
	});

	// event handlers
	const handleChangeValue = (e: any) => {
		const { name, value } = e.target;

		setAccount({
			...account,
			[name]: value,
		});
	};

	const handleRegiter = async () => {
		const checkAccountExist = await getUserForLogin(account.username, account.password);
		if (checkAccountExist) {
			return Swal.fire({
				icon: "error",
				title: "Tài khoản này đã tồn tại. Vui lòng đăng ký thông tin khác!",
			});
		}

		const res = await registerAccount(account);
		if (res.status === 201) {
			Swal.fire({
				icon: "success",
				title: `Đăng ký thành công tài khoản ${account.username}`,
			});
			localStorage.setItem("username", account.username);
			navigate("/login");
		}
	};

	return (
		<div className="flex justify-center">
			<div className="flex flex-col justify-center items-center md:flex-row shadow rounded-xl max-w-7xl w-[90%]  m-2">
				<div className=" w-full md:w-3/4">
					<h1 className="font-semibold text-xl text-center mb-10 md:text-5xl text-gray-600 m-2">Đăng ký tài khoản của bạn</h1>
					<div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
						<div className="">
							<input
								type="text"
								name="fullName"
								placeholder="Họ và tên"
								onChange={handleChangeValue}
								className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
							/>
						</div>
						<div className="">
							<input
								type="text"
								name="username"
								placeholder="Tài khoản"
								onChange={handleChangeValue}
								className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
							/>
						</div>
						<div className="relative flex items-center">
							<input
								type={"text"}
								name="password"
								placeholder="Mật khẩu"
								onChange={handleChangeValue}
								className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
							/>
						</div>
						<div className="relative flex items-center">
							<input
								type={"text"}
								name="avatarUrl"
								placeholder="Link hình ảnh đại diện"
								onChange={handleChangeValue}
								className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
							/>
						</div>
					</div>
					<div className="text-center mt-7">
						<button
							type="submit"
							className=" px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-l from-blue-400 to-emerald-400  font-medium m-2 mb-6 "
							onClick={handleRegiter}
						>
							Đăng ký
						</button>
					</div>
				</div>
				<div className="h-[100%] w-full md:w-1/3  bg-gradient-to-l from-blue-400 to-emerald-400  items-center flex justify-center">
					<div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
						<h1 className="text-5xl">Bạn đã có tài khoản?</h1>
						<h1 className="">Đăng nhập ngay</h1>
						<Link to={"/login"} className="inline-block bg-white rounded-2xl px-4 text-emerald-400 py-1">
							Đăng nhập
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
