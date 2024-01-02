import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const LoginView = (props: any) => {
	const { showPassword, onShowPassword, onChangeValue, onLogin } = props;

	return (
		<div className="flex justify-center">
			<div className="flex flex-col justify-center items-center md:flex-row shadow rounded-xl max-w-7xl w-[90%]  m-2">
				<form className=" w-full md:w-3/4">
					<h1 className="font-semibold text-xl text-center mb-10 md:text-5xl text-gray-600 m-2">Đăng nhập với tài khoản của bạn</h1>
					<div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
						<div className="">
							<input
								type="text"
								name="username"
								placeholder="Tài khoản"
								onChange={(e) => {
									onChangeValue(e);
								}}
								className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
							/>
						</div>
						<div className="relative flex items-center">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								placeholder="Mật khẩu"
								onChange={(e) => {
									onChangeValue(e);
								}}
								className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
							/>
							<span className="absolute right-2 cursor-pointer">{showPassword ? <FaRegEyeSlash onClick={onShowPassword} /> : <FaRegEye onClick={onShowPassword} />}</span>
						</div>
					</div>
					<div className="text-center mt-7">
						<button
							type="submit"
							className=" px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-l from-blue-400 to-emerald-400  font-medium m-2 mb-6 "
							onClick={onLogin}
						>
							Đăng nhập
						</button>
					</div>
				</form>
				<div className="h-[100%] w-full md:w-1/3  bg-gradient-to-l from-blue-400 to-emerald-400  items-center flex justify-center">
					<div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
						<h1 className="text-5xl">Bạn đã chưa có tài khoản?</h1>
						<h1 className="">Đăng ký tài khoản mới ngay tại đây</h1>
						<button className="bg-white rounded-2xl px-4 text-emerald-400 py-1">Đăng ký</button>
					</div>
				</div>
			</div>
		</div>
	);
};
