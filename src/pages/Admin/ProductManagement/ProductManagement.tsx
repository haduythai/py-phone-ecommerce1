import { useEffect, useState } from "react";
import { delProductById, getListProduct } from "../../../api/apiProduct";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { ModalAddProduct } from "./ModalAddProduct";
import ModalEditProduct from "./ModalEditProduct";

const ProductManagement = () => {
	// var
	const [currentPage, setCurrentPage] = useState(1);
	const [listProduct, setListProduct] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean | null>(true);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
	const [idProduct, setIdProduct] = useState<string | number>("");
	// fetch
	const fetchListProduct = async (currentPage: number) => {
		try {
			const result = await getListProduct(currentPage);
			setListProduct(result);
			setLoading(false);
		} catch (error) {}
	};

	// event handlers
	const handleDelete = async (productId: number | string) => {
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
				const resDel = await delProductById(productId);
				if (resDel == "OK") {
					toast.success("Xoá sản phẩm thành công!");
					fetchListProduct(currentPage);
				}
			}
		});
	};

	useEffect(() => {
		fetchListProduct(currentPage);
	}, [loading, openModal, openModalUpdate, currentPage]);

	const pageCount = Math.ceil(listProduct.length / 10);
	const pageNumbers = [];

	for (let i = 0; i <= pageCount; i++) {
		pageNumbers.push(i + 1);
	}

	return (
		<>
			<div className="max-w-7xl mx-auto">
				<h2 className="text-2xl font-semibold uppercase">Danh sách sản phẩm</h2>
				<div className="w-full grid grid-cols-12 items-center gap-4 my-6">
					<div className="product-m-action col-span-2">
						<button
							type="button"
							onClick={() => {
								setOpenModal(true);
							}}
							className="px-3 py-2 bg-green-600 text-white rounded-lg"
						>
							Thêm sản phẩm mới
						</button>
					</div>
					<div className="product-m-search col-span-10">
						<input type="text" name="" id="" placeholder="Nhập từ khoá tìm kiếm" className="border px-3 py-2 w-full focus:outline-slate-400 rounded-lg" />
					</div>
				</div>
				<div className="list__product w-full">
					{listProduct.length > 0 ? (
						<table className="border w-full">
							<thead className="border-b">
								<tr>
									<th scope="col" className="px-3 py-2 border-r">
										STT
									</th>
									<th scope="col" className="px-3 py-2 border-r">
										Hình ảnh
									</th>
									<th scope="col" className="px-3 py-2 border-r">
										Tên sản phẩm
									</th>
									<th scope="col" className="px-3 py-2 border-r">
										Mô tả
									</th>
									<th scope="col" className="px-3 py-2 border-r">
										Giá nhập
									</th>
									<th scope="col" className="px-3 py-2 border-r">
										Giá bán
									</th>
									<th scope="col" className="px-3 py-2 border-r">
										Giá khuyến mãi
									</th>
									<th scope="col" className="px-3 py-2 border-r">
										Hãng sản xuất
									</th>
									<th scope="col" className="px-3 py-2 border-r">
										Số lượng nhập về
									</th>
									<th scope="col" className="px-3 py-2 border-r">
										Trạng thái kho hàng
									</th>
									<th scope="col" className="px-3 py-2">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{listProduct.map((iProduct, index) => {
									return (
										<tr className="border-b" key={iProduct.id}>
											<td className="border-r px-3 py-2 text-center">{index + 1}</td>
											<td className="border-r px-3 py-2">
												<div className="">
													<img src={iProduct.thumbnail} width={120} alt="" />
												</div>
											</td>
											<td className="border-r px-3 py-2">
												<p>{iProduct.name}</p>
											</td>
											<td className="border-r px-3 py-2">
												<p>{iProduct.description.length > 50 ? iProduct.description.substring(0, 50) + "..." : iProduct.description}</p>
											</td>
											<td className="border-r px-3 py-2">
												<p>{iProduct.importPrice?.toLocaleString()} VNĐ</p>
											</td>
											<td className="border-r px-3 py-2">
												<p>{iProduct.currentPrice?.toLocaleString()} VNĐ</p>
											</td>
											<td className="border-r px-3 py-2">
												<p>{iProduct.discountPrice?.toLocaleString()} VNĐ</p>
											</td>
											<td className="border-r text-center ">
												<p>{iProduct.category ? iProduct.category?.name : "Chưa nhập"}</p>
											</td>
											<td className="border-r text-center ">
												<p>{iProduct.importQuantity}</p>
											</td>
											<td className="border-r text-center px-3 py-2">
												{iProduct.amountSold ? (
													<p>
														{parseInt(iProduct.importQuantity) - parseInt(iProduct.amountSold) <= 0
															? "Hết hàng"
															: `Còn ${parseInt(iProduct.importQuantity) - parseInt(iProduct.amountSold)} sản phẩm`}
													</p>
												) : null}
											</td>
											<td className="border-r px-3 py-2">
												<div className="flex items-center gap-2">
													<button
														type="button"
														onClick={() => {
															setIdProduct(iProduct.id);
															setOpenModalUpdate(true);
														}}
														className="bg-orange-600 text-white px-3 py-2 rounded-md hover:opacity-70"
													>
														Sửa
													</button>
													<button
														type="button"
														onClick={() => {
															handleDelete(iProduct.id);
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
			{openModal ? <ModalAddProduct openModal={openModal} setOpenModal={setOpenModal} /> : null}
			{openModalUpdate ? <ModalEditProduct id={idProduct} openModalUpdate={openModalUpdate} setOpenModalUpdate={setOpenModalUpdate} /> : null}
		</>
	);
};

export default ProductManagement;
