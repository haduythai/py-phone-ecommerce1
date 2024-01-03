import { useEffect, useState } from "react";
import { delAccountById, getListUser } from "../../../api/apiUser";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ModalEditAccount } from "./ModalEditAccount";

export const UserManagement = () => {
	// var
	const [currentPage, setCurrentPage] = useState(1);
	const [listAccount, setListAccount] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean | null>(true);
	const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
	const [idAccount, setIdAccount] = useState<string | number>("");
	// fetch
	const fetchListAccount = async (currentPage: number) => {
		try {
			const result = await getListUser(currentPage);
			setListAccount(result);
			setLoading(false);
		} catch (error) {}
	};

	// event handlers
	const handleDelete = async (accountId: string) => {
		Swal.fire({
			icon: "question",
			title: "Bạn chắc chắn muốn xoá sản phẩm này?",
			text: "Sau khi xoá sẽ không thể khôi phục lại được.",
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: "Đồng ý",
			cancelButtonText: "Huỷ",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const resDel = await delAccountById(accountId);
				if (resDel.status == 200) {
					toast.success("Xoá tài khoản thành công!");
					fetchListAccount(currentPage);
				}
			}
		});
	};

	useEffect(() => {
		fetchListAccount(currentPage);
	}, [loading, openModalUpdate, currentPage]);

	const pageCount = Math.ceil(listAccount.length / 10);
	const pageNumbers = [];

	for (let i = 0; i < pageCount; i++) {
		pageNumbers.push(i+1);
	}
	return (
		<>
			<div className="max-w-7xl mx-auto">
				<h2 className="text-2xl font-semibold uppercase">Danh sách tài khoản</h2>
				<div className="w-full grid grid-cols-12 items-center gap-4 my-6">
					<div className="product-m-action col-span-2">
						<Link to={"/register"} className="px-3 py-2 bg-green-600 text-white rounded-lg">
							Thêm tài khoản
						</Link>
					</div>
					<div className="product-m-search col-span-10">
						<input type="text" name="" id="" placeholder="Nhập từ khoá tìm kiếm" className="border px-3 py-2 w-full focus:outline-slate-400 rounded-lg" />
					</div>
				</div>
				<div className="list__product w-full">
					{listAccount.length > 0 ? (
						<table className="border w-full">
							<thead className="border-b">
								<tr>
									<th scope="col" className="px-3 py-2 border-r">
										STT
									</th>
									<th scope="col" className="px-3 py-2 border-r">
										Hình ảnh đại diện
									</th>
									<th scope="col" className="px-3 py-2 border-r">
										Họ và tên
									</th>
									<th scope="col" className="px-3 py-2 border-r">
										Tài khoản
									</th>
									<th scope="col" className="px-3 py-2 border-r">
										Quyền
									</th>
									<th scope="col" className="px-3 py-2">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{listAccount.map((iAccount, index) => {
									return (
										<tr className="border-b" key={iAccount.id}>
											<td className="border-r px-3 py-2 text-center">{index + 1}</td>
											<td className="border-r px-3 py-2">
												<div className="">
													<img src={iAccount.avatarUrl} width={120} alt="Ảnh đại diện" />
												</div>
											</td>
											<td className="border-r px-3 py-2">
												<p>{iAccount.fullName}</p>
											</td>
											<td className="border-r px-3 py-2">
												<p>{iAccount.username}</p>
											</td>
											<td className="border-r px-3 py-2">
												<p>{iAccount.roles[0] == 1 ? "USER" : "ADMIN"}</p>
											</td>
											<td className="border-r px-3 py-2">
												<div className="flex items-center gap-2">
													<button
														type="button"
														onClick={() => {
															setIdAccount(iAccount.id);
															setOpenModalUpdate(true);
														}}
														className="bg-orange-600 text-white px-3 py-2 rounded-md hover:opacity-70"
													>
														Sửa
													</button>
													<button
														type="button"
														onClick={() => {
															handleDelete(iAccount.id);
														}}
														className="bg-red-600 text-white px-3 py-2 rounded-md hover:opacity-70"
													>
														Xoá
													</button>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					) : (
						<p className="px-3 py-2 w-full text-center border">Không có sản phẩm nào!</p>
					)}
					<div className="my-6 flex justify-center">
						<ul className="flex border">
							{pageNumbers.map((numberPage) => {
								return (
									<li
										onClick={() => {
											setCurrentPage(numberPage);
										}}
										key={numberPage}
										className={`px-3 py-1 hover:bg-cyan-600 hover:text-white hover:font-semibold cursor-pointer ${numberPage > pageNumbers.length - 1 ? "" : "border-r"}`}
									>
										<span>{numberPage}</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
			{openModalUpdate ? <ModalEditAccount id={idAccount} openModalUpdate={openModalUpdate} setOpenModalUpdate={setOpenModalUpdate} /> : null}
		</>
	);
};
