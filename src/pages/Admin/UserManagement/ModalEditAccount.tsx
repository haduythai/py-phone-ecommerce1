import React, { useEffect, useState } from "react";
import { getAccountById, updateAccountById } from "../../../api/apiUser";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { IoMdClose } from "react-icons/io";

export const ModalEditAccount = (props: any) => {
	const { id, setOpenModalUpdate } = props;
	const [avatarUrlPreview, setAvatarUrlPreview] = useState("");
	const [account, setAccount] = useState({
		id: "",
		fullName: "",
		username: "",
		password: "",
		avatarUrl: "",
		roles: [],
	});

	const fetchAcconutById = async () => {
		const dataProduct = await getAccountById(id);
		setAccount({
			...account,
			...dataProduct,
		});
		setAvatarUrlPreview(dataProduct?.avatarUrl);
	};

	// event handlers
	const handleUpdateAccount = async () => {
		Swal.fire({
			icon: "question",
			title: "Bạn chắc chắn muốn cập nhật thông tin tài khoản này?",
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: "Đồng ý",
			cancelButtonText: "Hủy",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const res = await updateAccountById(id, account);
				if (res.status === 200) {
					toast.success("Cập nhật thông tin tài khoản thành công!");
					setOpenModalUpdate(false);
				} else {
					console.log(res);
					toast.success("Có lỗi xảy ra!");
					setOpenModalUpdate(false);
				}
			}
		});
	};

	const handleChangeValue = (e: any) => {
		const { name, value } = e.target;
		if (value) {
			setAccount({
				...account,
				[name]: value,
			});
		}
	};

	const handleChangeAccount = (e: any) => {
		const { name, value } = e.target;
		if (value) {
			const newRoles = [value];
			setAccount({
				...account,
				roles: newRoles as any,
			});
		}
	};

	const handleCancel = () => {
		setOpenModalUpdate(false);
	};

	useEffect(() => {
		fetchAcconutById();
	}, []);

	useEffect(() => {
		fetchAcconutById();
	}, [id]);

	return (
		<div className="fixed z-10 inset-0 w-full h-full flex items-center justify-center bg-gray-400 bg-opacity-80">
			<div className="w-1/2 min-h-40 mx-auto p-4 bg-white rounded-md">
				<div className="modal-p-header mb-4 border-b flex items-center justify-between">
					<h2 className="text-2xl font-semibold uppercase py-2">Cập nhật tài khoản</h2>
					<span
						onClick={() => {
							setOpenModalUpdate(false);
						}}
					>
						<IoMdClose size={32} className="hover:text-red-500 cursor-pointer" />
					</span>
				</div>
				<div className="modal-p-body my-6">
					<div className="grid grid-cols-12 items-center gap-4">
						<div className="col-span-4">
							<div className="flex flex-col">
								<label htmlFor="">Họ và tên</label>
								<input
									type="text"
									onChange={handleChangeValue}
									value={account?.fullName || ""}
									className="px-3 py-1 border border-gray-400 focus:outline-slate-400 rounded-lg"
									name="fullName"
									id="fullName"
									placeholder="Nhập họ và tên"
								/>
							</div>
						</div>
						<div className="col-span-4">
							<div className="flex flex-col">
								<label htmlFor="">Ảnh đại diện</label>
								<input
									type="text"
									onChange={(e) => {
										handleChangeValue(e);
										setAvatarUrlPreview(e.target.value);
									}}
									value={account?.avatarUrl || ""}
									min={0}
									className="px-3 py-1 border border-gray-400 focus:outline-slate-400 rounded-lg"
									name="avatarUrl"
									id="avatarUrl"
									placeholder="Ảnh đại diện"
								/>
							</div>
						</div>
						<div className="col-span-4">
							<div className="flex flex-col">
								<label htmlFor="">Phân quyền</label>
								<select onChange={handleChangeAccount} name="" id="" className="px-3 py-1 border border-gray-400 focus:outline-slate-400 rounded-lg">
									<option value="0">Admin</option>
									<option value="1">User</option>
								</select>
							</div>
						</div>
						{avatarUrlPreview ? (
							<div className="col-span-3">
								<p className="mb-3 underline">Ảnh đại diện của bạn</p>
								<img src={avatarUrlPreview} className="w-full px-2 border" alt="avatar preview" />
							</div>
						) : null}
					</div>
				</div>
				<div className="modal-p-footer float-end flex items-center gap-4">
					<button type="button" onClick={handleUpdateAccount} className="px-10 py-2 bg-cyan-500 text-white rounded-md hover:opacity-70">
						Cập nhật
					</button>
					<button type="button" onClick={handleCancel} className="px-10 py-2 bg-cyan-500 text-white rounded-md hover:opacity-70">
						Hủy
					</button>
				</div>
			</div>
		</div>
	);
};
