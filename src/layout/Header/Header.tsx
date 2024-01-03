import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { TiInfoLarge } from "react-icons/ti";
import { FaHistory } from "react-icons/fa";
import { AuthContext } from "../../services/context/AuthProvider";
export const Header = () => {
	const { dataUser, onLogout } = useContext(AuthContext);

	const [showProfile, setShowProfile] = useState<boolean>(false);

	const handleShowProfile = () => {
		setShowProfile(!showProfile);
	};

	useEffect(() => {}, [dataUser]);
	return (
		<header className="text-gray-600 body-font shadow-md">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<Link to={'/'} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
						viewBox="0 0 24 24"
					>
						<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
					</svg>
					<span className="ml-3 text-xl">PyPhone</span>
				</Link>
				<nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
					{dataUser?.roles?.includes(0) ? (
						<>
							<Link to={"/"} className="mr-5 hover:text-gray-900">
								Trang chủ
							</Link>
							<Link to={"/admin/product-management"} className="mr-5 hover:text-gray-900">
								Quản lý sản phẩm
							</Link>
							<Link to={"/admin/account-management"} className="mr-5 hover:text-gray-900">
								Quản lý tài khoản
							</Link>
						</>
					) : (
						<>
							<Link to={"/"} className="mr-5 hover:text-gray-900">
								Trang chủ
							</Link>
							<Link to={"/categories"} className="mr-5 hover:text-gray-900">
								Sản phẩm
							</Link>
							<Link to={"/abour"} className="mr-5 hover:text-gray-900">
								Giới thiệu
							</Link>
							<Link to={"/contact"} className="mr-5 hover:text-gray-900">
								Liên hệ
							</Link>
						</>
					)}
				</nav>
				<div className="inline-flex items-center gap-4">
					{dataUser?.fullName ? (
						<div className="relative">
							<div onClick={handleShowProfile} className="px-3 py-1 rounded-md border border-gray-200 flex items-center justify-between gap-4 hover:bg-slate-100 cursor-pointer">
								<p>{dataUser?.fullName}</p>
								{showProfile ? <IoIosArrowUp /> : <IoIosArrowDown />}
							</div>
							{showProfile ? (
								<ul className="absolute min-w-52 right-0 border bg-white z-10">
									<li>
										<Link to={""} className="flex items-center gap-2 px-2 py-1 border-b hover:bg-slate-200 cursor-pointer">
											<TiInfoLarge />
											<span>Thông tin tài khoản</span>
										</Link>
									</li>
									<li>
										<Link to={""} className="flex items-center gap-2 px-2 py-1 border-b hover:bg-slate-200 cursor-pointer">
											<CiShoppingCart />
											<span>Giỏ hàng</span>
										</Link>
									</li>
									<li>
										<Link to={""} className="flex items-center gap-2 px-2 py-1 border-b hover:bg-slate-200 cursor-pointer">
											<FaHistory />
											<span>Lịch sử mua hàng</span>
										</Link>
									</li>
									<li>
										<p onClick={onLogout} className="flex items-center gap-2 px-2 py-1 hover:bg-slate-200 cursor-pointer">
											<CiUser />
											<span>Đăng xuất</span>
										</p>
									</li>
								</ul>
							) : null}
						</div>
					) : (
						<>
							<span className="px-3 py-1 font-semibold border border-cyan-500 bg-cyan-500 text-white rounded-full hover:opacity-70">
								<Link to={"/login"}>Đăng nhập</Link>
							</span>
							<span className="px-3 py-1 font-semibold border border-cyan-500 rounded-full hover:opacity-70">
								<Link to={"/register"}>Đăng ký</Link>
							</span>
						</>
					)}
				</div>
			</div>
		</header>
	);
};
